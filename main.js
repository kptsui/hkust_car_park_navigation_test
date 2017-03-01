var map = null;
var markerIcon = null;
var marker = null;

$(document).ready(function(){
    // init marker icon
    markerIcon = L.icon({
        iconUrl: 'img/location_indicator.png',
        // no need shadow
        //shadowUrl: 'leaf-shadow.png',

        iconSize:     [48, 48], // size of the icon
        //shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [24, 24] // point of the icon which will correspond to marker's location
    });

	// init the map
	map = L.map('mapid', {
		crs: L.CRS.Simple
	});

	var bounds = [[0,0], [800,600]]; // [height, width]
	// add image to map
	var image = L.imageOverlay('img/floor_plan.png', bounds).addTo(map);
	map.fitBounds(bounds);

	// set marker
	//marker = L.marker([371, 178], {icon: markerIcon});
  //marker.addTo(map).bindPopup('You are around here!'); // y, x in pixel

	/*var driver = L.latLng([ 378, 178 ]); // y, x
	marker = L.marker(driver);
	marker.addTo(map).bindPopup('driver');*/

	// center the view according to the marker
	// map.setView( [210, 110], 1);


  /*
  Testing
  */
  var test_data = '[{"bid": 1, "rssi": -59},{"bid": 2, "rssi": -62},{"bid": 3, "rssi": -62},{"bid": 4, "rssi": -75},{"bid": 5, "rssi": -80}]';
  updateMarker(test_data);
  test_data = '[{"bid": 1, "rssi": -75},{"bid": 2, "rssi": -62},{"bid": 3, "rssi": -62},{"bid": 4, "rssi": -75},{"bid": 5, "rssi": -80}]';
  updateMarker(test_data);
  test_data = '[{"bid": 3, "rssi": -62},{"bid": 4, "rssi": -75},{"bid": 5, "rssi": -80}]';
  updateMarker(test_data);
});

/*
Current location point update
input object array = [
{bid: 1, rssi: -99},
{bid: 2, rssi: -99},
{bid: 3, rssi: 0},
{bid: 4, rssi: 0},
{bid: 5, rssi: -99}
];
*/
function updateMarker(arr){ // arr must be json array string
  var jsonArray = JSON.parse(arr);
  if(jsonArray.length == 0){
    console.log("Empty array");
    return;
  }
  var result = findClosestBeaconAsPoint(jsonArray);
  console.log("Match point, bid: " + result.bid + ", x: " + result.x + ", y: " + result.y);

	// remove previous marker
  if(marker != null){
    map.removeLayer(marker);
    console.log("remove previous marker");
  }

	// re-print the marker
	marker = L.marker([result.y, result.x], {icon: markerIcon});
  marker.addTo(map).bindPopup('You are around here!'); // y, x in pixel
  console.log("print marker");

  var path_order = graph.findShortestPath('p' + result.bid, 'c'); // ['a', 'c', 'b']
  if(path_order != null && path_order.length > 1){
    // TODO: print the path
  }
  console.log(path_order);

  console.log("------------------------------");

	// center the view according to the marker
	// map.setView( [y, x], 1);
}

/*
received_beacons = [
{bid: 1, rssi: -99},
{bid: 2, rssi: -99},
{bid: 3, rssi: 0},
{bid: 4, rssi: 0},
{bid: 5, rssi: -99}
];
*/
function findClosestBeaconAsPoint(received_beacons){
  var max_rssi = Number.MIN_SAFE_INTEGER;
  var closestBeacon;
  for(var i = 0; i < received_beacons.length; i++){
    var beacon = received_beacons[i];
    if(beacon.rssi > max_rssi){
      max_rssi = beacon.rssi;
      closestBeacon = beacon;
    }
  }
  console.log("closest Beacon bid: " + closestBeacon.bid + ", rssi: " + closestBeacon.rssi);
  var result = {
    "bid": -1,
    "rssi": 0,
    "x": 0,
    "y": 0,
    "matched": false
  };
  for(var i = 0; i < deployed_beacons.length; i++){
    if(closestBeacon.bid == deployed_beacons[i].bid){
      result.bid = deployed_beacons[i].bid;
      result.rssi = closestBeacon.rssi;
      result.x = deployed_beacons[i].x;
      result.y = deployed_beacons[i].y;

      result.matched = true;
      break;
    }
  }

  return result;
}
