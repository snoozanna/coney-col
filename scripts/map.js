// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.

let map, infoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 51.513743, lng: -0.0958325 },
    zoom: 13,
  });

  const icons = {
    fair: {
      icon: {
        path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
        fillColor: "hotpink",
        fillOpacity: 0.6,
        strokeWeight: 0,
        rotation: 0,
        scale: 10,
      },
    },
    adventure: {
      icon: {
        path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
        fillColor: "blue",
        fillOpacity: 0.6,
        strokeWeight: 0,
        rotation: 0,
        scale: 10,
      },
    },
    hunt: {
      icon: {
        path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
        fillColor: "green",
        fillOpacity: 0.6,
        strokeWeight: 0,
        rotation: 0,
        scale: 10,
      },
    },
  };

  const locations = [
    {
      position: new google.maps.LatLng(
        51.517688631783976,
        -0.10081760748074763,
      ),
      type: "fair",
      content:
        '<div id="content">' +
        "<h3>Fair 1</h3>" +
        "<p>Infomation about this fair</p>" +
        "</div>",
    },
    {
      position: new google.maps.LatLng(51.51596415654087, -0.10630967216174751),
      type: "adventure",
      content:
        '<div id="content">' +
        "<h3>Adventure 1</h3>" +
        "<p>Infomation about this adventure</p>" +
        "</div>",
    },
    {
      position: new google.maps.LatLng(51.51335645826938, -0.08959207632630892),
      type: "adventure",
      content:
        '<div id="content">' +
        "<h3>Adventure 2</h3>" +
        "<p>Infomation about this adventure</p>" +
        `<a href="https://www.youhavefoundconey.net/" target="_blank"><strong>Link to another website</strong></a>` +
        "</div>",
    },
    {
      position: new google.maps.LatLng(51.51984594260593, -0.10259542547264745),
      type: "adventure",
      content:
        '<div id="content">' +
        "<h3>Adventure 3</h3>" +
        "<p>Infomation about this adventure</p>" +
        "</div>",
    },
    {
      position: new google.maps.LatLng(51.51647019724397, -0.09342378488567582),
      type: "hunt",
      content:
        '<div id="content">' +
        "<h3>HUNT</h3>" +
        "<p>Infomation about the hunt</p>" +
        "</div>",
    },
  ];

  // TODO change it to follow this logic https://developers.google.com/maps/documentation/javascript/examples/marker-remove

  const clearMarkers = () => {};

  const showAllMarkers = () => {
    locations.map((location) => {
      const marker = new google.maps.Marker({
        position: location.position,
        icon: icons[location.type].icon,
        map: map,
      });
      const placewindow = new google.maps.InfoWindow({
        content: location.content,
      });
      marker.addListener("click", () => {
        placewindow.open({
          anchor: marker,
          map,
          shouldFocus: false,
        });
      });
    });
  };

  const showAdventures = () => {
    const adventures = [];
    locations.map((location) => {
      if (location.type === "adventure") adventures.push(location);
    });
    adventures.map((location) => {
      const marker = new google.maps.Marker({
        position: location.position,
        icon: icons[location.type].icon,
        map: map,
      });
      const placewindow = new google.maps.InfoWindow({
        content: location.content,
      });
      marker.addListener("click", () => {
        placewindow.open({
          anchor: marker,
          map,
          shouldFocus: false,
        });
      });
    });
  };

  // Reveal location buttons
  const adventureBtn = document.getElementById("adventureBtn");
  adventureBtn.addEventListener("click", () => {
    showAdventures();
  });
  const everythingBtn = document.getElementById("everythingBtn");
  everythingBtn.addEventListener("click", () => {
    showAllMarkers();
  });

  // Functionality for showing your own location

  infoWindow = new google.maps.InfoWindow();

  const locationButton = document.createElement("button");
  locationButton.textContent = "Show my Current Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      // navigator.geolocation.getCurrentPosition(
      navigator.geolocation.watchPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          const userMarker = new google.maps.Marker({
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              fillColor: "purple",
              fillOpacity: 0.6,
              strokeWeight: 0,
              rotation: 0,
              scale: 8,
            },
            position: pos,
            map: map,
          });
          userMarker.setPosition(pos);
          userMarker.addListener("click", () => {
            placewindow.open({
              anchor: marker,
              map,
              shouldFocus: false,
            });
          });

          infoWindow.setPosition(pos);
          infoWindow.setContent("You are here.");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        },
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation.",
  );
  infoWindow.open(map);
}

window.initMap = initMap;

// To show current location as latitude and long

let currentlat = 51.511980258090276;
let currentlng = -0.08828733953354373;

const reCentreMap = (currentlat, currentlng) => {
  const cityMap = document.getElementById("map2");
  cityMap.innerHTML = `<iframe src="https://www.google.com/maps/d/embed?mid=1uDTupDbexb25b7sKfx7vTbMh1EV4toQ&ll=${currentlat}%2C${currentlng}}&z=13hl=en&ehbc=2E312F" height="480"></iframe`;
  console.log(currentlat, currentlng);
};

reCentreMap(currentlat, currentlng);

// cityMap.innerHTML = ` <iframe
//       src="https://www.google.com/maps/d/embed?mid=1uDTupDbexb25b7sKfx7vTbMh1EV4toQ&ll=2.511980258090276%2C-0.08828733953354373&z=16hl=en&ehbc=2E312F"
//       width="640" height="480"></iframe>`;

function geoFindMe() {
  const status = document.querySelector("#status");

  function success(position) {
    // const latitude = position.coords.latitude;
    // const longitude = position.coords.longitude;
    let currentlat = position.coords.latitude;
    let currentlng = position.coords.longitude;
    reCentreMap(currentlat, currentlng);

    status.textContent = "";
    console.log(`Latitude: ${latitude} °, Longitude: ${longitude} °`);
  }

  function error() {
    status.textContent = "Unable to retrieve your location";
  }

  if (!navigator.geolocation) {
    status.textContent = "Geolocation is not supported by your browser";
  } else {
    status.textContent = "Locating…";
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

document.querySelector("#find-me").addEventListener("click", geoFindMe);
