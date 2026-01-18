import { useRef } from "react";

function SignaturePad({ onSave }) {
  const canvasRef = useRef();

  function draw(e) {
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineWidth = 2;
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        width={300}
        height={150}
        className="border"
        onMouseMove={(e) => e.buttons === 1 && draw(e)}
      />
      <button
        onClick={() =>
          onSave(canvasRef.current.toDataURL())
        }
      >
        Save Signature
      </button>
    </>
  );
}

export default SignaturePad;
