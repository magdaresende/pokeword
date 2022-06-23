import React, { useState } from "react";
import "./Word.css";

const Word = ({ pokename, poketypes }) => {
  const [currentWord, setCurrentWord] = useState("");
  const [error, setError] = useState(false);
  const [attempts, setAttempts] = useState([]);
  const [showType, setShowType] = useState(false);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (handleValidation()) {
      setAttempts([...attempts, currentWord.toLowerCase()]);
    } else {
      setError(true);
    }
  };

  const handleValidation = () => {
    return pokename.length == currentWord.length;
  };

  const handleChange = (e) => {
    setCurrentWord(e);
    setError(false);
  };

  return (
    <div className="wrapper">
      <div className="title">
        Pokemon name with <span className="pink">{pokename.length}</span>{" "}
        letters
      </div>
      <div className="gameArea">
        <form onSubmit={handleSubmit} className="formWrapper">
          <input
            type="text"
            value={currentWord}
            onChange={(e) => handleChange(e.target.value)}
            className="input"
          />
          <input type="submit" value="Submit" className="button" />
        </form>
        <Error error={error} len={pokename.length} />
        <TypeButton showType={showType} setShowType={setShowType} />
        {showType && <ShowTypes poketypes={poketypes} />}
        {attempts.length > 0 && (
          <Attempts previousAttempts={attempts} pokename={pokename} />
        )}
      </div>
    </div>
  );
};

const Error = ({ error, len }) => {
  return (
    <div className="error">
      {error && `Only words with ${len} letters allowed!`}{" "}
    </div>
  );
};

const ShowTypes = ({ poketypes }) => {
  return (
    <div>
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
    <div className="hint">
      <div>Need a hint?</div>
      <button
        onClick={(_) => setShowType(!showType)}
        className="hintButton button"
      >
        {showType ? "Hide type!!!" : "Show pokemon type"}
      </button>
    </div>
  );
};

export default Word;
