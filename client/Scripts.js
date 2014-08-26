var app = angular.module("FireNotes", ["firebase"]);
    app.controller("NotesController", function($scope, $firebase) {
        

        var fb = new Firebase("https://lovenotes.firebaseio.com");
        var user ={};

        
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

//        fb.on('value', function (snapshot) {
//            console.log(snapshot.val());
//        }, function (errorObject) {
//            console.log('The read failed: ' + errorObject.code);
//        });

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
            fb.child('users').setWithPriority({name:{first:cUser.thirdPartyUserData.given_name,last:cUser.thirdPartyUserData.family_name}, 
                    id:cUser.id, 
                    email:cUser.email,
                    gender:cUser.thirdPartyUserData.gender,
                    google_imgURL:cUser.thirdPartyUserData.picture,
                   },cUser.id);
        };

        $scope.helloTo = {};
        $scope.helloTo.title = "Andrew, AngularJS";
    });
    