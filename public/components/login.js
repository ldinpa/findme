var app = angular.module('ErasamaData');

app.controller('loginController', loginController);

function loginController($scope, $http, $state) {

    $scope.username = "";
    $scope.password = "";
    $scope.error = "";


    $scope.formSubmit = function () {

        $http.post('/login', {
            "username": $scope.username,
            "password": $scope.password
        }).then(result => {

            sessionStorage.JWT = result.data.JWT;
            $state.go("home");

        })
            .catch(err => {
                $scope.username = "";
                $scope.password = "";
                $scope.error = err.data.message;

            })


    }


}

