var BusinessPartnerInvoicesController=function ($scope, $http, $filter) {

ShowCustomerInvoices();

//Begin showDetailInvoices to customerInvoices
    $scope.showDetailInvoices= function(index){
       var selectedItem = $scope.invoices[index];
       salesNavigator.pushPage('views/bp/invoiceCustomersDetails.html', {invoice : selectedItem});
       $scope.ordersDiv=true; 
    };
    //End showDetailInvoices


// Begin ShowCustomerInvoices
    function ShowCustomerInvoices() {

      //Take the value chosen, in the previous option
      var options = salesNavigator.getCurrentPage().options;
      //$scope.cardName=options.businessPartner.cardName;

        var queryFilter="SELECT * FROM OINV T0 ";


      if ($scope.cardName != null && typeof($scope.cardName) != 'undefined')
      {

        queryFilter = queryFilter +" WHERE T0.cardName='"+$scope.cardName+"'";

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
// End ShowCustomerInvoices


}

BusinessPartnerInvoicesController.$inject = ["$scope", "$http", "$filter"];

oneApp.controller('BusinessPartnerInvoicesController', BusinessPartnerInvoicesController);



//////////////////////////////// Other controller ///////////////////////////////////////

var BusinessPartnerInvoicesDetailsController=function ($scope, $http, $filter) {

	$scope.summary = true;
    $scope.detailsInvoice=false;

    
    //Calling in invoiceCustomersDetails
	  $scope.getParamsInvoices = function() { 
	    var options = salesNavigator.getCurrentPage().options;
	    return options.invoice;
	  }; 

	  

    //Calling the filters in OrderDetails.html and invoiceCustomersDetails to Summary
    $scope.showInvoiceSummary= function(){
      $scope.summary = true;
      $scope.detailsInvoice=false;
      
      //Calling Invoices
      //summaryOrders();
      ShowCustomerInvoices();

    };

    //Calling the filters in invoceCustomersDetails.html to DetailsInvoice
  	$scope.showInvoiceDetails= function(){
      $scope.detailsInvoice=true;
      $scope.summary = false;

      
      fullInvoiceDetail();
  };

// Begin ShowCustomerInvoices
    function ShowCustomerInvoices() {

      //Take the value chosen, in the previous option
      var options = salesNavigator.getCurrentPage().options;
      //$scope.cardName=options.businessPartner.cardName;

        var queryFilter="SELECT * FROM OINV T0 ";


      if ($scope.cardName != null && typeof($scope.cardName) != 'undefined')
      {

        queryFilter = queryFilter +" WHERE T0.cardName='"+$scope.cardName+"'";

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
// End ShowCustomerInvoices



  // Begin fullInvoiceDetail
function fullInvoiceDetail() {

    //Take the value chosen, in the previous option
    var options = salesNavigator.getCurrentPage().options;
    $scope.docEntry=options.invoice.docEntry;

    var queryFilter="SELECT * FROM INV1 T0";

    if ($scope.docEntry != null && typeof($scope.docEntry) != 'undefined')
    {

      queryFilter = queryFilter +" WHERE T0.docEntry='"+$scope.docEntry+"'";

    }

    documentsLine=new Array();
       dataBase.transaction(function(tx) {

          tx.executeSql(queryFilter, 
                     [],
                     function(tx, results)
                     {
                       
                      var nLength = results.rows.length;
          
                       for(var c=0;c<nLength;c++)
                       {
                          var documentLine = new DocumentLine();
                          documentLine.itemCode= results.rows.item(c).itemCode;
                          documentLine.docEntry= results.rows.item(c).docEntry;
                          documentLine.lineId= results.rows.item(c).lineId;
                          documentLine.dscription= results.rows.item(c).dscription;
                          documentLine.quantity= results.rows.item(c).quantity;
                          documentLine.taxCode= results.rows.item(c).taxCode;
                          documentLine.price= results.rows.item(c).price;
                          documentLine.lineTotal= results.rows.item(c).lineTotal;
                          documentLine.vatSum= results.rows.item(c).vatSum;
                          documentLine.comments= results.rows.item(c).comments;
                          
                          documentsLine.push(documentLine);
                      }
            
                        $scope.documentsLine=documentsLine;
                        $scope.$apply();
        
                     },
                     function(tx, error)
                     {
                       alert(error.message); 
                     }
       );
    });
}
// End fullInvoiceDetail


}

BusinessPartnerInvoicesDetailsController.$inject = ["$scope", "$http", "$filter"];

oneApp.controller('BusinessPartnerInvoicesDetailsController', BusinessPartnerInvoicesDetailsController);




////////////////////////////////// Other controller ///////////////////////////////////////

var BusinessPartnerInvoicesMoreDetailsController=function ($scope, $http, $filter) {

fullInvoiceDetail();

  // Begin getParamsOrderLine
$scope.getParamsDocumentLine = function() { 
    
    var options = salesNavigator.getCurrentPage().options;
    return options.documentLine; 
  };
// End getParamsOrderLine

// Begin showMoreDetailsInvoice
$scope.showMoreDetailsInvoice= function(index){
      var selectedItem = $scope.documentsLine[index];
      salesNavigator.pushPage('views/bp/invoiceMoreDetails.html', {documentLine : selectedItem});
    };
//End showMoreDetailsInvoice   

  // Begin fullInvoiceDetail
function fullInvoiceDetail() {

    //Take the value chosen, in the previous option
    var options = salesNavigator.getCurrentPage().options;
    $scope.docEntry=options.invoice.docEntry;

    var queryFilter="SELECT * FROM INV1 T0";

    if ($scope.docEntry != null && typeof($scope.docEntry) != 'undefined')
    {

      queryFilter = queryFilter +" WHERE T0.docEntry='"+$scope.docEntry+"'";

    }

    documentsLine=new Array();
       dataBase.transaction(function(tx) {

          tx.executeSql(queryFilter, 
                     [],
                     function(tx, results)
                     {
                       
                      var nLength = results.rows.length;
          
                       for(var c=0;c<nLength;c++)
                       {
                          var documentLine = new DocumentLine();
                          documentLine.itemCode= results.rows.item(c).itemCode;
                          documentLine.docEntry= results.rows.item(c).docEntry;
                          documentLine.lineId= results.rows.item(c).lineId;
                          documentLine.dscription= results.rows.item(c).dscription;
                          documentLine.quantity= results.rows.item(c).quantity;
                          documentLine.taxCode= results.rows.item(c).taxCode;
                          documentLine.price= results.rows.item(c).price;
                          documentLine.lineTotal= results.rows.item(c).lineTotal;
                          documentLine.vatSum= results.rows.item(c).vatSum;
                          documentLine.comments= results.rows.item(c).comments;
                          
                          documentsLine.push(documentLine);
                      }
            
                        $scope.documentsLine=documentsLine;
                        $scope.$apply();
        
                     },
                     function(tx, error)
                     {
                       alert(error.message); 
                     }
       );
    });
}
// End fullInvoiceDetail


}

BusinessPartnerInvoicesMoreDetailsController.$inject = ["$scope", "$http", "$filter"];

oneApp.controller('BusinessPartnerInvoicesMoreDetailsController', BusinessPartnerInvoicesMoreDetailsController);