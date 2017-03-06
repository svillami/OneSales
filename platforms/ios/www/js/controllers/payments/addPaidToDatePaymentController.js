var AddPaidToDatePaymentController=function ($scope, $http, $filter) {

    var options = salesNavigator.getCurrentPage().options;
    //$scope.items=options.items;

    $scope.documents=options.payment.invoices;


$scope.invoiceAppliedSum=function(doc)
{


 doc.appliedSum=doc.appliedSum;

 if (parseFloat(doc.appliedSum)<0){

	doc.appliedSum=0;

 }
};


$scope.addMoreDocument=function()
{
 salesNavigator.pushPage('views/payments/pendingDocs.html', {payment : options.payment});
};


$scope.getTotalAppliedSum=function()
{
var options = salesNavigator.getCurrentPage().options;    //$scope.items=options.items;
var totalAppliedSum=0;
var totalPending=0;
for (indice in options.payment.invoices){
  
  totalAppliedSum=totalAppliedSum+parseFloat(options.payment.invoices[indice].appliedSum);
totalPending=totalPending+parseFloat(options.payment.invoices[indice].pending);
}

$scope.TotalAppliedSum=totalAppliedSum;
$scope.Total=totalPending;
$scope.TotalPendig=totalPending-totalAppliedSum;
options.payment.appliedInvoiceSum=totalAppliedSum;

};


$scope.saveInvoices = function() {

      var options = salesNavigator.getCurrentPage().options;
      
var error=false;
       for (indice in options.payment.invoices){

      // alert(options.payment.invoices[indice].appliedSum);
       if (parseFloat(options.payment.invoices[indice].appliedSum)<=0){

        error =true;
       }

        if (isNaN(options.payment.invoices[indice].appliedSum)){

        error =true;
       }
      /* alert(options.order.lines[indice].itemCode);
       alert(options.order.lines[indice].dscription);
       alert(options.order.lines[indice].price);
       alert(options.order.lines[indice].lineTotal);
       alert(options.order.lines[indice].vatSum);
       alert(options.order.lines[indice].quantity);*/
         
        }

if (error==false){
    salesNavigator.replacePage('views/payments/newPayment.html', {payment : options.payment});
       }
       else{

 ons.notification.alert({
                          message: 'Debe colocar un monto pagado a las facturas',title: 'Error'
                            });

       }
      };



    }


    AddPaidToDatePaymentController.$inject = ["$scope", "$http", "$filter"];

oneApp.controller('AddPaidToDatePaymentController', AddPaidToDatePaymentController);