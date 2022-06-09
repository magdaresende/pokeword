import * as React from "react";
import * as ReactDOM from "react-dom";

const Word = ({ pokename, poketype }) => {
  return (
    <div>
      <div>{pokename}</div>
      <div>{poketype}</div>
    </div>
  );
};

export default Word;
