import React from "react";
import { Map as LeafletMap, TileLayer, Marker } from "react-leaflet";

import "./Map.css"

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.match.params;
  }

  onViewportChanged = (vp) => {
    const newUrl = `/map/${vp.zoom}/${vp.center[1].toFixed(5)}/${vp.center[0].toFixed(5)}`;
    this.props.history.push(newUrl);
  }

  render() {
    const { state } = this;
    const position = [state.lat, state.lng];
    return (
      <div className="map">
        <LeafletMap
          center={position}
          zoom={state.zoom}
          maxZoom={18}
          onViewportChanged={this.onViewportChanged}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />
          <TileLayer
            attribution='<a href="https://climatecentral.org/">Climate Central</a>'
            // 2030 - sea level rise + annual floods - moderate cuts - medium luck
            url="https://d1jpwx71i0x1cy.cloudfront.net/map/5ec03d4c7f9bd9f5c84822a1234834d1/{z}/{x}/{y}?token=c6fb3d1a7bd5eff4deada8ec166bc7f9"
            // 2050 - sea level rise + annual floods - moderate cuts - medium luck
            // url="https://d1jpwx71i0x1cy.cloudfront.net/map/50189d72c213112cc6401f423bc9bf31/{z}/{x}/{y}?token=f23c727cb1906b127f462b1c0ec073c4"
          />
          <Marker position={position}>
          </Marker>
        </LeafletMap>
        <div className="map-bottom">
          <div class="btm-par">
If you or your family life live in the red zone, you should vote for the candidate who will make a government committed to climate change – or buy some sandbags. The Conservative Government has failed to act on Climate Change, but are on track to win another five years in office.
          </div>
          <div class="btm-par">
            <a href="https://tactical.vote" target="_blank" rel="noopener noreferrer">Find candidates who will stop the Tories and protect the climate </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Map;
