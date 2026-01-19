import { useRef, useState } from "react";

function Toolbar({
  setTool,
  onCommentZoomIn,
  onCommentZoomOut,
  onDownloadPdf,
}) {
  const fileRef = useRef(null);
  const [color, setColor] = useState("#000000");
  const [font, setFont] = useState("Arial");
  const [fontSize, setFontSize] = useState(16);

  const btn =
    "px-3 py-1 rounded font-medium bg-gray-700 text-white hover:bg-gray-600";
  const outline =
    "px-2 py-1 rounded border border-gray-400 bg-white text-black";

  return (
    <div className="flex flex-wrap gap-3 bg-gray-100 p-3 border-b border-gray-300 items-center">

      <select
        className={outline}
        value={font}
        onChange={(e) => setFont(e.target.value)}
      >
        <option>Arial</option>
        <option>Courier New</option>
        <option>Times New Roman</option>
        <option>Verdana</option>
        <option>Cursive</option>
      </select>

      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="w-8 h-8 border border-gray-400 rounded"
      />

      <div className="flex items-center gap-2 bg-white border border-gray-400 rounded px-2 py-1">
        <button onClick={() => setFontSize((s) => Math.max(8, s - 2))}>−</button>
        <span className="text-sm font-semibold">{fontSize}px</span>
        <button onClick={() => setFontSize((s) => Math.min(72, s + 2))}>+</button>
      </div>

      <button
        className={`${btn} bg-blue-600 hover:bg-blue-700`}
        onClick={() =>
          setTool({
            type: "text",
            value: "Add comment",
            color,
            font,
            fontSize,
            bg: "#fff7cc",
          })
        }
      >
        Comment
      </button>

      <button
        className={`${btn} bg-green-600 hover:bg-green-700`}
        onClick={() => {
          const name = prompt("Type your name");
          if (!name) return;
          setTool({
            type: "text",
            value: name,
            font: "cursive",
            color,
            fontSize,
            bg: "#e0f2fe",
          });
        }}
      >
        Typed Signature
      </button>

      <button
        className={`${btn} bg-indigo-600 hover:bg-indigo-700`}
        onClick={() => fileRef.current.click()}
      >
        Upload Signature
      </button>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          const file = e.target.files[0];
          if (!file) return;

          const url = URL.createObjectURL(file);
          setTool({
            type: "image",
            value: url,
            width: 160,
            height: 60,
          });
        }}
      />

      <button className={btn} onClick={onCommentZoomIn}>
        Zoom +
      </button>
      <button className={btn} onClick={onCommentZoomOut}>
        Zoom −
      </button>

      <button
        className="px-4 py-1 rounded bg-emerald-600 text-white font-semibold hover:bg-emerald-700"
        onClick={onDownloadPdf}
      >
        Download PDF
      </button>

      <button
        className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
        onClick={() => setTool(null)}
      >
        Cancel
      </button>
    </div>
  );
}

export default Toolbar;
