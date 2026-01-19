import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import Toolbar from "./Toolbar";
import { PDFDocument, rgb } from "pdf-lib";

pdfjs.GlobalWorkerOptions.workerSrc =
  `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

function PDFViewer() {
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [tool, setTool] = useState(null);
  const [elements, setElements] = useState([]);
  const [commentZoom, setCommentZoom] = useState(1);
  const [dragId, setDragId] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  function onFileChange(e) {
    const f = e.target.files[0];
    if (f) {
      setFile(URL.createObjectURL(f));
      setCurrentPage(1);
      setElements([]);
    }
  }

  function onLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function addElement(el) {
    setElements((p) => [...p, el]);
  }

  function onMouseMove(e) {
    if (dragId === null) return;
    setElements((prev) =>
      prev.map((el, i) =>
        i === dragId
          ? {
              ...el,
              x: e.nativeEvent.offsetX - dragOffset.x,
              y: e.nativeEvent.offsetY - dragOffset.y,
            }
          : el
      )
    );
  }

  function onMouseUp() {
    setDragId(null);
  }

  async function downloadPdf() {
    if (!file) return;

    const pdfBytes = await fetch(file).then((r) => r.arrayBuffer());
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const pages = pdfDoc.getPages();

    const renderedWidth = Math.min(window.innerWidth - 40, 900);

    for (const el of elements) {
      const page = pages[el.page - 1];
      if (!page) continue;

      const { width, height } = page.getSize();
      const scale = width / renderedWidth;

      // ================= IMAGE SIGNATURE =================
      if (el.type === "image") {
        const imgBytes = await fetch(el.value).then((r) =>
          r.arrayBuffer()
        );

        const image =
          el.value.includes("png")
            ? await pdfDoc.embedPng(imgBytes)
            : await pdfDoc.embedJpg(imgBytes);

        page.drawImage(image, {
          x: el.x * scale,
          y: height - el.y * scale - el.height * scale,
          width: el.width * scale,
          height: el.height * scale,
        });
        continue;
      }

      // ================= TEXT / COMMENT =================
      const fontSize = (el.fontSize || 16) * scale * commentZoom;

      const r = parseInt(el.color?.slice(1, 3) || "00", 16) / 255;
      const g = parseInt(el.color?.slice(3, 5) || "00", 16) / 255;
      const b = parseInt(el.color?.slice(5, 7) || "00", 16) / 255;

      page.drawText(el.value, {
        x: el.x * scale,
        y: height - el.y * scale - fontSize,
        size: fontSize,
        color: rgb(r, g, b),
      });
    }

    const out = await pdfDoc.save();
    const blob = new Blob([out], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "edited-document.pdf";
    link.click();
  }

  return (
    <div className="min-h-screen flex flex-col bg-richblack-900 text-white">
      <Toolbar
        setTool={setTool}
        onCommentZoomIn={() => setCommentZoom((z) => Math.min(z + 0.1, 3))}
        onCommentZoomOut={() => setCommentZoom((z) => Math.max(z - 0.1, 0.5))}
        onDownloadPdf={downloadPdf}
      />

      <div className="flex-1 overflow-auto flex flex-col items-center">
        {!file && (
          <input type="file" accept="application/pdf" onChange={onFileChange} />
        )}

        {file && (
          <div
            className="relative mt-6"
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
          >
            <Document file={file} onLoadSuccess={onLoadSuccess}>
              <Page
                pageNumber={currentPage}
                width={Math.min(window.innerWidth - 40, 900)}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </Document>

            {elements
              .filter((el) => el.page === currentPage)
              .map((el, i) => (
                <div
                  key={i}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    setDragId(i);
                    setDragOffset({
                      x: e.nativeEvent.offsetX,
                      y: e.nativeEvent.offsetY,
                    });
                  }}
                  style={{
                    position: "absolute",
                    top: el.y,
                    left: el.x,
                    cursor: "move",
                    userSelect: "none",
                  }}
                >
                  {el.type === "image" ? (
                    <img
                      src={el.value}
                      width={el.width}
                      height={el.height}
                      draggable={false}
                    />
                  ) : (
                    <div
                      style={{
                        color: el.color,
                        fontFamily: el.font,
                        fontSize: `${(el.fontSize || 16) * commentZoom}px`,
                        background: el.bg || "#fff7cc",
                        border: "1px dashed #facc15",
                        padding: "6px 8px",
                        borderRadius: "4px",
                      }}
                    >
                      {el.value}
                    </div>
                  )}
                </div>
              ))}

            <div
              className="absolute inset-0"
              onClick={(e) => {
                if (!tool || dragId !== null) return;
                addElement({
                  ...tool,
                  page: currentPage,
                  x: e.nativeEvent.offsetX,
                  y: e.nativeEvent.offsetY,
                });
              }}
            />
          </div>
        )}

        {file && (
          <div className="flex gap-4 my-6">
            <button disabled={currentPage <= 1} onClick={() => setCurrentPage(p => p - 1)}>
              Prev
            </button>
            <span>
              Page {currentPage} / {numPages}
            </span>
            <button disabled={currentPage >= numPages} onClick={() => setCurrentPage(p => p + 1)}>
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PDFViewer;
