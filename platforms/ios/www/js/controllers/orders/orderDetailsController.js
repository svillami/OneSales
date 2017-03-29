var orderDetailsController=function ($scope, $http, $filter) {

$scope.list= true;
$scope.details= false;


	$scope.getParams = function() { 
    
    var options = salesNavigator.getCurrentPage().options;
    return options.order; 
  };


//Calling the filters in OrderDetails.html to Summary
  $scope.showOrderList= function(){
        $scope.list = true;
        $scope.details=false;
 
  };


//Calling the filters in OrderDetails.html to Details
  $scope.showOrderDetails= function(){
      $scope.details=true;
      $scope.list = false;

      fullOrderDetail();
  };

  $scope.showMoreDetails= function(index){

      var selectedItem = $scope.ordersLine[index];
       salesNavigator.pushPage('views/orders/orderMoreDetails.html', {orderLine : selectedItem});
    };

    // Begin fullOrderDetail
function fullOrderDetail() {

    //Take the value chosen, in the previous option
    var options = salesNavigator.getCurrentPage().options;
   
    var queryFilter="SELECT * FROM RDR1 T0";

    if (options.order.docEntry != null && typeof(options.order.docEntry) != 'undefined')
    {

      queryFilter = queryFilter +" WHERE T0.docEntry='"+options.order.docEntry+"'";

    }

    ordersLine=new Array();
       dataBase.transaction(function(tx) {

          tx.executeSql(queryFilter, 
                     [],
                     function(tx, results)
                     {
                       
                      var nLength = results.rows.length;
          
                       for(var c=0;c<nLength;c++)
                       {
                          var orderLine = new OrderLine();
                          orderLine.docEntry= results.rows.item(c).docEntry;
                          orderLine.itemCode=results.rows.item(c).itemCode;
                          orderLine.dscription=results.rows.item(c).dscription;
                          orderLine.quantity=results.rows.item(c).quantity;
                          orderLine.price=results.rows.item(c).price;
                          orderLine.lineTotal= results.rows.item(c).lineTotal;
                          orderLine.vatSum= results.rows.item(c).vatSum;
                          ordersLine.push(orderLine);
                      }
            
                        $scope.ordersLine=ordersLine;
                        $scope.$apply();
        
                     },
                     function(tx, error)
                     {
                       alert(error.message); 
                     }
       );
    });
}
// End fullOrderDetail

}


orderDetailsController.$inject = ["$scope", "$http", "$filter"];

oneApp.controller('orderDetailsController', orderDetailsController);


////////////////////////////////////Other Controller //////////////////////////////////////////////

var orderMoreDetailsController=function ($scope, $http, $filter) {

// Begin getParamsOrderLine
$scope.getParamsOrderLine = function() { 
    
    var options = salesNavigator.getCurrentPage().options;
    return options.orderLine; 
  };
 // End getParamsOrderLine

}

orderMoreDetailsController.$inject = ["$scope", "$http", "$filter"];

oneApp.controller('orderMoreDetailsController', orderMoreDetailsController);



