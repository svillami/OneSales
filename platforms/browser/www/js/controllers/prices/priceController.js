var  PriceController=function ($scope, $http, $filter) {

$scope.filtros = false;
$scope.itemsDiv=true;
var filters=new Filter();
var items;

$scope.items=items;

$scope.goToSelectBPFilter = function() { 
    
   
   salesNavigator.pushPage('views/orders/selectClient.html', {'form' : 'filters', filter : filters});
  
  };



$scope.activarFiltroCliente = function(){

 if ($scope.checkCliente)
 {


 } 
  else{
    
    filters.cardCode=null;
    filters.cardName=null ;
 }
    
};

$scope.getFilters = function() { 
    

    //var options = salesNavigator.getCurrentPage().options;
    $scope.cardName=filters.cardName;
     //alert(options.order.lines.length);
    //alert(options.businessPartner.cardCode);
    return filters; //options.businessPartner ;
  };


   $scope.showFiltrosDiv = function(){

    //  alert($scope.filtros);
      $scope.filtros = true;
      $scope.itemsDiv=false;
     //  alert($scope.filtros);  

   
    };

 $scope.showItemsDiv = function(){

      //alert($scope.ordersDiv);
      $scope.itemsDiv = true;
       $scope.filtros = false;
     //  alert($scope.ordersDiv);  
       filtersPriceList();
    };


function filtersPriceList() {



//alert( filters.cardName);
var queryFilter="SELECT T0.ItemCode, T1.Price, T0.ItemName FROM OITM T0 , "
+" ITM1 T1, OCRD T2 WHERE T1.priceList=T2.priceList AND T0.itemCode=T1.itemCode "
+" AND T2.cardCode='"+filters.cardCode+"'";

//alert(queryFilter);

items=new Array();
   dataBase.transaction(function(tx) {

   //alert('carajo');
      tx.executeSql(queryFilter, 
                 [],
                 function(tx, results)
                 {
                   
                  var nLength = results.rows.length;
       
                  //alert(nLength);

                   for(var c=0;c<nLength;c++)
                   {
                   
                    // alert(results.rows.item(c).onHand);
                    var item = new Item();
                    item.itemCode= results.rows.item(c).itemCode;
                    item.itemName=results.rows.item(c).itemName;
                    item.price=results.rows.item(c).price;
                    
           //          alert(results.rows.item(c).isCommited);
                     items.push(item);
  
                  }
        
       // alert(wareHousesStock.length)
                $scope.items=items;
            // alert($scope.whsStockList.length);
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

PriceController.$inject = ["$scope", "$http", "$filter"];

oneApp.controller('PriceController', PriceController);

