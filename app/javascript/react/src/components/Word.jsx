import React, { useState } from "react";

const Word = ({ pokename, poketypes }) => {
  const [currentWord, setCurrentWord] = useState("");
  const [answer, setAnswer] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setAnswer(currentWord == pokename);
    setShowAnswer(true);
  };

  const handleChange = (e) => {
    setCurrentWord(e);
    setShowAnswer(false);
  };

  return (
    <div>
      {/* <div>{pokename}</div> */}
      <div>Types:</div>
      {poketypes.split(",").map((poketype) => {
        return <div key={poketype}>{poketype}</div>;
      })}
      <div>{pokename.length} letters</div>
      <form onSubmit={handleSubmit}>
        <label>
          Pokemon name:
          <input
            type="text"
            value={currentWord}
            onChange={(e) => handleChange(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
      {showAnswer != "" && <Answer correct={answer} />}
    </div>
  );
};

const Answer = ({ correct }) => {
  return <div>{correct ? "Correct!" : "Wrong!"}</div>;
};

export default Word;
