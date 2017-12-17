var app = angular.module('janData');

app.controller('homeController', homeController);

function homeController($scope, $http, $state) {

    $scope.name = "";
    $scope.village = "";
    $scope.data = "";


    $scope.init = function () {

        if (!sessionStorage.getItem('JWT'))
            $state.go("login");
    }

    $scope.logout = function () {
        sessionStorage.removeItem('JWT')
        $state.go("login");
    }


    $scope.init();

    $scope.printName = function () {

        $http.post('/getByQuery', {
            "colName": "Name",
            "colValue": $scope.name,
            "token": sessionStorage.getItem('JWT')
        }).then(result => {
            $scope.data = result.data;
            $scope.dataStr = JSON.stringify($scope.data);
            $scope.name = "";
            $scope.village = "";
        })
            .catch(err => {
                console.log(err);
            })
    }

    $scope.printVillage = function () {

        $http.post('/getByQuery', {
            "colName": "Village",
            "colValue": $scope.village,
            "token": sessionStorage.getItem('JWT')
        }).then(result => {
            $scope.data = result.data;
            $scope.dataStr = JSON.stringify($scope.data);
            $scope.name = "";
            $scope.village = "";
        })
            .catch(err => {
                console.log(err);
            })
    }


};