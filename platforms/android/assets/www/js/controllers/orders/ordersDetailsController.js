var  OrdersDetailsController=function ($scope, $http, $filter) {

getOrders();
$scope.summary= true;
$scope.details= false;
 
 // Calling from orderDetails.html
  $scope.getParams = function() { 
    
    var options = salesNavigator.getCurrentPage().options;
    return options.order; 
  };

//Calling the filters in OrderDetails.html to Summary
  $scope.showOrderSummary= function(){
        $scope.summary = true;
        $scope.details=false;
 
        summaryOrders();
  };

  //Calling the filters in OrderDetails.html to Details
  $scope.showOrderDetails= function(){
      $scope.details=true;
      $scope.summary = false;

      fullOrderDetail();
  };


  // Begin showMoreDetails
  $scope.showMoreDetails= function(index){

    	 var selectedItem = $scope.ordersLine[index];
      salesNavigator.pushPage('views/orders/orderMoreDetails.html', {orderLine : selectedItem});
    };
  // End showMoreDetails  


// Begin summaryOrders
function summaryOrders() {

    var queryFilter="SELECT * FROM ORDR T0 ";

    orders=new Array();
       dataBase.transaction(function(tx) {

          tx.executeSql(queryFilter, 
                     [],
                     function(tx, results)
                     {
                       
                      var nLength = results.rows.length;
           

                       for(var c=0;c<nLength;c++)
                       {

                          var order = new Order();
                          order.docEntry= results.rows.item(c).docEntry;
                          order.cardCode=results.rows.item(c).cardCode;
                          order.cardName=results.rows.item(c).cardName;
                          order.baseImp=results.rows.item(c).baseImp;
                          order.docTotal=results.rows.item(c).docTotal;
                          order.docDate= results.rows.item(c).docDate;
                          order.VatSum= results.rows.item(c).VatSum;
                          orders.push(order);
                      }
                        $scope.orders=orders;
                        $scope.$apply();
        
                     },
                     function(tx, error)
                     {
                       alert(error.message); 
                     }
       );
    });
}
// End summaryOrders  


// Begin fullOrderDetail
function fullOrderDetail() {

    //Take the value chosen, in the previous option
    var options = salesNavigator.getCurrentPage().options;
    $scope.docEntry=options.order.docEntry;
   
    var queryFilter="SELECT * FROM RDR1 T0";

    if ($scope.docEntry != null && typeof($scope.docEntry) != 'undefined')
    {

      queryFilter = queryFilter +" WHERE T0.docEntry='"+$scope.docEntry+"'";

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

function getOrders(){

  orders=new Array();

     dataBase.transaction(function(tx) {

     //alert('carajo');
        tx.executeSql('SELECT * FROM ORDR T0', 
                   [],
                   function(tx, results)
                   {
                     
                    var nLength = results.rows.length;
         
                    //alert(nLength);

                     for(var c=0;c<nLength;c++)
                     {
                      var order = new Order();

                      var date = results.rows.item(c).docDate;
                      var anio = date.substring(4,0);
                      var  mes=  date.substring(6,4);
                      var dia= date.substring(8,6); 
                      var concat = (anio+"-"+ mes +"-"+ dia);

                      order.docEntry= results.rows.item(c).docEntry;
                      order.cardCode=results.rows.item(c).cardCode;
                      order.cardName=results.rows.item(c).cardName;
                      order.docDate= concat;
                      order.docTotal=results.rows.item(c).docTotal;
                      order.VatSum= results.rows.item(c).VatSum;
                      order.baseImp= (order.docTotal - order.VatSum);
                      orders.push(order);
    
                    }
        
                  $scope.orders=orders;
                  $scope.$apply();
      
                   },
                   function(tx, error)
                   {
                     alert(error.message); 
                   }
     );
  });
}


}

OrdersDetailsController.$inject = ["$scope", "$http", "$filter"];

oneApp.controller('OrdersDetailsController', OrdersDetailsController);