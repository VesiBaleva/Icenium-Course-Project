var app = app || {};
var el = new Everlive({
		apiKey: 'e93vqIuZZyQeoiKg'
	});

(function (a) {   
    
    var viewModel = kendo.observable({        
        selectedType:null,
        id:null
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
    
    
    
    a.type = {
        init: init
    };
}(app));