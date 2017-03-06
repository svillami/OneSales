var LoadActivitiesController=function ($scope, $http, $filter,myService) {

var activities=new Array();

dataBase.transaction(selectRecords, errorInQuery, successResults);

function selectRecords(tx)
{
  
    tx.executeSql('SELECT * FROM OCLG T0, OCRD T1 WHERE T0.cardCode=t1.cardCode', [], successResults,errorInQuery);
}
 
function successResults(tx,results)
{
    
   var nLength = results.rows.length;

       for(var c=0;c<nLength;c++){
    
        var activity = new Activity();
        activity.cardCode=results.rows.item(c).cardCode;
        activity.cardName=results.rows.item(c).cardName;
        activity.action=results.rows.item(c).action;
        activity.address=results.rows.item(c).address;
        activity.phone=results.rows.item(c).phone1;
        activity.id=results.rows.item(c).id;

        var businessPartner = new BusinessPartner
        (results.rows.item(c).cardCode,
        results.rows.item(c).cardName,
        results.rows.item(c).licTradNum,
        results.rows.item(c).email,
        results.rows.item(c).phone1,
        results.rows.item(c).phone2,
        results.rows.item(c).balance,
        results.rows.item(c).contactCode,
        results.rows.item(c).contactName,
        results.rows.item(c).paymentGroupNum,
        results.rows.item(c).pymntGroup,
        results.rows.item(c).slpCode,
        results.rows.item(c).address,
        results.rows.item(c).mailAddress);
        activity.businessPartner=businessPartner;

        //alert(item.itemCode+ ' ' + item.itemName +'stock '+results.rows.item(c).stock);
         activities.push(activity);
    
        //alert('consultando articulo 3 ' + results.rows.item(c).cardCode);
        }
        
    $scope.activities=activities;
    $scope.$apply();
    
}

function errorInQuery(tx,error)
{
    
    alert(error.message); 
//alert(JSON.stringify(results));
      
} 

$scope.showActivity= function(activity,index){

salesNavigator.pushPage('views/activities/menuActivities.html',{activity : activity});

}

}

LoadActivitiesController.$inject = ["$scope", "$http", "$filter","myService"];

oneApp.controller('LoadActivitiesController', LoadActivitiesController);

