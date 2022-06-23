import React, { useState } from "react";
import "./Word.css";

const Word = ({ pokename, poketypes }) => {
  const [currentWord, setCurrentWord] = useState("");
  const [answer, setAnswer] = useState(false);
  const [error, setError] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [attempts, setAttempts] = useState([]);
  const [showType, setShowType] = useState(false);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (handleValidation()) {
      setAnswer(currentWord.toLowerCase() == pokename);
      setAttempts([...attempts, currentWord.toLowerCase()]);
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
      <TypeButton showType={showType} setShowType={setShowType} />
      {showType && <ShowTypes poketypes={poketypes} />}
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
      {showAnswer != "" && <Answer correct={answer} />}
      {attempts.length > 0 && (
        <Attempts previousAttempts={attempts} pokename={pokename} />
      )}
    </div>
  );
};

const Answer = ({ correct }) => {
  return <div>{correct ? "Correct!" : "Wrong!"}</div>;
};

const Error = ({ error, len }) => {
  return <div>{error && `Wrong number of letters, should be: ${len}`}</div>;
};

const ShowTypes = ({ poketypes }) => {
  return (
    <div>
      <div>Types:</div>
      {poketypes.split(",").map((poketype) => {
        return <div key={poketype}>{poketype}</div>;
      })}
    </div>
  );
};

const Attempts = ({ previousAttempts, pokename }) => {
  return (
    <div>
      <div>Previous Attempts:</div>
      {previousAttempts.map((attempt, index) => {
        return <div key={index}>{PrintLetters(attempt, pokename)}</div>;
      })}
    </div>
  );
};

const PrintLetters = (currentWord, pokename) => {
  return (
    <div>
      {currentWord.split("").map((currentLetter, index) => {
        return (
          <span
            key={index}
            className={ReturnColor(currentLetter, pokename, index)}
          >
            {currentLetter}
          </span>
        );
      })}
    </div>
  );
};

const ReturnColor = (currentLetter, pokename, index) => {
  console.log(pokename);
  if (currentLetter == pokename[index]) {
    return "green";
  } else if (pokename.indexOf(currentLetter) > -1) {
    return "yellow";
  } else {
    return "red";
  }
};

const TypeButton = ({ showType, setShowType }) => {
  return (
    <button onClick={(_) => setShowType(!showType)}>
      {showType ? "Hide type!!!" : "Show pokemon type"}
    </button>
  );
};

export default Word;
