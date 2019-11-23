import React from "react";
import { Map as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.match.params;
  }

  render() {
    const { state } = this;
    const position = [state.lat, state.lng];
    return (
      <div id="container">
        <LeafletMap center={position} zoom={state.zoom} maxZoom={18}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
          <TileLayer
            url='https://d1jpwx71i0x1cy.cloudfront.net/map/50189d72c213112cc6401f423bc9bf31/{z}/{x}/{y}?token=f23c727cb1906b127f462b1c0ec073c4'
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br/> Easily customizable.
            </Popup>
          </Marker>
        </LeafletMap>
      </div>
    );
  }
}

export default Map;
