
var wikiApp = angular.module('wikiApp',['ngAnimate']);


wikiApp.controller('wikiController', ['$scope', '$log', '$searchWikiService', function($scope, $log, $searchWikiService) {
    var self = this;
    this.searchTerm = 'Kobe Bryant';
    this.wikiArray = [];
    this.previewLen = 150;
    this.searchWiki = function() {
        this.wikiArray = [];
        $searchWikiService.get(this.searchTerm)
            .then(function(results) {
                var searchResults = results.data.query.pages;
                self.displaySearchResults(searchResults);
            });
    };

    this.displaySearchResults = function(results) {
        for (var prop in results) {
            if(results.hasOwnProperty(prop)) {
                self.wikiArray.push({
                    title: results[prop].title,
                    extract: self.previewDescription(results[prop].extract, self.previewLen),
                    page_id: results[prop].pageid
                });
            }
        }
    };

    this.previewDescription = function(str, num) {
        var dots = '...';
        if( num <= 3 ) {
            str = str.slice(0, num) + dots;
        } else if (str.length > num ) {
            str = str.slice(0, num-dots.length) + dots;
        }
        return str;
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



