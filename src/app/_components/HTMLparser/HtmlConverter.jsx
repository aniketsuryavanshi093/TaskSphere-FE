import Parser from 'html-to-react';

const HtmlConverter = ({ htmlString }) => {
  const parser = new Parser.Parser();
  const reactElement = parser.parse(htmlString);
  return <div>{reactElement}</div>;
};
export default HtmlConverter;
