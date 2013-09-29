var App = angular.module('App', ['firebase', 'googlechart']);

App.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl : 'views/d.html'
    }).when('/dashboard', {
        templateUrl : 'views/d.html'
    }).when('/reports', {
        templateUrl : 'views/r.html'
    }).when('/systolic', {
        templateUrl : 'views/w.html'
    }).when('/individual', {
        templateUrl : 'views/q.html'
    });
});

App.controller('dController', ['$scope', '$timeout', '$http', 'Utils', '$location', 'angularFire', 'angularFireCollection',
function($scope, $timeout, $http, Utils, $location, angularFire, angularFireCollection) {

    // var usersRef = new Firebase("https://sampleapp-prab.firebaseio.com/users");
    // $scope.users = [];
    // angularFire(usersRef, $scope, "users");

    $scope.timestamp = [1000, 1005, 1010, 1015, 1020, 1025, 1030, 1035, 1040, 1045];

    $http({
        method : 'GET',
        url : 'https://sampleapp-prab.firebaseio.com/users.json'
    }).success(function(resp) {
        $scope.users = resp;
        $scope.chart1 = Utils.plotChart(resp, 'heartrate', $scope.timestamp);
        $scope.chart3 = Utils.plotChart(resp, 'systolic_pressure', $scope.timestamp);
    });

}]);

App.controller('rController', ['$scope', '$timeout', '$http', 'Utils', '$location', 'angularFire',
function($scope, $timeout, $http, Utils, $location, angularFire) {

    // var userRef = new Firebase("https://sampleapp-prab.firebaseio.com/users");
    // $scope.users = [];
    // angularFire(userRef, $scope, "users");
    // //userRef.push({'email': 'e@e.com', 'name': 'Fred'});

    $scope.timestamp = [1000, 1005, 1010, 1015, 1020, 1025, 1030, 1035, 1040, 1045];

    $http({
        method : 'GET',
        url : 'https://sampleapp-prab.firebaseio.com/users.json'
    }).success(function(resp) {
        $scope.users = resp;
        $scope.chart2 = Utils.plotChart(resp, 'diastolic_presure', $scope.timestamp);
    });

}]);

angular.element(document).ready(function() {
    angular.bootstrap($(document.body), ["App"]);
});
