import React, { useState } from "react";

const Word = ({ pokename, poketypes }) => {
  const [currentWord, setCurrentWord] = useState("");
  const [answer, setAnswer] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [attempts, setAttempts] = useState([]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setAnswer(currentWord == pokename);
    setShowAnswer(true);
    setAttempts([...attempts, currentWord]);
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
      {attempts.length > 0 && <Attempts previousAttempts={attempts} />}
    </div>
  );
};

const Answer = ({ correct }) => {
  return <div>{correct ? "Correct!" : "Wrong!"}</div>;
};

const Attempts = ({ previousAttempts }) => {
  return (
    <div>
      <div>Previous Attempts:</div>
      {previousAttempts.map((attempts) => {
        return <div key={attempts}>{attempts}</div>;
      })}
    </div>
  );
};

export default Word;
