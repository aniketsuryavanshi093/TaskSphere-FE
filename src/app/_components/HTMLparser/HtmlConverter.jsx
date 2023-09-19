import Parser from "html-to-react";
import React from "react";

const HtmlConverter = ({ htmlString }) => {
  const parser = new Parser.Parser();
  const reactElement = parser.parse(htmlString);
  return <div>{reactElement}</div>;
};
export default React.memo(HtmlConverter);
