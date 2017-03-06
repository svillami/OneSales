var  ItemsGroupController=function ($scope, $http, $filter) {

 //alert('prueba');



$scope.selectGroup = function(index) {
  
     var options = salesNavigator.getCurrentPage().options;
     var selectedItem = $scope.groups[index];


    if (options.form=='filters'){

      	   options.filter.groupCode=selectedItem.code;
           options.filter.groupName=selectedItem.name;
           salesNavigator.popPage('views/items/items.html');
    }
    
    };

var groups=new Array();

dataBase.transaction(selectRecords, errorInQuery, successResults);

function selectRecords(tx)
{
    tx.executeSql('SELECT * FROM OITB T0', [], successResults,errorInQuery);
}
 
function successResults(tx,results)
{
    
   var nLength = results.rows.length;
       
     
       for(var c=0;c<nLength;c++){
        
		    // alert(results.rows.item(c).itemCode);
		     var group = new ItemGroup();
		     group.code=results.rows.item(c).groupCode;
		          group.name=results.rows.item(c).groupName;
		     // alert(item.itemCode+ ' ' + item.itemName +'stock '+results.rows.item(c).stock);
			groups.push(group);
	
        }
        
    $scope.groups=groups;
    $scope.$apply();
    
}

function errorInQuery(tx,error)
{
    
    alert(error.message); 
//alert(JSON.stringify(results));
      
} 




}
ItemsGroupController.$inject = ["$scope", "$http", "$filter"];

oneApp.controller('ItemsGroupController', ItemsGroupController);