var ConfigController=function ($scope, $http, $filter) {



$scope.addTables = function() {
 //   $scope.user = 'Hello ' + name + '!';
  
createTables(dataBase);

  };

}

ConfigController.$inject = ["$scope", "$http", "$filter"];

oneApp.controller('ConfigController', ConfigController);