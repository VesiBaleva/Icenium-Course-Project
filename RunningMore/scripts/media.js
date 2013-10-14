(function(a) {
    var my_media = null;
    var mediaTimer = null;
    a.audio = {
        init:function() {
             
        },
        close: function() {            
        },
        play:function() {            
            
                playAudio("http://audio.ibeat.org/content/p1rj1s/p1rj1s_-_rockGuitar.mp3");
                
                function playAudio(src) {
                if (my_media == null) {
                    // Create Media object from src
                    my_media = new Media(src, onSuccess, onError, onStatus);
                } // else play current audio
                // Play audio
                my_media.play();

                // Update my_media position every second
                if (mediaTimer == null) {
                    mediaTimer = setInterval(function() {
                        // get my_media position
                        my_media.getCurrentPosition(
                            // success callback
                            function(position) {
                                if (position > -1) {
                                   
                                }
                            },
                            // error callback
                            function(e) {
                                console.log("Error getting pos=" + e);
                                
                            }
                        );
                    }, 10000);
                }
            }
            
            function onSuccess() {
            console.log("playAudio():Audio Success");
            }

            // onError Callback
            //
            function onError(error) {
                alert('code: '    + error.code    + '\n' +
                      'message: ' + error.message + '\n');
            }
            
            // onStatus Callback 
            function onStatus(status) {
                if( status==Media.MEDIA_STOPPED ) {
               //     my_media.play();
                }
            }
                
        },
        pause:function(){
             if (my_media) {
                my_media.pause();
            }
        },
        stop:function(){
          if (my_media) {
                my_media.stop();
            }
            clearInterval(mediaTimer);
            mediaTimer = null;  
        }
    };
}(app));