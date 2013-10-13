var app = app || {};

(function () {
    
    document.addEventListener("deviceready", function () {
        app.aplication = new kendo.mobile.Application(document.body, { transition: 'slide', layout: 'tabstrip-layout' });
       
    
    }, false);

    var applicationSettings = {
		apiKey: 'e93vqIuZZyQeoiKg' //Put your API key here
	};
    
	// initialize Everlive SDK
	var el = new Everlive({
		apiKey: applicationSettings.apiKey
	});
}());