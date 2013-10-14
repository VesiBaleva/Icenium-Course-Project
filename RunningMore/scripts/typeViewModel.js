var app = app || {};
var el = new Everlive({
		apiKey: 'e93vqIuZZyQeoiKg'
	});

(function (a) {   
    
    var viewModel = kendo.observable({        
        selectedType:null,
        id:null,
        time:"00:00:00",
        dist:0,
        speed:0,
        start:onStart,
        stop:onStop,
        currentPosLat:0,
        currentPosLon:0,
        calculatedDistance:0,
        watchID:null
    });
    
    function getTypeById(e) {
        var data = el.data('Types');
        console.log(e.view.params.id);
        data.getById(e.view.params.id)
        .then(function(type){
            
            console.log(type);
            var p= type.result;
            viewModel.set("selectedType", p);
            console.log(type.result);
        },
        function(error){
            alert(JSON.stringify(error));
        });        
    }
    
    function init(e) {
        kendo.bind(e.view.element, viewModel);
        getTypeById(e);        
    }
    
    function onStart() {
        
        app.audio.play();
        
        navigator.geolocation.getCurrentPosition(onSuccess,onError);
       
        
       function onSuccess(position) {        
            var lat1 = position.coords.latitude;
            var lon1 = position.coords.longitude;
            viewModel.set("currentPosLat",lat1);
            viewModel.set("currentPosLon",lon1);
            viewModel.set("dist",0);            
            
        }
        
        function onError(){
                alert('code: '    + error.code    + '\n' +
                  'message: ' + error.message + '\n');                
            };
        
        
       watchGeoLocation();
    }
    
    function watchGeoLocation(){
        
        var options = { frequency: 6000, enableHighAccuracy: true};
        
         watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);
        
        function onSuccess(position) {        
            var calculatedDistance=$('#dist').text() || 0;
            var lat1 = $('#currentPosLat').text();
            var lat2=position.coords.latitude;
            var lon1 = $('#currentPosLon').text();
            var lon2=position.coords.longitude;
            calculatedDistance = calculatedDistance+ distance(lon1,lat1,lon2,lat2);
            viewModel.set("dist",calculatedDistance);
            viewModel.set("currentPosLat",lat2);
            viewModel.set("currentPosLon",lon2);
            
            function distance(lon1, lat1, lon2, lat2) {
              /*var R = 6371; // Radius of the earth in km
              var dLat = (lat2-lat1)*Math.PI/180;  // Javascript functions in radians
              var dLon = (lon2-lon1)*Math.PI/180; 
              var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                      Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) * 
                      Math.sin(dLon/2) * Math.sin(dLon/2); 
              var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
              var d = (R * c)/1000; // Distance in km
              console.log(d);*/
              var d=Math.sqrt((lat2-lat1)*(lat2-lat1)+(lon2-lon1)*(lon2-lon1));
              return d;
            }
            
            /** Converts numeric degrees to radians */
            /*if (typeof(Number.prototype.toRad) === "undefined") {
              Number.prototype.toRad = function() {
                return this * Math.PI / 180;
              }
            }*/
        }
        
        function onError(error) {
          alert('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');
        }
    }
    
    function onStop() {
        clearWatch();
        app.audio.stop();
    }
    
    function clearWatch() {
        if (watchID != null) {
            navigator.geolocation.clearWatch(watchID);
            watchID = null;
            viewModel.set("currentPosLat",0);
            viewModel.set("currentPosLon",0);
        }
    }
    
    
    a.type = {
        init: init
    };
}(app));