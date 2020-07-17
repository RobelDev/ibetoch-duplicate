import React from "react";
import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import { findOnMap } from "../../actions/propertyAction";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const MapContainer = ({ google, price, coordinates }) => {
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
      style={{ width: "100%", height: "33rem", postion: "relative" }}
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

// const mapStateToProps = (state) => ({
//   propertyState: state.propertyReducer,
// });

export default GoogleApiWrapper({
  apiKey: "AIzaSyDO-t4VmJpoxRoXIyRRHasOtV2ESQRn7mQ",
})(MapContainer);
