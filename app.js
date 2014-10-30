var lib = new localStorageDB("pigbank", localStorage);

var app = angular.module('app', ["ngRoute"]);

app.config(function($routeProvider,$httpProvider,$locationProvider){

       $routeProvider.

       when("/",{templateUrl:"home.html"}).
       when("/new",{templateUrl:"new.html",controller:"newCtrl"});      

});


app.service('TitulosService', function(){
    
    this.salve = function(scope){
      
      var valor_parcela = scope.valor / scope.parcelas;

      for (var i = 0; i < scope.parcelas; i++) {

        lib.insert("titulos", {
          estabelecimento: scope.estabelecimento.name, 
          descricao: scope.descricao, 
          data: scope.date.setDate(scope.date.getDate()+30), 
          parcela: i, 
          valor: valor_parcela,
          pago: false,
          tipo: scope.tipo.name,

        });
      };
      console.log(i)
      lib.commit();
      
      //return a.parcelas * a.valor;
    }

    this.ultimos90 = function(){
      return lib.query("titulos")
    }

    this.add = function(a) { 
      return a+a; 
    };
});


app.controller('indexCtrl', function($scope, TitulosService) {
   $scope.number = 0
   $scope.titulos = TitulosService.ultimos90($scope);

});

app.controller('newCtrl', function($scope, TitulosService) {
  $scope.colors = [
      {name:'BB', vcto:'22', id:0},
      {name:'CAIXA', vcto:'22', id:1},
      {name:'ITAU', vcto:'22', id:2},
    ];

  $scope.tipos = [
      {name:'Alimentacao', id:0},
      {name:'Salario', id:1},
      {name:'Aluguel', id:2},
    ];

   
   $scope.gravar = function(){
      $scope.mensagem = "INSERIDO COM SUCESSO";
      TitulosService.salve($scope);
   }

});


if( lib.isNew() ) {
    lib.createTable("titulos", ["estabelecimento", "descricao", "data", "parcelas", "valor", "tipo", "pago"]);
    lib.insert("titulos", {estabelecimento: "0", descricao: "Teste", data: "20/10/2014", parcelas: 2, valor: 10});
    lib.commit();
}