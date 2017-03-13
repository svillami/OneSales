var BusinessPartnerController=function ($scope, $http, $filter) {

    //Calling to load all arrays
    summaryOrders();
    ShowCustomerInvoices();
    //showCustomersPayments();

    $scope.summary= true;
    $scope.details= false;
    $scope.detailsInvoice=false;

    $scope.divBP = true;
    $scope.filtros = false;

    $scope.showDetail = function(index) {
     var selectedItem = $scope.businessPartners[index];
      salesNavigator.pushPage('views/bp/customerDetail.html', {businessPartner : selectedItem});
    };
 
    //Begin showOrders
    $scope.showOrders = function(index) {
        var selectedItem = $scope.businessPartners[index];
        salesNavigator.pushPage('views/bp/customerOrders.html', {businessPartner : selectedItem});
    };
    //End showOrders

    //Begin showInvoices
    $scope.showInvoices = function(index) {
        var selectedItem = $scope.businessPartners[index];
        salesNavigator.pushPage('views/bp/customerInvoices.html', {businessPartner : selectedItem});
    };
    //End showInvoices

    //Begin showPayments
    $scope.showPayments = function(index) {
        var selectedItem = $scope.businessPartners[index];
        salesNavigator.pushPage('views/payments/customerPayments.html', {businessPartner : selectedItem});
    };
    //End showPayments


    //Begin showDetailOrder to customerOrders
    $scope.showDetailOrder= function(index){
       var selectedItem = $scope.orders[index];
       salesNavigator.pushPage('views/bp/orderCustomersDetails.html', {order : selectedItem});
       $scope.ordersDiv=true;
    
    };
    //End showDetailOrder


    //Begin showDetailInvoices to customerInvoices
    $scope.showDetailInvoices= function(index){
       var selectedItem = $scope.invoices[index];
       salesNavigator.pushPage('views/bp/invoiceCustomersDetails.html', {invoice : selectedItem});
       $scope.ordersDiv=true;
    
    };
    //End showDetailInvoices

    //Calling in orderCustomersDetails
    $scope.showMoreDetails= function(index){
        var selectedItem = $scope.ordersLine[index];
         salesNavigator.pushPage('views/orders/orderMoreDetails.html', {orderLine : selectedItem});
    };

    //Calling the filters in OrderDetails.html and invoiceCustomersDetails to Summary
    $scope.showOrderSummary= function(){
          $scope.summary = true;
          $scope.details=false;
          $scope.detailsInvoice=false;
          
          //Calling Orders
          summaryOrders();
          //Calling Invoices
          ShowCustomerInvoices();
    };

  //Calling the filters in OrderDetails.html to Details
  $scope.showOrderDetails= function(){
      $scope.details=true;
      $scope.summary = false;

      fullOrderDetail();
  };

  //Calling the filters in invoceCustomersDetails.html to DetailsInvoice
  $scope.showInvoiceDetails= function(){
      $scope.detailsInvoice=true;
      $scope.summary = false;

      
      fullInvoiceDetail();
  };

//Calling in orderCustomersDetails
  $scope.getParams = function() { 
    var options = salesNavigator.getCurrentPage().options;
    return options.order;
  };

 //Calling in invoiceCustomersDetails
  $scope.getParamsInvoices = function() { 
    var options = salesNavigator.getCurrentPage().options;
    return options.invoice;
  }; 

  //Calling in orderCustomersDetails
  $scope.getParamsCustomers = function() { 
    var options = salesNavigator.getCurrentPage().options;
    return options.businessPartner; 
  };

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

// Begin summaryOrders
    function summaryOrders() {

      //Take the value chosen, in the previous option
      var options = salesNavigator.getCurrentPage().options;
      //$scope.cardName=options.businessPartner.cardName;

        var queryFilter="SELECT * FROM ORDR T0 ";


      if ($scope.cardName != null && typeof($scope.cardName) != 'undefined')
      {

        queryFilter = queryFilter +" WHERE T0.cardName='"+$scope.cardName+"'";

      }

        orders=new Array();
           dataBase.transaction(function(tx) {

              tx.executeSql(queryFilter, 
                         [],
                         function(tx, results)
                         {
                           
                          var nLength = results.rows.length;
               

                           for(var c=0;c<nLength;c++)
                           {

                              var order = new Order();

                              var date = results.rows.item(c).docDate;
                              var anio = date.substring(4,0);
                              var mes=  date.substring(6,4);
                              var dia= date.substring(8,6); 
                              var concat = (anio+"-"+ mes +"-"+ dia);

                              order.docEntry= results.rows.item(c).docEntry;
                              order.cardCode=results.rows.item(c).cardCode;
                              order.cardName=results.rows.item(c).cardName;
                              order.baseImp=results.rows.item(c).baseImp;
                              order.docTotal=results.rows.item(c).docTotal;
                              order.docDate= concat;
                              order.vatSum= results.rows.item(c).vatSum;
                              orders.push(order);
                          }
                            $scope.orders=orders;
                            $scope.$apply();
            
                         },
                         function(tx, error)
                         {
                           alert(error.message); 
                         }
           );
        });
    }
// End summaryOrders  


// Begin showInvoices
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
// End showInvoices


// Begin showCustomersPayments
  /*  function showCustomersPayments() {

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
                              invoice.docEntry= results.rows.item(c).docEntry;
                              
                              
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
    } */
// End showCustomersPayments


// Begin fullOrderDetail
function fullOrderDetail() {

    //Take the value chosen, in the previous option
    var options = salesNavigator.getCurrentPage().options;
    $scope.docEntry=options.order.docEntry;
   
    var queryFilter="SELECT * FROM RDR1 T0";

    if ($scope.docEntry != null && typeof($scope.docEntry) != 'undefined')
    {

      queryFilter = queryFilter +" WHERE T0.docEntry='"+$scope.docEntry+"'";

    }

    ordersLine=new Array();
       dataBase.transaction(function(tx) {

          tx.executeSql(queryFilter, 
                     [],
                     function(tx, results)
                     {
                       
                      var nLength = results.rows.length;
          
                       for(var c=0;c<nLength;c++)
                       {
                          var orderLine = new OrderLine();
                          orderLine.docEntry= results.rows.item(c).docEntry;
                          orderLine.itemCode=results.rows.item(c).itemCode;
                          orderLine.dscription=results.rows.item(c).dscription;
                          orderLine.quantity=results.rows.item(c).quantity;
                          orderLine.price=results.rows.item(c).price;
                          orderLine.lineTotal= results.rows.item(c).lineTotal;
                          orderLine.vatSum= results.rows.item(c).vatSum;
                          ordersLine.push(orderLine);
                      }
            
                        $scope.ordersLine=ordersLine;
                        $scope.$apply();
        
                     },
                     function(tx, error)
                     {
                       alert(error.message); 
                     }
       );
    });
}
// End fullOrderDetail


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


function getData()  {
   

/*
   //http://rest-service.guides.spring.io/greeting
$http.get('http://192.168.0.106/OneSalesWeb/BusinessPartnerService.svc/getBusinessPartners',
  {
    params:  {deviceId: '1', slpCode: '2'}
    ,headers: {'Content-Type': 'application/json'}
  })
   .then(
       function(response){
         // success callback
        //alert('bien');
         //var json = JSON.parse(data);
          //alert(json);

          $.each(response.data, function(key, val){
         alert(key+" "+val.CardCode+" "+val.CardName);
          });
       }, 
       function(response){
         // failure call back
         alert('error');
         alert(response.config)
       }
    );
*/


/*
$.ajax({
      url : "http://192.168.0.105/OneSalesWeb/BusinessPartnerService.svc/getBusinessPartners/",
      dataType:"JSON",
      cache: false,
      error:function (xhr, ajaxOptions, thrownError){
        
                alert(xhr.statusText);
                alert('cono');
              alert(thrownError);
            },
      success : function(data) {
        
        alert('al fin');
        alert(data);
         // var json = JSON.parse(xml);
          //alert(json);

          var items = [];
    $.each(data, function(key, val){
      alert(key+" "+val);
    });
     
      } 
    });*/




/*var http=$http({method:'GET',url:'http://192.168.0.103/OneSalesWeb/BusinessPartners.asmx'});

http.success(function(data, status, headers, config){

alert('bien pajuo nojoda');

});

http.error(function(data, status, headers, config){

 alert(config);

});*/
   /* var df = $.Deferred();
    alert('maricon');
     $http({
         method: 'GET',
         url: 'http://192.168.0.112/OneSalesWeb/BusinessPartners.asmx?WSDL'
         //,
         //params: 'limit=10, sort_by=created:desc',
         //headers: {'Authorization': 'Token token=xxxxYYYYZzzz'
      // }
     }).success(function(data){
      alert('pato');
         // With the data succesfully returned, we can resolve promise and we can access it in controller
         df.resolve();
     }).error(function(){
          alert("bitch error");
          //let the function caller know the error
          df.reject(error);
     });
     return df.promise;*/
  }



$scope.showFiltrosDiv = function(){

    //  alert($scope.filtros);
      $scope.filtros = true;
      $scope.divBP=false;
     //  alert($scope.filtros);  
    };

 $scope.showBPDiv = function(){

      //alert($scope.ordersDiv);
      $scope.divBP = true;
       $scope.filtros = false;
     //  alert($scope.ordersDiv);  
    };



$scope.selectBP = function(index) {


     var selectedItem = $scope.businessPartners[index];
      //$data.selectedItem = selectedItem;

     // alert('prueba');
    //  alert(selectedItem.cardCode);
      salesNavigator.pushPage('views/orders/newOrder.html', {businessPartner : selectedItem});
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

BusinessPartnerController.$inject = ["$scope", "$http", "$filter"];

oneApp.controller('BusinessPartnerController', BusinessPartnerController
  );
