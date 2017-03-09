var BusinessPartnerDetailController=function ($scope, $http, $filter) {
 
$scope.getParams = function() { 
    

    var options = salesNavigator.getCurrentPage().options;

//alert(options.item.itemCode);
    return options.businessPartner ;

}

$scope.showPriceList = function() {
     //var selectedItem = $scope.items[index];
      //$data.selectedItem = selectedItem;

     // alert('prueba');
      var options = salesNavigator.getCurrentPage().options;

     
     // salesNavigator.pushPage('views/items/priceList.html', {item : options.item.itemCode});
    };


$scope.showStock = function() {
     //var selectedItem = $scope.items[index];
      //$data.selectedItem = selectedItem;

     // alert('prueba');
      var options = salesNavigator.getCurrentPage().options;

     
     // salesNavigator.pushPage('views/items/stock.html', {item : options.item.itemCode});
    };


}

BusinessPartnerDetailController.$inject = ["$scope", "$http", "$filter"];

oneApp.controller('BusinessPartnerDetailController', BusinessPartnerDetailController);

