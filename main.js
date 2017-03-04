var map = null;
var markerIcon = null;
var marker = null;

var previousPoint = null;
var currentPoint = null;

var yx = L.latLng;

var xy = function(x, y) {
	if (L.Util.isArray(x)) {    // When doing xy([x, y]);
		return yx(x[1], x[0]);
	}
	return yx(y, x);  // When doing xy(x, y);
};

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
  updateMarker('D', test_data);
  /*test_data = '[{"bid": 1, "rssi": -75},{"bid": 2, "rssi": -62},{"bid": 3, "rssi": -62},{"bid": 4, "rssi": -75},{"bid": 5, "rssi": -80}]';
  updateMarker('D', test_data);
  test_data = '[{"bid": 3, "rssi": -62},{"bid": 4, "rssi": -75},{"bid": 5, "rssi": -80}]';
  updateMarker('D', test_data);*/
});

function printPath(path_order){
  // input: ['p1', 'forkA', 'p2', 'p3', 'c']
  // the number behind 'p' is the bid
  // last item must be car lot id string
  // p2's x, y = deployed_beacons[2].x, deployed_beacons[2].y
  if(path_order != null && path_order.length > 1){
    var xy_arr = [];
    var durations = [];
    for(var i = 0; i < path_order.length; i++){
			if(path_order[i].indexOf('p') == 0 && path_order[i].length > 1){
				var id = parseInt(path_order[i].substring(1)); // p10 => 10
				var beacon_points = deployed_beacons.filter(function(obj){
					return obj.bid == id;
				});
				if(beacon_points.length != 0){
					xy_arr.push([beacon_points[0].y, beacon_points[0].x]);
		      durations.push(200);

					console.log("push point: " + beacon_points[0].bid);
				}
			}
			else if(path_order[i].indexOf('fork') != -1){
				var forks = fork_points.filter(function(obj){
					return obj.fork_id == path_order[i];
				});
				if(forks.length != 0){
					xy_arr.push([forks[0].y, forks[0].x]);
		      durations.push(200);

					console.log("push fork point: " + forks[0].fork_id);
				}
			}
			else { // case: path_order[i] belongs to car ids
				var lots = car_lots.filter(function(obj){
					return obj.car_id == path_order[i];
				});
				if(lots.length != 0){
					xy_arr.push([lots[0].y, lots[0].x]);
		      durations.push(200);

					console.log("push car lot point: " + lots[0].car_id);
				}
				/*
				var car_lot_id = path_order[i];
				for(var i = 0; i < car_lots.length; i++){
		      var car_lot = car_lots[i];
		      if(car_lot.car_id == car_lot_id){
		        xy_arr.push([car_lot.y, car_lot.x]);
		        durations.push(200);
		        break;
		      }
		    }
				*/
			}
    }

    var myMovingMarker = L.Marker.movingMarker(xy_arr, durations, {icon: markerIcon}).addTo(map);
    L.polyline(xy_arr, {color: 'red'}).addTo(map);
    // remove previous marker
    if(marker != null){
      map.removeLayer(marker);
      console.log("remove previous marker");
    }
    myMovingMarker.start();
    /*
    for(var i = 1; i < path_order.length - 1; i++){
      var start = parseInt(path_order[i-1].substring(1));
      var end = parseInt(path_order[i].substring(1));
      var pointStart = deployed_beacons[start];
      var pointEnd = deployed_beacons[end];
      // TODO: draw line from pointStart.x .y to pointEnd.x .y
      L.polyline([xy(pointStart.x, pointStart.y), xy(pointEnd.x, pointEnd.y)])
      .addTo(map);

      console.log("start: " + start + ", end: " + end);
      console.log("pointStart: " + pointStart.x + ", " + pointStart.y + ", pointEnd: " + pointEnd.x + ", " + pointEnd.y);
    }

    var start = parseInt(path_order[path_order.length - 2].substring(1));
    var last_access_point = deployed_beacons[start];

    var car_lot_id = path_order[path_order.length - 1];
    for(var i = 0; i < car_lots.length; i++){
      if(car_lots[i].car_id == car_lot_id){
        // TODO: draw from last_access_point.x / .y to car_lots[i].x, car_lots[i].y
        L.polyline([xy(last_access_point.x, last_access_point.y), xy(car_lots[i].x, car_lots[i].y)])
        .addTo(map);
        console.log("last_access_point: " + last_access_point.x + ", " + last_access_point.y + ", car_lots[i]: " + car_lots[i].x + ", " + car_lots[i].y);

        break;
      }
    }
    */
  }
}

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
function updateMarker(destination, arr){ // arr must be json array string
  var jsonArray = JSON.parse(arr);
  if(jsonArray.length == 0){
    console.log("Empty array");
    return;
  }
	previousPoint = currentPoint;
  currentPoint = findClosestBeaconAsCurrentPoint(jsonArray);
  console.log("Match point, bid: " + currentPoint.bid + ", x: " + currentPoint.x + ", y: " + currentPoint.y);

	// remove previous marker
  if(marker != null){
    map.removeLayer(marker);
    console.log("remove previous marker");
  }

	// re-print the marker
	marker = L.marker([currentPoint.y, currentPoint.x], {icon: markerIcon});
  marker.addTo(map).bindPopup('You are around here!'); // y, x in pixel
  console.log("print marker");

  // Update the path
  var path_order = graph.findShortestPath('p' + currentPoint.bid, destination); // ['a', 'c', 'b']
  console.log(path_order);
  printPath(path_order);

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
function findClosestBeaconAsCurrentPoint(received_beacons){
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
