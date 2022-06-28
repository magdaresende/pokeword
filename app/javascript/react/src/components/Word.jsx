import React, { useState } from "react";
import Confetti from "react-dom-confetti";
import "./Word.css";

const confettiConfig = {
  angle: "136",
  spread: "291",
  startVelocity: "79",
  elementCount: "98",
  dragFriction: "0.23",
  duration: "4340",
  stagger: "11",
  width: "9px",
  height: "10px",
  perspective: "372px",
  colors: ["#ff99ff", "#80b3ff", "#ffb3b3", "#ff0066", "#00cc99"],
};

const Word = ({ pokename, poketypes, allPokes }) => {
  const [currentWord, setCurrentWord] = useState("");
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState([]);
  const [showType, setShowType] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    errorMessage = getErrorMessage();
    if (errorMessage == "") {
      setAttempts([...attempts, currentWord.toLowerCase()]);
    } else {
      setError(errorMessage);
    }
    if (pokename == currentWord.toLowerCase()) {
      setShowConfetti(true);
    }
  };

  const getErrorMessage = () => {
    if (pokename.length != currentWord.length) {
      return `Only pokemons with ${pokename.length} letters allowed!`;
    } else if (!CurrentWordIsPokemon(currentWord, allPokes)) {
      return "That's not a pokemon and you know it!";
    }
    return "";
  };

  const handleChange = (e) => {
    setCurrentWord(e);
    setError("");
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
        <Error error={error} />
        {showConfetti && <ShowCorrect />}
        <ShowConfetti correct={showConfetti} />
        <TypeButton
          showType={showType}
          setShowType={setShowType}
          poketypes={poketypes}
        />
        {attempts.length > 0 && (
          <Attempts previousAttempts={attempts} pokename={pokename} />
        )}
      </div>
    </div>
  );
};

const Error = ({ error }) => {
  return <div className="error">{error != "" && error} </div>;
};

const Attempts = ({ previousAttempts, pokename }) => {
  return (
    <div>
      <div>Previous Attempts:</div>
      {previousAttempts.map((attempt, index) => {
        return (
          <div key={index} className="attempt">
            {PrintLetters(attempt, pokename)}
          </div>
        );
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

const CurrentWordIsPokemon = (currentWord, allPokes) => {
  pokeArray = allPokes.split(",");
  return pokeArray.indexOf(currentWord) > -1;
};

const TypeButton = ({ showType, setShowType, poketypes }) => {
  return (
    <div className="hint">
      <div>
        {" "}
        {showType ? <ShowTypes poketypes={poketypes} /> : "Need a hint?"}
      </div>
      <button
        onClick={(_) => setShowType(!showType)}
        className="hintButton button"
      >
        {showType ? "Hide type!!!" : "Show pokemon type"}
      </button>
    </div>
  );
};

const ShowTypes = ({ poketypes }) => {
  return (
    <div className="types">
      {poketypes.split(",").length > 1 ? "Types" : "Type"}:&nbsp;
      {poketypes.replace(",", ", ")}
    </div>
  );
};

const ShowConfetti = ({ correct }) => {
  return (
    <div className="confetti">
      <Confetti active={correct} config={confettiConfig} />
    </div>
  );
};

const ShowCorrect = () => {
  return <div className="correct">Correct!!!</div>;
};

export default Word;
