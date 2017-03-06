var WareHouseController=function ($scope, $http, $filter) {

  var options = salesNavigator.getCurrentPage().options;

//alert('prueba');  


var wareHousesStock=new Array();

   dataBase.transaction(function(tx) {
      tx.executeSql('SELECT * FROM OITW T0, OWHS T1 WHERE T0.itemCode=? AND T0.whsCode=T1.whsCode', 
                 [options.item],
                 function(tx, results)
                 {
                   
                  var nLength = results.rows.length;
       
                    //alert(nLength);

                   for(var c=0;c<nLength;c++)
                   {
                    
                    // alert(results.rows.item(c).onHand);
                    var inventory = new Inventory(
                    results.rows.item(c).itemCode,
                    results.rows.item(c).whsCode,
                    results.rows.item(c).whsName,
                    results.rows.item(c).onHand,
                    results.rows.item(c).isCommited);
                     
                    // alert(price.price);
                     wareHousesStock.push(inventory);
  
                  }
        
                $scope.whsStockList=wareHousesStock;
                $scope.$apply();
    
                 },
                 function(tx, error)
                 {
                   alert(error.message); 
                 }
   );
});

}


WareHouseController.$inject = ["$scope", "$http", "$filter"];

oneApp.controller('WareHouseController', WareHouseController);
