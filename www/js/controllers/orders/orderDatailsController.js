var orderDatailsController=function ($scope, $http, $filter) {

$scope.getParams = function() { 
    
//alert('hello');
    var options = salesNavigator.getCurrentPage().options;

//alert(options.order.docEntry);
    return options.order ;
  };


}

orderDatailsController.$inject = ["$scope", "$http", "$filter"];

oneApp.controller('orderDatailsController', orderDatailsController);


