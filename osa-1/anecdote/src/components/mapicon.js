import {React, useState, useEffect, GoogleMapReact} from "react"
//display location on embedded google maps given address
const DisplayAddress = (address) => {
    const [location, setLocation] = useState({lat: 0, lng: 0})
    useEffect(() => {
        const geocoder = new window.google.maps.Geocoder()
        geocoder.geocode({address: address.address}, (results, status) => {
        if (status === "OK") {
            setLocation({lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()})
        } else {
            alert("Geocode was not successful for the following reason: " + status)
        }
        })
    }, [address.address])
    return (
        <div>
        <h1>Address</h1>
        <p>{address.address}</p>
        <div style={{width: 400, height: 300}}>
            <GoogleMapReact
            bootstrapURLKeys={{key: "AIzaSyB0r8Q2X9J9Y7cZT1Zn4Q2Q4O4o4y4Oj1g"}}
            defaultCenter={location}
            defaultZoom={15}
            >
            <MapIcon lat={location.lat} lng={location.lng}></MapIcon>
            </GoogleMapReact>
        </div>
        </div>
    )
}