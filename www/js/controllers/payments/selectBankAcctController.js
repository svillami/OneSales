var SelectBankAcctController=function ($scope, $http, $filter) {



$scope.selectBank = function(index) {
    
     var options = salesNavigator.getCurrentPage().options;
     var selectedItem = $scope.banks[index];

    //alert(selectedItem.acctName);

       
if (options.tipo=="cash"){
     options.payment.bankCashAcct=selectedItem.bankAcct;
     options.payment.cashAcct=selectedItem.acctCode;
}

if (options.tipo=="transf"){
     options.payment.bankTransferAcct=selectedItem.bankAcct;
     options.payment.transferAcct=selectedItem.acctCode;
}
if (options.tipo=="check"){
     options.payment.bankCheckAcct=selectedItem.bankAcct;
 options.payment.acctCode=selectedItem.acctCode;
}

     
     //alert();
  salesNavigator.popPage('views/payments/selectBankAccount.html');
    
     // options.order.cardCode=selectedItem.cardCode;
      //$data.selectedItem = selectedItem;

     // alert('prueba');
    //  alert(selectedItem.cardCode);
     // salesNavigator.pushPage('views/orders/newOrder.html', {businessPartner : selectedItem});
  //    salesNavigator.popPage('views/orders/newOrder.html');
    };


var banks=new Array();

dataBase.transaction(selectRecords, errorInQuery, successResults);

function selectRecords(tx)
{
    tx.executeSql('SELECT * FROM DSC1 T0', [], successResults,errorInQuery);
}
 
function successResults(tx,results)
{
    
   var nLength = results.rows.length;
       
        //alert(nLength);
       for(var c=0;c<nLength;c++){
        
            // alert(results.rows.item(c).itemCode);
             var bankAccount = new BankAccount
            (results.rows.item(c).bankAcct,
            results.rows.item(c).acctCode,
            results.rows.item(c).acctName);
             // alert(item.itemCode+ ' ' + item.itemName +'stock '+results.rows.item(c).stock);
            banks.push(bankAccount);
    
        }
        
    $scope.banks=banks;
    $scope.$apply();
    
}

function errorInQuery(tx,error)
{
    
    alert(error.message); 
//alert(JSON.stringify(results));
      
} 




}

SelectBankAcctController.$inject = ["$scope", "$http", "$filter"];
oneApp.controller('SelectBankAcctController', SelectBankAcctController);

