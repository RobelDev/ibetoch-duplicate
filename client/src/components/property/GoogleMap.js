import React from "react";
//import GoogleMapReact from "google-map-react";
// import { findOnMap } from "../../actions/propertyAction";
// import { connect } from "react-redux";
import PropTypes from "prop-types";
// import config from "config";

import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const MapContainer = ({ google, coordinates, price }) => {
  // const [stores, setTemp] = useState([
  //   { latitude: coordinates.lat, lng: coordinates.lng },
  // ]);

  const displayMarkers = () => {
    // return coordinates.map((store, index) => {
    return (
      <Marker
        // key={index}
        // id={index}
        position={{
          lat: coordinates.lat,
          lng: coordinates.lng,
        }}
        onClick={() => console.log(`price: ${price} `)}
      />
    );
  };

  return (
    <Map
      google={google}
      zoom={8}
      style={{ width: "100vw", height: "100vh" }}
      initialCenter={{
        lat: coordinates.lat,
        lng: coordinates.lng,
      }}
    >
      {displayMarkers()}
    </Map>
  );
};

MapContainer.propTypes = {
  coordinates: PropTypes.object.isRequired,
};
// config.get("GOOGLE_MAP_API_KEY");
export default GoogleApiWrapper({
  apiKey: "AIzaSyDO-t4VmJpoxRoXIyRRHasOtV2ESQRn7mQ",
})(MapContainer);
