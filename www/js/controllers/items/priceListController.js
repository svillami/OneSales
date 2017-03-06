var PriceListController=function ($scope, $http, $filter) {

  var options = salesNavigator.getCurrentPage().options;

  var prices=new Array();

   dataBase.transaction(function(tx) {
      tx.executeSql('SELECT * FROM ITM1 T0 WHERE T0.itemCode=?', 
                 [options.item],
                 function(tx, results)
                 {
                   
                  var nLength = results.rows.length;
       
                    //alert(nLength);

                   for(var c=0;c<nLength;c++)
                   {
                    
                     //alert(results.rows.item(c).itemCode);
                    var price = new Price(
                    results.rows.item(c).itemCode,
                    results.rows.item(c).priceList,
                    results.rows.item(c).price,
                    results.rows.item(c).currency,
                    results.rows.item(c).priceListName);
                     
                    // alert(price.price);
                     prices.push(price);
  
                  }
        
                $scope.prices=prices;
                $scope.$apply();
    
                 },
                 function(tx, error)
                 {
                   alert(error.message); 
                 }
   );
});

}


PriceListController.$inject = ["$scope", "$http", "$filter"];

oneApp.controller('PriceListController', PriceListController);
