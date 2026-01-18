import { Document, Page } from "react-pdf";

function ThumbnailSidebar({ file, numPages, setPageNumber }) {
  if (!file) return null;

  return (
    <div className="w-40 overflow-y-auto bg-gray-800 p-2">
      <Document file={file}>
        {Array.from(new Array(numPages), (el, index) => (
          <div
            key={index}
            className="cursor-pointer mb-2 border hover:border-blue-400"
            onClick={() => setPageNumber(index + 1)}
          >
            <Page
              pageNumber={index + 1}
              width={120}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </div>
        ))}
      </Document>
    </div>
  );
}

export default ThumbnailSidebar;
