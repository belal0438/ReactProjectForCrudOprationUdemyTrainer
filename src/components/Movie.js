import React from "react";

import classes from "./Movie.module.css";

const Movie = (props) => {
  const onDeletHandere = (id) => {
    props.movieDelete(id);
  };

  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <button onClick={() => onDeletHandere(props.id)}>Delete</button>
    </li>
  );
};

export default Movie;
