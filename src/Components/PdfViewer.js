import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import Toolbar from "./Toolbar";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { saveAs } from "file-saver";

pdfjs.GlobalWorkerOptions.workerSrc =
  `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

function PDFViewer() {
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [tool, setTool] = useState(null);
  const [elements, setElements] = useState([]);

  function onFileChange(e) {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(URL.createObjectURL(selectedFile));
      setCurrentPage(1);
      setElements([]);
    }
  }

  function onLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function addElement(el) {
    setElements((prev) => [...prev, el]);
  }

  // ✅ DOWNLOAD FINAL PDF
  async function downloadPdf() {
    if (!file) return;

    // Load original PDF
    const existingPdfBytes = await fetch(file).then((res) =>
      res.arrayBuffer()
    );
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const pages = pdfDoc.getPages();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    elements.forEach((el) => {
      const page = pages[currentPage - 1];
      const { width, height } = page.getSize();

      if (el.type === "text") {
        page.drawText(el.value, {
          x: el.x,
          y: height - el.y,
          size: 14,
          font,
          color: rgb(1, 1, 0),
        });
      }
    });

    const pdfBytes = await pdfDoc.save();
    saveAs(
      new Blob([pdfBytes], { type: "application/pdf" }),
      "edited.pdf"
    );
  }

  return (
    <div className="h-full flex flex-col text-white">

      {/* TOOLBAR */}
      <Toolbar setTool={setTool} />

      {/* DOWNLOAD BUTTON */}
      {file && (
        <div className="p-2 bg-gray-900">
          <button
            onClick={downloadPdf}
            className="bg-green-600 px-3 py-1 rounded"
          >
            Download PDF
          </button>
        </div>
      )}

      {/* BODY */}
      <div className="flex flex-1">

        {/* SIDEBAR */}
        {file && numPages && (
          <div className="w-44 overflow-y-auto bg-richblack-800 p-2">
            <Document file={file}>
              {Array.from(new Array(numPages), (_, i) => (
                <div
                  key={i}
                  className="mb-2 cursor-pointer border border-richblack-600 hover:border-yellow-400"
                  onClick={() => setCurrentPage(i + 1)}
                >
                  <Page pageNumber={i + 1} width={120} />
                </div>
              ))}
            </Document>
          </div>
        )}

        {/* MAIN VIEW */}
        <div className="flex-1 flex justify-center overflow-auto p-4">
          {!file && (
            <input
              type="file"
              accept="application/pdf"
              onChange={onFileChange}
            />
          )}

          {file && (
            <div className="relative">
              <Document file={file} onLoadSuccess={onLoadSuccess}>
                <Page pageNumber={currentPage} width={700} />
              </Document>

              {elements.map((el, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    top: el.y,
                    left: el.x,
                    color: el.color,
                    fontFamily: el.font,
                    background: el.bg,
                    padding: "4px",
                  }}
                >
                  {el.value}
                </div>
              ))}

              <div
                className="absolute inset-0"
                onClick={(e) => {
                  if (!tool) return;
                  addElement({
                    ...tool,
                    x: e.nativeEvent.offsetX,
                    y: e.nativeEvent.offsetY,
                  });
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PDFViewer;
