// leaflet geocoder or search
L.Control.geocoder().addTo(map);
 
//full screen funciton
var mapid= document.getElementById('map');
function fullscreenView(){
    if(document.fullscreenElement){
        document.exitFullscreen()
    }
    else{
        mapid.requestFullscreen();
    }
}

// print map function
$('.print-map').click(function(){
    window.print();
})

// leaflet print control
L.control.browserPrint({position:'topright'}).addTo(map);

// measure area function
L.control.measure({
    primaryLengthUnit: 'kilometers', 
    secondaryLengthUnit: 'meters',
    primaryAreaUnit: 'sqmeters', 
    secondaryAreaUnit: 'hectares',
}).addTo(map);

 // default zoom level
 $('.default-zoom').click(function(){
    map.setView([34.8021, 38.9968], 7)
})