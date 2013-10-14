(function(a) {
    var vm = kendo.observable({
        "name":"",        
        "number":[{
            "type":"mobile",
            "value":""
        }]
    });
    var contactsAPI = {
        init: function(e) {
            kendo.bind(e.view.element, vm, kendo.mobile.ui);
        },
        create: function() {
            
          var myContact = navigator.contacts.create();          
          myContact.displayName = vm.name;
          myContact.nickname = vm.name;
          var phoneNumbers=[3];
          phoneNumbers[0] = new ContactField('work', vm.number.value, false);
		  phoneNumbers[1] = new ContactField('mobile', vm.number.value, false);
		  phoneNumbers[2] = new ContactField('home',vm.number.value, true);
          myContact.phoneNumbers=phoneNumbers;
          var photo=[1];
          var image = document.getElementById('smallImage');
          photo[0]=new ContactField('photo', image.src, false);
            
            myContact.photos=photo;
          
          myContact.save(onSuccess,onError);
          console.log("The contact successfully created");
          function onSuccess(contact) {
                alert("Save Success");
                navigator.notification.vibrate(200);
            };

            function onError(contactError) {
                alert("Error = " + contactError.code);
            };
        }
        
    }
    
    a.contactsApi = contactsAPI;
}(app));