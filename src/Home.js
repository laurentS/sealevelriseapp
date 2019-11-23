import React, { useState } from "react";

import "./Home.css";

const fetchPostcodeLatLng = postcode =>
  new Promise(async (resolve, reject) => {
    const postcodeSanitized = String(postcode).replace(" ", "");
    try {
      const response = await fetch(
        `https://api.postcodes.io/postcodes/${postcodeSanitized}`
      );

      if (!response.ok) {
        if (String(response.status) === "404") {
          reject("Post Code not found. Please enter a full UK Postcode");
        } else {
          reject("There was an error");
        }
      }

      const data = await response.json();

      resolve({
        lat: data.result.latitude,
        lng: data.result.longitude
      });
    } catch (error) {
      // TODO: handle sentry
      reject("There was an error");
    }
  });

const Home = props => {
  const [term, setTerm] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async e => {
    e.preventDefault();

    try {
      const { lat, lng } = await fetchPostcodeLatLng(term);

      props.history.push(`/map/14/${lng}/${lat}`);
    } catch (error) {
      console.log(error);
      setError(error)
    }
  };

  return (
    <div className="home">
      <div className="home__postcode-form-container">
        <form className="home__postcode-form" onSubmit={onSubmit}>
          <h1 className="home__title">Sea Level Rising</h1>
          <legend className="home__legend">Enter you post below to see if you are under water.</legend>
            {error && <div className="home__error-message">{error}</div>}
          <div className="home__form-inputs">
            <input
              className="home__postcode-input"
              type="text"
              onChange={e => setTerm(e.target.value)}
            />
            <button className="home__submit" type="submit">
              Go
            </button>
          </div>
        </form>
      </div>
      <div className="home__background-image" />
    </div>
  );
};

export default Home;
