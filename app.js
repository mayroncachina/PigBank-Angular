var lib = new localStorageDB("pigbank", localStorage);

var app = angular.module('app', ["ngRoute"]);

app.constant('cartoes', {
	cartoes: ['Banco do Brasil', 'Caixa']
});


app.config(function($routeProvider) {
  $routeProvider
  .when("/welcome", {templateUrl: "index.html", controller: "indexCtrl"})
  .when("/new", {templateUrl: "new.html", controller: "newCtrl"})
  .otherwise({ redirectTo: "/welcome"});
});


app.service('CalculatorService', function(){
		    
    this.soma = function(a) { return a+a; };
});


app.controller('indexCtrl', function($scope, CalculatorService, cartoes) {
   $scope.number = 0
   $scope.doSquare = function(){
   	$scope.answer = CalculatorService.soma($scope.number);
   };

});

app.controller('newCtrl', function($scope, cartoes) {
   $scope.number = 0
});


if( lib.isNew() ) {

    // create the "books" table
    lib.createTable("books", ["code", "title", "author", "year", "copies"]);

    // insert some data
    lib.insert("books", {code: "B001", title: "Phantoms in the brain", author: "Ramachandran", year: 1999, copies: 10});
    lib.insert("books", {code: "B002", title: "The tell-tale brain", author: "Ramachandran", year: 2011, copies: 10});
    lib.insert("books", {code: "B003", title: "Freakonomics", author: "Levitt and Dubner", year: 2005, copies: 10});
    lib.insert("books", {code: "B004", title: "Predictably irrational", author: "Ariely", year: 2008, copies: 10});
    lib.insert("books", {code: "B005", title: "Tesla: Man out of time", author: "Cheney", year: 2001, copies: 10});
    lib.insert("books", {code: "B006", title: "Salmon fishing in the Yemen", author: "Torday", year: 2007, copies: 10});
    lib.insert("books", {code: "B007", title: "The user illusion", author: "Norretranders", year: 1999, copies: 10});
    lib.insert("books", {code: "B008", title: "Hubble: Window of the universe", author: "Sparrow", year: 2010, copies: 10});

    // commit the database to localStorage
    // all create/drop/insert/update/delete operations should be committed
    lib.commit();
}