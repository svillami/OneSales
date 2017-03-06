var ItemDetailsOrderController=function ($scope, $http, $filter) {


var options = salesNavigator.getCurrentPage().options;
$scope.quantity=options.item.quantity;

$scope.total=(parseFloat(options.item.quantity)*parseFloat(options.item.price)).toString() 
+' '+ options.item.currency;

//alert(parseFloat(options.item.quantity)*parseFloat(options.item.price));
$scope.getParams = function() { 
    

    var options = salesNavigator.getCurrentPage().options;

//alert(options.item.itemCode);
    return options.item ;
  };


$scope.saveItem = function() {
     //var selectedItem = $scope.items[index];
      //$data.selectedItem = selectedItem;

     // alert('prueba');
      var options = salesNavigator.getCurrentPage().options;

     //alert($scope.quantity);
     options.item.quantity=$scope.quantity;
     options.item.lineTotal=$scope.total.replace( options.item.currency,'');
      //salesNavigator.popPage('views/orders/priceList.html', {item : options.item.itemCode});
      salesNavigator.popPage('views/orders/orderItemDetails.html');
    };

$scope.goToSelectWhsCode = function() {
     //var selectedItem = $scope.items[index];
      //$data.selectedItem = selectedItem;

     // alert('prueba');
      var options = salesNavigator.getCurrentPage().options;

      //alert(options.item.itemCode);
      //alert(options.order.cardCode);
      //salesNavigator.popPage('views/items/priceList.html', {item : options.item.itemCode});
    salesNavigator.pushPage('views/orders/selectWareHouse.html',{item : options.item},{order : options.order});
    };

$scope.goToSelectPriceList= function() {
     //var selectedItem = $scope.items[index];
      //$data.selectedItem = selectedItem;

     // alert('prueba');
      var options = salesNavigator.getCurrentPage().options;

      //alert(options.item.itemCode);
      //alert(options.order.cardCode);
      //salesNavigator.popPage('views/items/priceList.html', {item : options.item.itemCode});
    salesNavigator.pushPage('views/orders/selectPriceList.html',{item : options.item},{order : options.order});
    };


 $scope.lineItemPrice = function() {

        //alert(item.itemCode);
        //alert(item.quantity);
        //alert(parseInt(item.quantity)-1);
    var options = salesNavigator.getCurrentPage().options;

        var qty=parseFloat(options.item.quantity);
        //alert(qty);
        if (qty<1){
            qty=1;
        }
      

        options.item.quantity=qty;
        options.item.lineTotal=parseFloat($scope.quantity)*parseFloat(options.item.price);
        //alert(options.item.lineTotal +' '+ options.item.currency);
       
        
        //options.item.baseImp=baseImp;
        //alert(item.baseImp);
        
        $scope.total=(parseFloat(options.item.lineTotal))+' '+ options.item.currency;

    };





/*
$scope.showStock = function() {
     //var selectedItem = $scope.items[index];
      //$data.selectedItem = selectedItem;

     // alert('prueba');
      var options = salesNavigator.getCurrentPage().options;

     
      salesNavigator.pushPage('views/items/stock.html', {item : options.item.itemCode});
    };*/


}

ItemDetailsOrderController.$inject = ["$scope", "$http", "$filter"];

oneApp.controller('ItemDetailsOrderController', ItemDetailsOrderController);


