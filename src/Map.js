import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import { Map as LeafletMap, TileLayer, Marker } from "react-leaflet";

import "./Map.css";
import UpArrow from "./components/UpArrow";

const Map = props => {
  const { params } = props.match;
  const position = [params.lat, params.lng];
  const { zoom } = params;
  const mapInfoEl = useRef(null);
  const history = useHistory();

  const onViewportChanged = vp => {
    const newUrl = `/map/${vp.zoom}/${vp.center[1].toFixed(
      5
    )}/${vp.center[0].toFixed(5)}`;

    history.replace(newUrl);
  };

  return (
    <div className="map">
      <LeafletMap
        center={position}
        zoom={zoom}
        maxZoom={15}
        onViewportChanged={onViewportChanged}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        <TileLayer
          attribution='<a href="https://climatecentral.org/">Climate Central</a>'
          minNativeZoom={7}
          maxNativeZoom={11}
          url="https://ab894ee3.fra1.digitaloceanspaces.com/{z}/{x}/{y}"
        />
        <Marker position={position}></Marker>
      </LeafletMap>
      <div className="map__info" ref={mapInfoEl}>
        <div
          className="map__info-up-arrow"
          onClick={() => {
            if (mapInfoEl && mapInfoEl.current) {
              mapInfoEl.current.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          <UpArrow />
        </div>
        <h1 className="map__info-title">
          Warning{" "}
          <span className="map__warning-emoji" role="img">
            ⚠️
          </span>
        </h1>
        <p>
          The red zone shows the predicted flood levels in 2050, areas that are
          expected to flood on average once a year.
          <br />
          (Read the science on{" "}
          <a href="https://coastal.climatecentral.org/map/6/-4.5936/54.2445/?theme=sea_level_rise&map_type=coastal_dem_comparison&elevation_model=coastal_dem&forecast_year=2050&pathway=rcp45&percentile=p50&return_level=return_level_1&slr_model=kopp_2014">
            Climate Central
          </a>
          )
        </p>
        <p>
          Vote for the candidate who will make a government committed to climate
          change – or buy some sandbags.
        </p>
        <p>
          The Conservative Government has failed to act on Climate Change, but
          are on track to win another five years in office.
        </p>
        <div className="btm-par">
          <a
            href="https://tactical.vote"
            target="_blank"
            rel="noopener noreferrer"
          >
            Find candidates who will stop the Tories and protect the climate{" "}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Map;
