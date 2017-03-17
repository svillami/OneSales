var BusinessPartnerDetailController=function ($scope, $http, $filter) {
 

$scope.getParams = function() { 

    var options = salesNavigator.getCurrentPage().options;
    $scope.businessPartners = options.businessPartner.cardName;
    summaryOrders($scope.businessPartners);
    return options.businessPartner;

}


 //Begin showOrders
    $scope.showOrders = function(index) {
        debugger;
        var selectedItem = $scope.businessPartners;
        salesNavigator.pushPage('views/bp/customerOrders.html', {businessPartner : selectedItem});
    };
    //End showOrders

    //Begin showInvoices
    $scope.showInvoices = function(index) {
        var selectedItem = $scope.businessPartners[index];
        salesNavigator.pushPage('views/bp/customerInvoices.html', {businessPartner : selectedItem});
    };
    //End showInvoices

    //Begin showPayments
    $scope.showPayments = function(index) {
        var selectedItem = $scope.businessPartners[index];
        salesNavigator.pushPage('views/payments/customerPayments.html', {businessPartner : selectedItem});
    };
    //End showPayments


// Changing to show before value 
$scope.showDocuments = function(index) {

 //var selectedItem = $scope.businessPartners[index];
  salesNavigator.pushPage('views/bp/BpDocuments.html', {businessPartner : $scope.businessPartners});
};
    
$scope.getParamsBusinessPartner = function() { 

    var options = salesNavigator.getCurrentPage().options;
    return options.order ;
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

// Begin summaryOrders
    function summaryOrders(index) {

      //Take the value chosen, in the previous option
      var options = salesNavigator.getCurrentPage().options;
      //debugger;
      //$scope.cardName=$scope.businessPartners;
      $scope.cardName=index;

        var queryFilter="SELECT * FROM ORDR T0 ";


      if ($scope.cardName != null && typeof($scope.cardName) != 'undefined')
      {

        queryFilter = queryFilter +" WHERE T0.cardName='"+$scope.cardName+"'";

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
                              order.baseImp=results.rows.item(c).baseImp;
                              order.docTotal=results.rows.item(c).docTotal;
                              order.docDate= concat;
                              order.vatSum= results.rows.item(c).vatSum;
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



}

BusinessPartnerDetailController.$inject = ["$scope", "$http", "$filter"];

oneApp.controller('BusinessPartnerDetailController', BusinessPartnerDetailController);

