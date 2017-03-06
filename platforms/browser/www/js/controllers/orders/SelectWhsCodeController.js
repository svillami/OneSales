var selectWhsCodeController=function ($scope, $http, $filter) {

  var options = salesNavigator.getCurrentPage().options;

//alert('prueba');  



$scope.selectWhs = function(wareHouse,index) { 
    

    var options = salesNavigator.getCurrentPage().options;

//alert(options.item.itemCode);
     options.item.whsCode=wareHouse.whsCode ;

      salesNavigator.popPage('views/orders/selectWareHouse.html');
  };

var wareHousesStock=new Array();

   dataBase.transaction(function(tx) {

   //alert('carajo');
      tx.executeSql('SELECT * FROM OITW T0, OWHS T1 WHERE T0.itemCode=? AND T0.whsCode=T1.whsCode', 
                 [options.item.itemCode],
                 function(tx, results)
                 {
                   
                  var nLength = results.rows.length;
       
                 //   alert(nLength);

                   for(var c=0;c<nLength;c++)
                   {
                   
                    // alert(results.rows.item(c).onHand);
                    var inventory = new Inventory(
                    results.rows.item(c).itemCode,
                    results.rows.item(c).whsCode,
                    results.rows.item(c).whsName,
                    results.rows.item(c).onHand,
                    results.rows.item(c).isCommited);
                     
           //          alert(results.rows.item(c).isCommited);
                     wareHousesStock.push(inventory);
  
                  }
        
       // alert(wareHousesStock.length)
                $scope.whsStockList=wareHousesStock;
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


selectWhsCodeController.$inject = ["$scope", "$http", "$filter"];

oneApp.controller('selectWhsCodeController', selectWhsCodeController);
