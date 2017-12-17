(function () {
    var app = angular.module('ErasamaData', ['ui.router']);

    app.config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {


        $urlRouterProvider.otherwise('/');

        $stateProvider

            .state('login', {
                url: '/',
                templateUrl: 'components/login.html'
            })
            .state('home', {
                url: '/home',
                templateUrl: 'components/home.html'
            })

    }


})();
