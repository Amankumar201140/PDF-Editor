import ReactMarkdown from "react-markdown";

const Result = ({ refComp, markdownTxt }) => {
  return (
    <>
      <article ref={refComp} className="result">
        <ReactMarkdown>{markdownTxt}</ReactMarkdown>
      </article>
    </>
  );
};

export default Result;
