var lib = new localStorageDB("pigbank", localStorage);

var app = angular.module('app', ["ngRoute"]);

app.config(function($routeProvider,$httpProvider,$locationProvider){

       $routeProvider.

       when("/",{templateUrl:"home.html"}).
       when("/new",{templateUrl:"new.html",controller:"newCtrl"});      

});


app.service('TitulosService', function(){
    
    this.salve = function(scope){

      lib.insert("titulos", {
        //estabelecimento: scope.estabelecimento.nome, 
        descricao: scope.descricao, 
        data: scope.date, 
        parcelas: scope.parcelas, 
        valor: scope.valor
      });
      lib.commit();

      console.log(lib.query("titulos"))

      //return a.parcelas * a.valor;
    }

    this.add = function(a) { 
      return a+a; 
    };
});


app.controller('indexCtrl', function($scope) {
   $scope.number = 0

});

app.controller('newCtrl', function($scope, TitulosService) {
  $scope.colors = [
      {name:'BB', vcto:'22', id:0},
      {name:'CAIXA', vcto:'22', id:1},
      {name:'ITAU', vcto:'22', id:2},
    ];
   
   $scope.gravar = function(){
      $scope.mensagem = "INSERIDO COM SUCESSO";
      TitulosService.salve($scope);
   }

});


if( lib.isNew() ) {
    lib.createTable("titulos", ["estabelecimento", "descricao", "data", "parcelas", "valor"]);
    lib.insert("titulos", {estabelecimento: "0", descricao: "Teste", data: "20/10/2014", parcelas: 2, valor: 10});
    lib.commit();
}