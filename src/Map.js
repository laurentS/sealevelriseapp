import React from "react";
import { useParams } from "react-router-dom";

const Map = () => {
  const { z, x, y } = useParams();

  console.log({ z, x, y });

  return <div>Map</div>;
};

export default Map;
