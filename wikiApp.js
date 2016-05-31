
var wikiApp = angular.module('wikiApp',[]);


wikiApp.controller('wikiController', ['$scope', '$log', '$searchWikiService', function($scope, $log, $searchWikiService) {
    $scope.searchTerm = 'Kobe Bryant';

    $scope.wikiArray = [];

    $scope.searchWiki = function() {
        $scope.wikiArray = [];
        $searchWikiService.get($scope.searchTerm)
            .then(function(results) {
                var searchResults = results.data.query.pages;
                for (var prop in searchResults) {
                    if(searchResults.hasOwnProperty(prop)) {
                        $scope.wikiArray.push({
                            title: searchResults[prop].title,
                            extract: searchResults[prop].extract,
                            page_id: searchResults[prop].pageid
                        });
                    }
                }
                console.log($scope.wikiArray);
            });
    }

}]);


wikiApp.factory('$searchWikiService', function($http) {

    var baseUrl = 'http://en.wikipedia.org/w/api.php?',
        queryString = 'action=query&format=json&prop=extracts&generator=search&exlimit=max&exintro=1&explaintext=1&gsrsearch=',
        JSON_callback = '&callback=JSON_CALLBACK';

    var wikiService = {
        get: function(searchTerm) {
            return $http.jsonp( baseUrl + queryString + searchTerm + JSON_callback );
        }
    };
    return wikiService;
});



