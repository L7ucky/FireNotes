angular.module("myapp", [])
    .controller("HelloController", function($scope) {
        var fb = new Firebase("https://lovenotes.firebaseio.com");

        fb.on('value', function (snapshot) {
            console.log(snapshot.val());
        }, function (errorObject) {
            console.log('The read failed: ' + errorObject.code);
        });
        
        $scope.helloTo = {};
        $scope.helloTo.title = "Andrew, AngularJS";
    } );