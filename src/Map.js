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
          The areas highlighted in red are potential flood areas as forecasted for 2030. This is based on recent research published in 2019. In summary, it is expected that these areas are likely to flood on average once a year in 10 years from now. You can find all the scientific details <a href="https://coastal.climatecentral.org">on this page</a> along with options to see forecasts all the way to 2100, and worst case scenarios.
          </div>
          <div class="btm-par">
            If your house is in the red areas, this could mean that you will have a hard time insuring your property, or insurers may simply refuse to insure it at all. This will have a major impact on the value of your house, if it is still inhabitable at all.
          </div>
          <div class="btm-par">
            If your house is not in the red area, we suggest you scroll around the UK (and the rest of the world), to get a sense of the extent of the potentially flooded areas. If it looks worrying, it's because it is!
          </div>
          <div class="btm-par">
            The current government has done essentially nothing to address these very real issues, and time to act is running out. Ask your local candidate what they intend to do about climate change now.
          </div>
        </div>
      </div>
    );
  }
}

export default Map;
