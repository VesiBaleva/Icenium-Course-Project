var app = app || {};
var el = new Everlive({
		apiKey: 'e93vqIuZZyQeoiKg'
	});

(function (a) {   
    
    var viewModel = kendo.observable({
        isLoggedIn: false,
        username: "",
        password: "",
        login:onLogin,
        logout:onLogout,
        clearForm:clearForm
        
    });
    
    function init(e) {
        kendo.bind(e.view.element, viewModel);
    }
    
    function onLogin() {
        
       // var userModel=new usersModel();
        username = $('#loginUsername').val();
		password = $('#loginPassword').val();

        if (username === "" || password === "") {
            navigator.notification.alert("Both fields are required!",
                function () { }, "Login failed", 'OK');

            return;
        }
        
        el.Users.login(username, password)
		.then(function () {
            
			return usersModel.load();
            
		})
		.then(function () {
			app.aplication.navigate('views/activitiesView.html');
            viewModel.set("isLoggedIn", true);
		})
		.then(null,
			  function (err) {
				   navigator.notification.alert("Error:"+err.message)
			  }
		);
    }
    
    function onLogout() {
       

          //  that.clearForm();
            viewModel.set("isLoggedIn", false);
    }
    
    function clearForm () {
        viewModel.set("username", "");
        viewModel.set("password", "");
    }
    
    a.loginService = {
        init: init
    };
}(app));