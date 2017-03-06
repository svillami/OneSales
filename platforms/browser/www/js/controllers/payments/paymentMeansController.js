
var  PaymentsMeansController=function ($scope, $http, $filter) {

$scope.efectivo = true;
$scope.transf=false;
$scope.cheque=false;

$scope.getParams = function(){



    var options = salesNavigator.getCurrentPage().options;
    //$scope.cardName=options.order.cardName;
     //alert(options.order.lines.length);
    //alert(options.businessPartner.cardCode);
    //alert(options.payment.bankCashAcct);
    return options.payment;
    };

$scope.showDivEfectivo = function(){

    //  alert($scope.filtros);
    $scope.efectivo = true;
	$scope.transf=false;
	$scope.cheque=false;
     //  alert($scope.filtros);  
    };

 $scope.showDivTransf = function(){

      //alert($scope.ordersDiv);
     $scope.efectivo = false;
	 $scope.transf=true;
	 $scope.cheque=false;
     //  alert($scope.ordersDiv);  
    };

 $scope.showDivCheque = function(){

      //alert($scope.ordersDiv);
        $scope.efectivo = false;
	      $scope.transf=false;
        $scope.cheque=true;
     //  alert($scope.ordersDiv);  
    };

$scope.goToSelectAccountBank = function(tipo) { 
    

   //alert('cooo');
    var options = salesNavigator.getCurrentPage().options;

    salesNavigator.pushPage('views/payments/selectBankAccount.html', {payment : options.payment,tipo:tipo});
  };


$scope.addCheck = function() { 
    

   //alert('cooo');
   var options = salesNavigator.getCurrentPage().options;

    //salesNavigator.pushPage('views/payments/selectBankAccount.html', {payment : options.payment,tipo:tipo});

  //alert($scope.DocDate);
  //alert($scope.nroCheck);
  //alert($scope.checkSum);
    var check=new Check(options.payment.bankCheckAcct,options.payment.acctCode,$scope.nroCheck,$scope.DocDate,
      $scope.checkSum);

    
    var existe=false;
    
    for (indice in options.payment.checks){

     if (options.payment.checks[indice].nroCheck==check.nroCheck)
      {
      
        existe=true;

      }
    }
    if (existe==false)
    {
      options.payment.checks.push(check);
    }
    else
    {

      ons.notification.alert({
             message: 'Ya existe el  cheque # ' +  check.nroCheck,title: 'Error'
        }); 
    }
    $scope.checks= options.payment.checks;
  };


$scope.addCashSum = function(){

  var options = salesNavigator.getCurrentPage().options;
  options.payment.cashSum=$scope.cashSum;
}
$scope.addTransferSum = function(){

  var options = salesNavigator.getCurrentPage().options;
  options.payment.transfSum=$scope.transferSum;
   // alert(options.payment.transfSum)
}


$scope.save = function() { 

var options = salesNavigator.getCurrentPage().options;

  options.payment.cashSum=$scope.cashSum;
  options.payment.transfSum=$scope.transferSum;
  options.payment.checkSum=0;


if (isNaN( options.payment.transfSum)) {

   options.payment.transfSum=0;
}
if (isNaN( options.payment.cashSum)) {

   options.payment.cashSum=0;
}

if (isNaN( options.payment.checkSum)) {

   options.payment.checkSum=0;
}

 for (indice in options.payment.checks){

    options.payment.checkSum=parseFloat(options.payment.checkSum)+parseFloat(options.payment.
      checks[indice].checkAmount);

  }

  /*
   var date=$scope.transferDate;
    var mes=addZero(parseInt(date.getMonth())+1);
    var ano=date.getFullYear();
    var dia=addZero(date.getDate());
    date =ano+mes+dia;*/


  options.payment.transferDate=$scope.transferDate;
  



  options.payment.transferRef=$scope.transferRef;

  options.payment.docTotal=parseFloat(options.payment.cashSum)+parseFloat(options.payment.transfSum)+parseFloat(options.payment.checkSum);
  //alert(options.payment.payNoDocSum);
  //alert(options.payment.docTotal);
  var totalAPagar=parseFloat(options.payment.payNoDocSum)+parseFloat(options.payment.appliedInvoiceSum);
  var pagado= options.payment.docTotal;

  if (parseFloat(pagado)>=parseFloat(totalAPagar)){

  salesNavigator.popPage('views/payments/newPayment.html');

  }
else{

   ons.notification.alert({
             message: 'EL total en medios de pago no coincide con el total a pagar de:' +  totalAPagar,title: 'Error'
        }); 
}
 };

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}


}

PaymentsMeansController.$inject = ["$scope", "$http", "$filter"];

oneApp.controller('PaymentsMeansController', PaymentsMeansController);


