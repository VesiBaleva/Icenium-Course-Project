var app = app || {};

(function () {
    
    document.addEventListener("deviceready", function () {
        app.aplication = new kendo.mobile.Application(document.body, { transition: 'slide', layout: 'tabstrip-layout' });
       
    
    }, false);

    var applicationSettings = {
		apiKey: 'e93vqIuZZyQeoiKg' //Put your API key here
	};
    
    document.addEventListener("offline", onOffline, false);
    
    function onOffline() {
        alert("You are in offline");
        navigator.notification.beep(3);
    }
    
	// initialize Everlive SDK
	var el = new Everlive({
		apiKey: applicationSettings.apiKey
	});
}());