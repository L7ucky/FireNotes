var app = angular.module("FireNotes", ["firebase"]);
    app.controller("NotesController", function($scope, $firebase) {
        

        var fb = new Firebase("https://lovenotes.firebaseio.com");
        var user ={};
        var references = {};
        var refs = {myUsers:{}};

        
        var authClient = new FirebaseSimpleLogin(fb, function(error, sessionUser) {
            if (error) {
                // an error occurred while attempting login
                console.log(error);
            } else if (sessionUser) {
                // user authenticated with Firebase
                user = sessionUser;
                addUser(sessionUser);
                console.log("User ID: " + sessionUser.uid + ", Provider: " + sessionUser.provider);
            } else {
                // user is logged out
            }
        });


        var authRef = new Firebase("https://lovenotes.firebaseio.com/.info/authenticated");
        authRef.on("value", function(snap) {
            if (snap.val() === true) {
                console.log("authenticated");
            } else {
                console.log("not authenticated");
            }
        });

        $scope.auth = function(){
            console.log("got here");
            var user = authClient.login('google', {
                rememberMe: true,
                scope: 'https://www.googleapis.com/auth/plus.login'
            });
        };
        
        var addUser = function(cUser){
            fb.child('users').child(cUser.id).set({name:{first:cUser.thirdPartyUserData.given_name,last:cUser.thirdPartyUserData.family_name}, 
                    id:cUser.id, 
                    email:cUser.email,
                    gender:cUser.thirdPartyUserData.gender,
                    google_imgURL:cUser.thirdPartyUserData.picture,
                   });
        };

        $scope.helloTo = {};
        $scope.helloTo.title = "Andrew, AngularJS";
    });
    