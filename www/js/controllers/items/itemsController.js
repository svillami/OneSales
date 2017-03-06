var ItemsController=function ($scope, $http, $filter) {

$scope.filtros = false;
$scope.itemsDiv=true;
var filters=new Filter();
 $scope.showDetail = function(index) {
      
        var selectedItem = $scope.items[index];
    
       salesNavigator.pushPage('views/items/itemDetails.html', {item : selectedItem});
    };

$scope.goToSelectGroups = function() {
      
       
    
       salesNavigator.pushPage('views/items/itemsGroup.html', {'form' : 'filters', filter : filters});
    };


 $scope.activarFiltroGrupo = function(){

 if ($scope.checkGroup)
 {


 } 
  else{
    
    filters.groupCode=null;
    filters.groupName=null ;
 }
    
};

$scope.getFilters = function() { 
    

    //var options = salesNavigator.getCurrentPage().options;
    $scope.group=filters.groupName;
     //alert(filters.groupName);
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
    };

var items=new Array();

dataBase.transaction(selectRecords, errorInQuery, successResults);

function selectRecords(tx)
{
  
    tx.executeSql('SELECT *, (SELECT SUM(T5.onHand) FROM OITW T5 WHERE T5.itemCode=T0.itemCode )AS "stock", (SELECT MAX(T4.price) FROM ITM1 T6 WHERE T6.itemCode=T0.itemCode)AS "price" FROM OITM T0, OITB T1, OMRC T2, OITW T3, ITM1 T4 '
      +' WHERE T0.groupCode=T1.GroupCode AND T0.firmCode=T2.FirmCode AND T0.itemCode=T3.itemCode AND T0.itemCode=T4.itemCode GROUP BY T0.itemCode', [], successResults,errorInQuery);
}
 
function successResults(tx,results)
{
    
   var nLength = results.rows.length;
       
        //alert(nLength);

// alert('consultando articulo 2' );
       for(var c=0;c<nLength;c++){
        // alert('consultando articulo 3' );
		    
     



		    var item = new Item
		    (results.rows.item(c).itemCode,
		    results.rows.item(c).itemName,
		    results.rows.item(c).active,
		    results.rows.item(c).groupCode,
		    results.rows.item(c).barCode,
        results.rows.item(c).firmCode,
        results.rows.item(c).salesUnit,
        results.rows.item(c).salesUnitQty,
        results.rows.item(c).stock,
        results.rows.item(c).price,
        results.rows.item(c).currency,
        results.rows.item(c).firmName,
        results.rows.item(c).groupName,
        results.rows.item(c).taxCodeAr);
		 //    alert(item.itemCode+ ' ' + item.itemName +'stock '+results.rows.item(c).stock);
			   items.push(item);
	 //alert('consultando articulo 3 ' + results.rows.item(c).itemCode);
        }
        
    $scope.items=items;
    $scope.$apply();
    
}

function errorInQuery(tx,error)
{
    
    alert(error.message); 
//alert(JSON.stringify(results));
      
} 




}

ItemsController.$inject = ["$scope", "$http", "$filter"];

oneApp.controller('ItemsController', ItemsController);
