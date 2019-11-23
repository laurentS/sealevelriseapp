import React, { useState } from "react";
import { Redirect } from "react-router-dom";

const fetchPostcodeLatLng = postcode =>
  new Promise(async (resolve, reject) => {
    const postcodeSanitized = String(postcode).replace(" ", "");
    try {
      const response = await fetch(
        `https://api.postcodes.io/postcodes/${postcodeSanitized}`
      );

      if (!response.ok) {
        if (response.status === "404") {
          reject("Not found");
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

const Home = () => {
  const [term, setTerm] = useState("");
  const [latLng, setLatLng] = useState({ lat: undefined, lng: undefined });

  const onSubmit = async e => {
    e.preventDefault();

    try {
      const latLng = await fetchPostcodeLatLng(term);

      console.log(latLng);
      setLatLng(latLng);
    } catch (error) {
      console.log(error);
    }
  };
  const { lat, lng } = latLng;

  if (lat && lng) {
    return <Redirect to={`/map/14/${lat}/${lng}`} />;
  }

  return (
    <div>
      Home
      <form onSubmit={onSubmit}>
        <input type="text" onChange={e => setTerm(e.target.value)} />
      </form>
    </div>
  );
};

export default Home;
