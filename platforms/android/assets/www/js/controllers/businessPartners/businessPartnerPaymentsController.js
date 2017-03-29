var businessPartnerPaymentsController=function ($scope, $http, $filter) {


    getPayments();
    //Begin showDetailPayments
    $scope.showDetailPayments= function(index){
       var selectedItem = $scope.payments[index];
       salesNavigator.pushPage('views/payments/paymentCustomersDetails.html', {payment : selectedItem});
        
    };
    //End showDetailPayments

    // Begin getPayments
function getPayments(){


  var options = salesNavigator.getCurrentPage().options;
      
      var queryFilter="SELECT * FROM ORCT T0 " ;


      if (options.businessPartner.cardName != null && typeof(options.businessPartner.cardName) != 'undefined')
      {

        queryFilter = queryFilter +" WHERE T0.cardName='"+options.businessPartner.cardName+"'";

      }

      var payments=new Array();

         dataBase.transaction(function(tx) {

         //alert('carajo');
            tx.executeSql(queryFilter, 
                       [],
                       function(tx, results)
                       {
                         
                        var nLength = results.rows.length;
             
                        
                         for(var c=0;c<nLength;c++)
                         {
          
                          var payment = new Payment();
                          var date = results.rows.item(c).docDate;
                          var anio = date.substring(4,0);
                          var mes=  date.substring(6,4);
                          var dia= date.substring(8,6); 
                          var concat = (anio+"-"+ mes +"-"+ dia);
                          var mtd ='No aplica';

                          payment.docEntry= results.rows.item(c).docEntry;
                          payment.cardCode=results.rows.item(c).cardCode;
                          payment.cardName=results.rows.item(c).cardName;
                          payment.docDate=concat;
                          payment.docTotal=results.rows.item(c).docTotal;

                          // Methods
                          payment.cashSum= results.rows.item(c).cashSum;
                          payment.transferSum= results.rows.item(c).transferSum;
                          payment.checkSum= results.rows.item(c).checkSum;
                          payment.transferDate = results.rows.item(c).transferDate;
                          payment.cashAcct = results.rows.item(c).cashAcct;
                          payment.transferAcct = results.rows.item(c).transferAcct;
                          payment.transferRef = results.rows.item(c).transferRef;


                          if (payment.cashSum != 0){
                                payment.methods ='Efectivo';
                                payment.methodsDate = payment.transferDate;
                                payment.methodsAcct = payment.cashAcct;
                                payment.methodsRef = mtd;
                                payment.methodsTotal= payment.cashSum;
                          }

                          if (payment.transferSum != 0){
                                payment.methods ='Transferencia';
                                payment.methodsDate =payment.transferDate;
                                payment.methodsAcct=payment.transferAcct;
                                payment.methodsRef=payment.transferRef;
                                payment.methodsTotal = payment.transferSum;
                          }

                          if (payment.checkSum != 0){
                                payment.methods ='Cheque';
                                payment.methodsDate = payment.transferDate;
                                payment.methodsAcct = mtd;
                                payment.methodsRef = mtd;
                                payment.methodsTotal = payment.checkSum;
                          }

                      
        
                          payments.push(payment);
        
                        }
              
                      $scope.payments=payments;
                  
                      $scope.$apply();
          
                       },
                       function(tx, error)
                       {
                         alert(error.message); 
                       }
         );
      });
    }
    // end getPayments


}

businessPartnerPaymentsController.$inject = ["$scope", "$http", "$filter"];

oneApp.controller('businessPartnerPaymentsController', businessPartnerPaymentsController);





///////////////////////////// Other controller ///////////////////////////////////////

var businessPartnerPaymentsDetailsController=function ($scope, $http, $filter) {


$scope.summary = true;
$scope.details=false;
$scope.paymentmethods=false;

    //Begin showOrderSummary
  $scope.showOrderSummary= function(){
        $scope.summary = true;
        $scope.details=false;
        $scope.paymentmethods=false;  
  };    
  // End showOrderSummary

 
  $scope.showInvoiceDetails= function(){
      $scope.summary = false;
      $scope.details=true;
      $scope.paymentmethods=false;

      invoicesPaid();
  };

  
  $scope.showPaymentMethods= function(){
      $scope.summary = false;
      $scope.details=false;
      $scope.paymentmethods=true;
  };

//Calling in invoiceCustomersDetails
  $scope.getParamsPayments = function() { 
    var options = salesNavigator.getCurrentPage().options;
    return options.payment;
  }; 


// Begin invoicesPaid
    function invoicesPaid() {

      //Take the value chosen, in the previous option
      var options = salesNavigator.getCurrentPage().options;
      
        var queryFilter="SELECT * FROM OINV NV, RCT2 RC WHERE NV.docEntry= RC.invoiceId";
        
       
      if (options.payment.docEntry != null && typeof(options.payment.docEntry) != 'undefined')
      {

        queryFilter = queryFilter +" AND NV.docEntry='"+options.payment.docEntry+"' "   ;

      } 

     
        invoices=new Array();
           dataBase.transaction(function(tx) {

              tx.executeSql(queryFilter, 
                         [],
                         function(tx, results)
                         {
                           
                          var nLength = results.rows.length;
               
                        
                           for(var c=0;c<nLength;c++)
                           {
                              var invoice = new Document();

                              var date = results.rows.item(c).docDate;
                              var anio = date.substring(4,0);
                              var mes=  date.substring(6,4);
                              var dia= date.substring(8,6); 
                              var concat = (anio+"-"+ mes +"-"+ dia);

                              invoice.docEntry= results.rows.item(c).docEntry;
                              invoice.cardCode= results.rows.item(c).cardCode;
                              invoice.cardName= results.rows.item(c).cardName;
                              invoice.docDate=  concat;
                              invoice.taxDate=  results.rows.item(c).taxDate;
                              invoice.discount= results.rows.item(c).discount;
                              invoice.discountPercent= results.rows.item(c).discountPercent;
                              invoice.comments= results.rows.item(c).comments;
                              invoice.paidToDate= results.rows.item(c).paidToDate;
                              invoice.docTotal= results.rows.item(c).docTotal;
                              invoice.VatSum= results.rows.item(c).VatSum;
                              invoice.baseImp= (invoice.docTotal-invoice.VatSum);
                              
                              invoices.push(invoice);
                          }
                            $scope.invoices=invoices;
                            $scope.$apply();
            
                         },
                         function(tx, error)
                         {
                           alert(error.message); 
                         }
           );
        }); 
    }
// End invoicesPaid

}

businessPartnerPaymentsDetailsController.$inject = ["$scope", "$http", "$filter"];

oneApp.controller('businessPartnerPaymentsDetailsController', businessPartnerPaymentsDetailsController);    