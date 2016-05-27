
var wikiApp = angular.module('wikiApp',[]);


wikiApp.controller('wikiController', ['$scope', '$log', function($scope, $log) {
    $scope.searchTerm = 'kobe bryant';

    $log.log($scope.searchTerm);

}]);

