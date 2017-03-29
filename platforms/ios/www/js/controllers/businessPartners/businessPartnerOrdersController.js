var BusinessPartnerOrdersController=function ($scope, $http, $filter) {
 
    listOrders();

    $scope.getParams = function() { 
        var options = salesNavigator.getCurrentPage().options;
        return options.businessPartner ;
    };


    //Begin showDetailOrder to customerOrders
    $scope.showDetailOrder= function(index){
       var selectedItem = $scope.orders[index];
       salesNavigator.pushPage('views/bp/orderCustomersDetails.html', {order : selectedItem});
       $scope.ordersDiv=true;
    
    };
    //End showDetailOrder


    //Calling in orderCustomersDetails
    $scope.showMoreDetails= function(index){
        var selectedItem = $scope.ordersLine[index];
         salesNavigator.pushPage('views/orders/orderMoreDetails.html', {orderLine : selectedItem});
    };



// Begin listOrders
    function listOrders() {
      //Take the value chosen, in the previous option
      var options = salesNavigator.getCurrentPage().options;
      
      var queryFilter="SELECT * FROM ORDR T0  " ;


      if (options.businessPartner.cardName != null && typeof(options.businessPartner.cardName) != 'undefined')
      {

        queryFilter = queryFilter +" WHERE T0.cardName='"+options.businessPartner.cardName+"'";

      }

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

                              var date = results.rows.item(c).docDate;
                              var anio = date.substring(4,0);
                              var mes=  date.substring(6,4);
                              var dia= date.substring(8,6); 
                              var concat = (anio+"-"+ mes +"-"+ dia);

                              order.docEntry= results.rows.item(c).docEntry;
                              order.cardCode=results.rows.item(c).cardCode;
                              order.cardName=results.rows.item(c).cardName;
                              order.docTotal=results.rows.item(c).docTotal;
                              order.docDate= concat;
                              order.vatSum= results.rows.item(c).vatSum;
                              order.baseImp= (order.docTotal-order.VatSum);


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
// End listOrders  

}

BusinessPartnerOrdersController.$inject = ["$scope", "$http", "$filter"];

oneApp.controller('BusinessPartnerOrdersController', BusinessPartnerOrdersController);



///////////////////////////// Other controller ///////////////////////////////////////

var BusinessPartnerOrdersDetailsController=function ($scope, $http, $filter) {


    $scope.summary = true;
    $scope.details=false;

    $scope.getParams = function() { 
        var options = salesNavigator.getCurrentPage().options;
        return options.order; 
    };
    

    //Calling the filters in OrderDetails.html and invoiceCustomersDetails to Summary
    $scope.showOrderSummary= function(){
          $scope.summary = true;
          $scope.details=false;
          
          //Calling Orders
         // listOrders();
    };

    //Calling the filters in OrderDetails.html to Details
      $scope.showOrderDetails= function(){
          $scope.details=true;
          $scope.summary = false;

          fullOrderDetail();
      };


    // Begin fullOrderDetail
    function fullOrderDetail() {

        //Take the value chosen, in the previous option
        var options = salesNavigator.getCurrentPage().options;
        //$scope.docEntry=options.order.docEntry;
       
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

BusinessPartnerOrdersDetailsController.$inject = ["$scope", "$http", "$filter"];

oneApp.controller('BusinessPartnerOrdersDetailsController', BusinessPartnerOrdersDetailsController);



////////////////////////////////// Other controller ///////////////////////////////////////


var BusinessPartnerOrdersMoreDetailsController=function ($scope, $http, $filter) {



$scope.showMoreDetails= function(index){
    var selectedItem = $scope.ordersLine[index];
    salesNavigator.pushPage('views/orders/orderMoreDetails.html', {orderLine : selectedItem});
 };



// End fullOrderDetail


}

BusinessPartnerOrdersMoreDetailsController.$inject = ["$scope", "$http", "$filter"];

oneApp.controller('BusinessPartnerOrdersMoreDetailsController', BusinessPartnerOrdersMoreDetailsController);