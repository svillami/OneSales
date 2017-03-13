var BusinessPartnerDetailController=function ($scope, $http, $filter) {
 
$scope.getParams = function() { 
    

    var options = salesNavigator.getCurrentPage().options;

//alert(options.item.itemCode);
    return options.businessPartner ;

}

$scope.showDocuments = function(index) {
  var selectedItem = $scope.businessPartners[index];
  salesNavigator.pushPage('views/bp/BpDocuments.html', {businessPartner : selectedItem});
};
    

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




var businessPartners=new Array();

dataBase.transaction(selectRecords, errorInQuery, successResults);

function selectRecords(tx)
{
    tx.executeSql('SELECT * FROM OCRD T0, OCTG T1, OCPR T2 WHERE T0.paymentGroupNum=T1.PaymentGroupNum AND T0.contactCode=T2.contactCode', [], successResults,errorInQuery);
}
 
function successResults(tx,results)
{
    
   var nLength = results.rows.length;
       
        //alert(nLength);
       for(var c=0;c<nLength;c++){
        
        // alert(results.rows.item(c).itemCode);
         var businessPartner = new BusinessPartner();
        businessPartner.cardCode=results.rows.item(c).cardCode;
        businessPartner.cardName=results.rows.item(c).cardName;
        businessPartner.licTradNum=results.rows.item(c).licTradNum;
        businessPartner.email=results.rows.item(c).email;
        businessPartner.phone1=results.rows.item(c).phone1;
        businessPartner.phone2=results.rows.item(c).phone2;
        businessPartner.balance=results.rows.item(c).balance;
        businessPartner.contactCode=results.rows.item(c).contactCode;
        businessPartner.contactName=results.rows.item(c).contactName;
        businessPartner.paymentGroupNum=results.rows.item(c).paymentGroupNum;
        businessPartner.pymntGroup=results.rows.item(c).pymntGroup;
        businessPartner.slpCode=results.rows.item(c).slpCode;
        businessPartner.address=results.rows.item(c).address;
        businessPartner.mailAddress=results.rows.item(c).mailAddress;
         // alert(item.itemCode+ ' ' + item.itemName +'stock '+results.rows.item(c).stock);
        businessPartners.push(businessPartner);
  
        }
        
    $scope.businessPartners=businessPartners;
    $scope.$apply();
    
}


function errorInQuery(tx,error)
{
    
    alert(error.message); 
//alert(JSON.stringify(results));
      
} 



}

BusinessPartnerDetailController.$inject = ["$scope", "$http", "$filter"];

oneApp.controller('BusinessPartnerDetailController', BusinessPartnerDetailController);

