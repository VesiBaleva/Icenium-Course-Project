var app = app || {};
var el = new Everlive({
		apiKey: 'e93vqIuZZyQeoiKg'
	});

(function (a) {   
    
    var viewModel = kendo.observable({
        types:[],
        selectedType:null,
        typeSelected:onTypeChanged        
    });
    
    function getAllTypes() {
        var data = el.data('Types');
        data.get()
            .then(function(types){
                viewModel.set("types", types);
                var p=[];
                for(i=0;i<types.result.length;i++) {
                    p.push(types.result[i])
                }
                console.log(p);
                viewModel.set("types", p);
                console.log(p);
            },
            function(error){
                alert(JSON.stringify(error));
            });
        
    }
    
    function init(e) {
        kendo.bind(e.view.element, viewModel);
        getAllTypes();        
    }
    
    function onTypeChanged(e) {
        
        var data = el.data('Types');
        data.getById(e.data.Id)
        .then(function(type){
         //   alert(JSON.stringify(data));
          //  viewModel.set("selectedType", type);
            console.log(type.result.id);
            app.aplication.navigate('views/typeView.html?id=' + type.result.Id);
            console.log(type);
        },
        function(error){
            alert(JSON.stringify(error));
        });        
       
    }
    
    a.typesService = {
        init: init
    };
}(app));