var map = L.map("map").setView([28.3949, 84.124], 7);

// basemap layers
var osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map); // default map
var imagery = L.tileLayer("http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}", {
  maxZoom: 20,
  subdomains: ["mt0", "mt1", "mt2", "mt3"],
});
var googleStreets = L.tileLayer(
  "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
  {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
  }
);

// ************ leaflet-geoserver-request *********************************************************************************************************************************************
// wms layer
var WMSsyangja = L.Geoserver.wms("http://localhost:8080/geoserver/wms", {
  layers: "Geoserver:Syangja",
  transparent: true,
});
var WMSnepal = L.Geoserver.wms("http://localhost:8080/geoserver/wms", {
  layers: "Geoserver:Nepal_District",
  transparent: true,
  // CQL_FILTER: "district=='KATHMANDU'",
  attribution: "GEOSERVER-REQUEST",
});
var WMSgandaki = L.Geoserver.wms("http://localhost:8080/geoserver/wms", {
  layers: "Geoserver:Gandaki_covid",
  // transparent: false,
});
// wfs layer
// var WMScities = L.Geoserver.wfs("http://localhost:8080/geoserver/wfs", {
//     layers: "geoserver:world_cities",               // geojson layer
// });

// legend request
var layerLegend = L.Geoserver.legend("http://localhost:8080/geoserver/wms", {
  layers: "geoserver:Nepal_District",
  // style: `vector_style`,
});
// ***********************************************************************************************************************************
// default marker
var point = L.marker([28.3949, 84.124]) //.addTo(map)
  .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
  .openPopup(); // default popup

// add scale to map
// L.control.scale({position: 'bottomright'}).addTo(map);
L.control.scale().addTo(map);

// change position of zoomcontrol
map.zoomControl.setPosition("topright");

// map coordinate funciton
map.on("mousemove", function (e) {
  // console.log(e)
  $(".coordinate").html(`lat: ${e.latlng.lat} lng: ${e.latlng.lng}`);
});

// load geojson data
var marker = L.markerClusterGroup();
var geodata = L.geoJSON(data, {
  onEachFeature: function (feature, layer) {
    layer.bindPopup(feature.properties.name);
  },
});
geodata.addTo(marker);
// marker.addTo(map);
// L.geoJSON(data).addTo(map);

//    style bagmati
function getColor(d) {
  return d > 390374249.96
    ? "#800026"
    : d > 206524528.99
    ? "#BD0026"
    : d > 140870084.59
    ? "#E31A1C"
    : d > 80499990.44
    ? "#FC4E2A"
    : d > 54597359.27
    ? "#FD8D3C"
    : d > 6556585.38
    ? "#FEB24C"
    : "#FFEDA0";
}
function style(feature) {
  return {
    fillColor: getColor(feature.properties.SHAPE_AREA),
    weight: 2,
    opacity: 1,
    color: "white",
    Array: "3",
    fillOpacity: 0.7,
  };
}
var bagmati = L.geoJSON(Bagmati_geojson, {
  style: style,
  onEachFeature: function (feature, layer) {
    layer.bindPopup(
      feature.properties.FIRST_DIST + "<br>" + feature.geometry.type
    );
  },
//   filter: function(feature){
//       if(feature.properties.FIRST_DCOD === 31){
//           return true;
//       }
//   }
});
// legend of bagmati
var legend = L.control({position: 'bottomleft'});
legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [ 6556585.38, 54597359.27, 80499990.44,  140870084.59, 206524528.99, 390374249.96],
        labels = [];

    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
    return div;
};
legend.addTo(map);

// layer checkbox
$('.layer-card-cb').on('change',function(){
    if($(this).is(":checked")){
        // console.log('already checked');
        bagmati.addTo(map);
    } else{
        // console.log('not checked');
        map.removeLayer(bagmati);
    }
})

// opacity range
$('.opacity').on('change',function(){
    var value= $(this).val();
    var opacity= value/100
    console.log(opacity);

    bagmati.setStyle({fillOpacity: opacity, opacity:opacity});
})



// layer controller
var baseMaps = {
  'OSM': osm,
  'IMAGERY': imagery,
  'GOOGLE': googleStreets,
};
var overLays = {
  'DATA': geodata,
  'Cluster': marker,
  "Default Point": point,
  'Nepal': WMSnepal,
  'Syangja': WMSsyangja,
  "Gandaki Covid": WMSgandaki,
  'Bagmati': bagmati,
};
L.control.layers(baseMaps, overLays, { position: "topleft", collapsed: false }).addTo(map);
