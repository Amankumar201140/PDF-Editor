import { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Result from "./Result";
const TextArea = () => {
  const [markdown, setMarkdown] = useState(
    "# Welcome to Rapid Markdown Editor"
  );

  // Download PDF Function
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <>
      <textarea
        value={markdown}
        className="input"
        onChange={(e) => setMarkdown(e.target.value)}
      ></textarea>
      <Result refComp={componentRef} markdownTxt={markdown} />
      <div className="btn-center">
        <button onClick={handlePrint} class="btn">
          Save as PDF
        </button>
      </div>
    </>
  );
};

export default TextArea;
