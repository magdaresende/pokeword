import React, { useState } from "react";

const Word = ({ pokename, poketypes }) => {
  const [currentWord, setCurrentWord] = useState("");
  const [answer, setAnswer] = useState(false);
  const [error, setError] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [attempts, setAttempts] = useState([]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (handleValidation()) {
      setAnswer(currentWord == pokename);
      setAttempts([...attempts, currentWord]);
      setShowAnswer(true);
    } else {
      setError(true);
    }
  };

  const handleValidation = () => {
    return pokename.length == currentWord.length;
  };

  const handleChange = (e) => {
    setCurrentWord(e);
    setShowAnswer(false);
    setError(false);
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
      <Error error={error} len={pokename.length} />
      {showAnswer != "" && <Answer correct={answer} /> && (
        <Verify currentWord={currentWord} pokename={pokename} />
      )}
      {attempts.length > 0 && <Attempts previousAttempts={attempts} />}
    </div>
  );
};

const Answer = ({ correct }) => {
  return <div>{correct ? "Correct!" : "Wrong!"}</div>;
};

const Error = ({ error, len }) => {
  return <div>{error && `Wrong number of letters, should be: ${len}`}</div>;
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

const Verify = ({ currentWord, pokename }) => {
  return (
    <div>
      <div>What you need to know:</div>
      {currentWord.split("").map((currentLetter, index) => {
        if (currentLetter == pokename[index]) {
          return (
            <div key={index}>
              {currentLetter} in the index {index} is correct!
            </div>
          );
        } else if (pokename.indexOf(currentLetter) > -1) {
          return (
            <div key={index}>
              {currentLetter} in the index {index} is not correct but it exists
              in the word elsewhere!
            </div>
          );
        } else {
          return (
            <div key={index}>{currentLetter} doesn't belong in this word.</div>
          );
        }
      })}
    </div>
  );
};

export default Word;
