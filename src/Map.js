import React from "react";
import { Map as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";

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
            url="https://d1jpwx71i0x1cy.cloudfront.net/map/50189d72c213112cc6401f423bc9bf31/{z}/{x}/{y}?token=f23c727cb1906b127f462b1c0ec073c4"
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </LeafletMap>
      </div>
    );
  }
}

export default Map;
