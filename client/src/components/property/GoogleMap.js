import React, { Fragment } from "react";
import PropTypes from "prop-types";

import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const MapContainer = ({ google, coordinates, price }) => {
  const displayMarkers = () => {
    return (
      <Marker
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
      zoom={12}
      style={{ width: "100vw", height: "280px", postion: "relative" }}
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
  // propertyState: PropTypes.object.isRequired,
  coordinates: PropTypes.object.isRequired,
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyDO-t4VmJpoxRoXIyRRHasOtV2ESQRn7mQ",
})(MapContainer);
