import { useState } from "react";

function Toolbar({ setTool }) {
  const [color, setColor] = useState("#ffeb3b");
  const [font, setFont] = useState("Arial");

  return (
    <div className="flex gap-3 bg-gray-800 p-3 text-white">

      {/* FONT */}
      <select
        className="text-black px-2"
        onChange={(e) => setFont(e.target.value)}
      >
        <option>Arial</option>
        <option>Courier New</option>
        <option>Times New Roman</option>
        <option>Verdana</option>
        <option>Cursive</option>
      </select>

      {/* COLOR */}
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />

      {/* COMMENT */}
      <button
        onClick={() =>
          setTool({
            type: "text",
            value: "Add comment",
            color,
            font,
          })
        }
        className="bg-blue-600 px-3 py-1 rounded"
      >
        Comment
      </button>

      {/* TYPED SIGNATURE */}
      <button
        onClick={() => {
          const name = prompt("Type your name");
          if (!name) return;
          setTool({
            type: "text",
            value: name,
            font: "cursive",
            color,
          });
        }}
        className="bg-green-600 px-3 py-1 rounded"
      >
        Typed Signature
      </button>

      {/* STAMP */}
      <button
        onClick={() => {
          const text = prompt("Stamp text");
          if (!text) return;
          setTool({
            type: "text",
            value: text,
            bg: "#ff9800",
            color: "#000",
            font: "bold",
          });
        }}
        className="bg-orange-600 px-3 py-1 rounded"
      >
        Stamp
      </button>

      {/* CLEAR TOOL */}
      <button
        onClick={() => setTool(null)}
        className="bg-gray-600 px-3 py-1 rounded"
      >
        Cancel
      </button>
    </div>
  );
}

export default Toolbar;
