var app = angular.module("FireNotes", ["firebase"]);
    app.controller("NotesController", function($scope, $firebase) {
        

        var fb = new Firebase("https://lovenotes.firebaseio.com");
        var sync = $firebase(fb);
        var data = sync.$asObject();
        console.log("The angularFire object is: ");
        console.log(data);

        
        var authClient = new FirebaseSimpleLogin(fb, function(error, user) {
            if (error) {
                // an error occurred while attempting login
                console.log(error);
            } else if (user) {
                // user authenticated with Firebase
                console.log("User ID: " + user.uid + ", Provider: " + user.provider);
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
                alert("authenticated");
            } else {
                alert("not authenticated");
            }
        });

        $scope.auth = function(){
            console.log(authClient.login('google', {
                rememberMe: true,
                scope: 'https://www.googleapis.com/auth/plus.login'
            }));

        };

        $scope.helloTo = {};
        $scope.helloTo.title = "Andrew, AngularJS";
    });
    