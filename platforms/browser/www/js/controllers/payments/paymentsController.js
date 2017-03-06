var  PaymentsController=function ($scope, $http, $filter) {
 
$scope.divPayments = true;
$scope.filtros = false;
var filters=new Filter();
filters.docDateFrom=new Date();
filters.docDateTo=new  Date();
 var payments;
getPayments();

var payment;
$scope.newPayment = function() { 

    payment=new Payment();
    payment.cardName="";

    var docDate=new Date();
    var mes=addZero(parseInt(docDate.getMonth())+1);
    var ano=docDate.getFullYear();
    var dia=addZero(docDate.getDate());
    docDate =ano+mes+dia;

    payment.docDate=docDate;
    payment.taxDate=docDate;
    payment.objType="24";
    payment.payNoDoc='N'
//alert(order.lines.length);


var onSuccess = function(position) {
 

        payment.latitude=position.coords.latitude; 
        payment.longitude=position.coords.longitude; 
};

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

 navigator.geolocation.getCurrentPosition(onSuccess, onError,{ enableHighAccuracy: true });




salesNavigator.pushPage('views/payments/newPayment.html', {payment : payment, form : 'pagos'});
};


$scope.showFiltrosDiv = function(){

    //  alert($scope.filtros);
      $scope.filtros = true;
      $scope.divPayments=false;
     //  alert($scope.filtros);  
    };

 $scope.showPaymentDiv = function(){

      //alert($scope.ordersDiv);
      $scope.divPayments = true;
       $scope.filtros = false;
     //  alert($scope.ordersDiv); 
     filtersPayments(); 
    };

$scope.goToSelectBPFilter = function() { 
    
   
   salesNavigator.pushPage('views/payments/selectClientPayments.html', {'form' : 'filters', filter : filters});
  
  };


 $scope.activarFiltroCliente = function(){

 if ($scope.checkCliente)
 {


 } 
  else{
    
    filters.cardCode=null;
    filters.cardName=null ;
 }
    
};


$scope.activarOrdenar = function(){

 if ($scope.checkOrdenar)
 {


 } 
  else{
    
    filters.orderBy="";
  
 }
    
};

 $scope.selectFilterOrdernar = function(index){

 //alert(index);
    filters.orderBy=index;
};

 $scope.activarFiltroFechas = function(){

 if ($scope.checkFechas)
 {

filters.docDateFrom=$scope.docDateFrom;
filters.docDateTo=$scope.docDateTo;
 } 
  else{
    
    filters.DocDateFrom=null;
    filters.DocDateTo=null ;
 }
    
};

 $scope.cancelPayment = function(){

  var options = salesNavigator.getCurrentPage().options;
  //alert(options.form);
  if (options.form=='pagos')
  {
  
      salesNavigator.replacePage('views/payments/payments.html');
  }

  if (options.form=='activity')
  {

 salesNavigator.replacePage('views/activities/menuActivities.html',{activity:options.activity});
}
    
};
$scope.backMenu=function(){

  var options = salesNavigator.getCurrentPage().options;
  //alert(options.form);
 

 salesNavigator.replacePage('home.html');

  
};

function filtersPayments() {


if ($scope.checkFechas)
 {
    //alert('ativado fecha 2' );
filters.docDateFrom=$scope.DocDateFrom;
filters.docDateTo=$scope.DocDateTo;
 } 
  else{
    
    filters.docDateFrom=null;
    filters.docDateTo=null ;
 }

//alert( filters.docDateFrom);
var queryFilter="SELECT * FROM ORCT T0 ";


if ($scope.cardName != null && typeof($scope.cardName) != 'undefined')
{

  queryFilter = queryFilter +" WHERE T0.cardName='"+$scope.cardName+"'";

}

if (filters.docDateFrom!=null && filters.docDateTo!=null){
var docDateFrom=$scope.DocDateFrom;
var mes=addZero(parseInt(docDateFrom.getMonth())+1);
var ano=docDateFrom.getFullYear();
var dia=addZero(docDateFrom.getDate());
docDateFrom=ano+mes+dia;
filters.docDateFrom=docDateFrom;

var docDateTo=$scope.DocDateTo;
var mes=addZero(parseInt(docDateTo.getMonth())+1);
var ano=docDateTo.getFullYear();
var dia=addZero(docDateTo.getDate());
docDateTo=ano+mes+dia;
filters.docDateTo=docDateTo;
queryFilter = queryFilter + "AND docDate>='"+ filters.docDateFrom +"' AND docDate<='" + filters.docDateTo +"'";
}

if (filters.orderBy!="" && typeof(filters.orderBy) != 'undefined'){

  queryFilter = queryFilter + "ORDER BY docDate "+ filters.orderBy;
}
//alert(queryFilter);

 payments=new Array();

   dataBase.transaction(function(tx) {

   //alert('carajo');
      tx.executeSql(queryFilter, 
                 [],
                 function(tx, results)
                 {
                   
                  var nLength = results.rows.length;
       
                  //alert(nLength);

                   for(var c=0;c<nLength;c++)
                   {
    
                    // alert(results.rows.item(c).onHand);
                    var payment = new Payment();
                    payment.docEntry= results.rows.item(c).docEntry;
                    payment.cardCode=results.rows.item(c).cardCode;
                    payment.cardName=results.rows.item(c).cardName;
                    payment.docDate=results.rows.item(c).docDate;
                    payment.docTotal=results.rows.item(c).docTotal;
           //          alert(results.rows.item(c).isCommited);
                    payments.push(payment);
  
                  }
        
       // alert(wareHousesStock.length)
                $scope.payments=payments;
            // alert($scope.whsStockList.length);
                $scope.$apply();
    
                 },
                 function(tx, error)
                 {
                   alert(error.message); 
                 }
   );
});

//alert(queryFilter);



    //return (obj.cardName==$scope.cardName || obj.cardName=='' );
}



$scope.getParams = function() { 
    
try{
    var options = salesNavigator.getCurrentPage().options;
      options.payment.pendingToPaid=parseFloat(options.payment.payNoDocSum)
      +parseFloat(options. payment.appliedInvoiceSum);
//alert(options.item.itemCode);
    return options.payment ;
    }catch(err){}
  };



$scope.getFilters = function() { 
    

    //var options = salesNavigator.getCurrentPage().options;
    $scope.cardName=filters.cardName;
     //alert(options.order.lines.length);
    //alert(options.businessPartner.cardCode);
    return filters; //options.businessPartner ;
  };


$scope.activarPagoCuenta = function() { 

 var options = salesNavigator.getCurrentPage().options; 
$scope.pagoCuenta= $scope.check;  
if ($scope.check)
{
options.payment.payNoDoc='Y';
}
else
{
options.payment.payNoDoc='N';
options.payment.payNoDocSum=0;

if (options.payment.invoices.length==0){

    options.payment.docTotal=0;
    options.payment.cashSum=0;
    options.payment.transfSum=0;
    options.payment.checkSum=0;
    options.payment.checks=new Array();
}
}

  };

$scope.goToSelectBP = function() { 
    

    var options = salesNavigator.getCurrentPage().options;
 if (options.form!="activity"){
    salesNavigator.pushPage('views/payments/selectClientPayments.html', {payment : options.payment});
  }
  };


$scope.addPayNoDocSum = function() { 
    
    var options = salesNavigator.getCurrentPage().options;

    options.payment.payNoDocSum=$scope.payNoDocSum;


 


  };

  
$scope.goToPendingDocs = function() { 
    

    var options = salesNavigator.getCurrentPage().options;
  

  if (options.payment.payNoDoc=='N'){
        if (options.payment.cardCode!=null && options.payment.cardCode!="")
        {
        
        if (options.payment.invoices.length==0){
          
          salesNavigator.pushPage('views/payments/pendingDocs.html', {payment : options.payment});
          
          }
         else{
        
          salesNavigator.pushPage('views/payments/addPaidToDatePayment.html', {payment : options.payment});

         }

        

        }else{
            ons.notification.alert({
             message: 'Debe seleccionar un socio de negocio',title: 'Error'
            });   
     }
   }
   else{
ons.notification.alert({
             message: 'Con pago a cuenta no puede seleccionar documento',title: 'Error'
            });   

   }

};
$scope.goToPaymentMeans = function() { 
    

    var options = salesNavigator.getCurrentPage().options;


   
  
if (options.payment.cardCode!=null && options.payment.cardCode!="")
{
       // options.order.docDate=$scope.DocDate;
       // options.order.taxDate=$scope.DocDueDate;
       // options.order.comments=$scope.Comments;
       
      //  alert( options.order.lines.length);

if (options.payment.invoices.length>0 || options.payment.payNoDocSum>0){
 
 salesNavigator.pushPage('views/payments/meansOfPayment.html', {payment : options.payment});

}else{

  ons.notification.alert({
             message: 'Debe seleccionar un pago a cuenta o al menos un documento a pagar',title: 'Error'
        }); 
}
       
          
  }      
else{
       ons.notification.alert({
             message: 'Debe seleccionar un socio de negocio',title: 'Error'
        });   
     }



  };

$scope.savePayment=function()
{

  var options = salesNavigator.getCurrentPage().options;
  
  var doc=options.payment;
  var err=false;
  var lastDocEntry=0;
  var success;
    insertatPago(doc).done(function(idPayment){

       
       // alert(idPayment);
       

       if (options.payment.invoices.length>0){
        
          insertarInvoices(idPayment,doc).done(function(result){

          // alert('bien facturas' + result);
           updateInvoice(doc);

        });

        }


        if (options.payment.checks.length>0){


            insertarCheques(idPayment,doc).done(function(result){

            //alert('bien cheques' + result);

        });

        }
      
  ons.notification.alert({
                          message: 'El pago fue creado con exito',title: 'Infomación'
                            });

   salesNavigator.replacePage('views/payments/payments.html');
    });
  
  //alert(doc.latitude);




}

function insertatPago(doc){
 
  var lastDocEntry=0;
  var df = $.Deferred();
 
  dataBase.transaction(function(tx) {
            tx.executeSql('INSERT INTO ORCT (objType,cardCode,cardName, '
            +' payNoDoc,docDate,reference,cashSum,checkSum,transferSum,cashAcct,transferAcct, ' 
            +' comments,docTotal,payNoDocSum ,latitude,longitude,transferDate ,transferRef ) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', 
                 [doc.objType,doc.cardCode,doc.cardName,doc.payNoDoc,doc.docDate,
                  doc.reference,doc.cashSum,doc.checkSum,doc.transfSum,doc.cashAcct,doc.transferAcct
                  ,doc.comments,doc.docTotal,doc.payNoDocSum
                  ,doc.latitude,doc.longitude,doc.transferDate,doc.transferRef],
                 function(tx, results)
                 {

                    lastDocEntry=results.insertId;
                     // results is a http://dev.w3.org/html5/webdatabase/#sqlresultset .  
                    //  It has insertId, rowsAffected, and rows, which is
                   //   essentially (not exactly) an array of arrays. 
                  //    alert(lastDocEntry);
                 df.resolve(lastDocEntry);
                 },
                 function(tx, error)
                 {
                
                   
                    err=true;
                    df.reject(null);
                    ons.notification.alert({
                          message: 'Ocurrió un error'+error.code+': '+error.message,title: 'Error'
                            });
                    //alert("Error processing SQL: "+error.code+" "+error.message);
                 }
            );  
        });

return df.promise();
}


function insertarInvoices(idPayment,doc){

var df = $.Deferred();
dataBase.transaction(function(tx) {

//alert('insertando lineas');
var i=1;

if (idPayment>0){
   for (indice in doc.invoices)
   { 
  //  alert('insertando linea 1');
        tx.executeSql('INSERT INTO RCT2 (paymentId,invoiceId,sumApplied) VALUES(?,?,?)',
                 [idPayment,doc.invoices[indice].docEntry,doc.invoices[indice].appliedSum],
                 function(tx, results)
                 {
                  df.resolve(true);
                    i++;
                   // results is a http://dev.w3.org/html5/webdatabase/#sqlresultset .  
                   // It has insertId, rowsAffected, and rows, which is
                   // essentially (not exactly) an array of arrays. 
                 },
                 function(tx, error)
                 {
                    err=true;
                   // alert("Error processing SQL: "+error.code+" "+error.message);
                  df.reject(null);
                     ons.notification.alert({
                          message: 'Ocurrió un error'+error.code+': '+error.message,title: 'Error'
                            });
                 }
            );

    }
}
});
return df.promise();
}



function insertarCheques(idPayment,doc){

var df = $.Deferred();

dataBase.transaction(function(tx) {
var j=1;
if (idPayment>0){
   for (indice in doc.checks)
   { 
        tx.executeSql('INSERT INTO RCT1 (paymentId,checkSum,checkNum,checkAcct,checkBankAcct) VALUES(?,?,?,?,?)',
                 [idPayment,doc.checks[indice].checkAmount,doc.checks[indice].nroCheck
                 ,doc.checks[indice].acctCode,doc.checks[indice].bankAccount],
                 function(tx, results)
                 {
                    j++;
                       df.resolve(true);
                 },
                 function(tx, error)
                 {
                    err=true;
                   // alert("Error processing SQL: "+error.code+" "+error.message);
               
                  df.reject(null);
                     ons.notification.alert({
                          message: 'Ocurrió un error'+error.code+': '+error.message,title: 'Error'
                            });
                 }
            );

    }
}
})

return df.promise();


}


function updateInvoice(doc){

var df = $.Deferred();

dataBase.transaction(function(tx) {
var j=1;

   for (indice in doc.invoices)
   { 
   // alert(doc.invoices[indice].docEntry);
   // alert(doc.invoices[indice].appliedSum);
        tx.executeSql('UPDATE OINV SET  paidToDate=? WHERE docEntry=?',
                 [doc.invoices[indice].appliedSum,doc.invoices[indice].docEntry],
                 function(tx, results)
                 {
                    j++;
                    // alert(doc.invoices[indice].docEntry);
                       df.resolve(true);
                 },
                 function(tx, error)
                 {
                    err=true;
                   // alert("Error processing SQL: "+error.code+" "+error.message);
               
                  df.reject(null);
                     ons.notification.alert({
                          message: 'Ocurrió un error'+error.code+': '+error.message,title: 'Error'
                            });
                 }
            );

    }

})

return df.promise();


}

function getPayments(){


var payments=new Array();

   dataBase.transaction(function(tx) {

   //alert('carajo');
      tx.executeSql('SELECT * FROM ORCT T0', 
                 [],
                 function(tx, results)
                 {
                   
                  var nLength = results.rows.length;
       
                  //alert(nLength);

                   for(var c=0;c<nLength;c++)
                   {
    
                    // alert(results.rows.item(c).onHand);
                    var payment = new Payment();
                    payment.docEntry= results.rows.item(c).docEntry;
                    payment.cardCode=results.rows.item(c).cardCode;
                    payment.cardName=results.rows.item(c).cardName;
                    payment.docDate=results.rows.item(c).docDate;
                    payment.docTotal=results.rows.item(c).docTotal;
           //          alert(results.rows.item(c).isCommited);
                    payments.push(payment);
  
                  }
        
       // alert(wareHousesStock.length)
                $scope.payments=payments;
            // alert($scope.whsStockList.length);
                $scope.$apply();
    
                 },
                 function(tx, error)
                 {
                   alert(error.message); 
                 }
   );
});
}

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

}

PaymentsController.$inject = ["$scope", "$http", "$filter"];

oneApp.controller('PaymentsController', PaymentsController);


var SelectBPController=function ($scope, $http, $filter) {

$scope.selectBP = function(index) {
    
     var options = salesNavigator.getCurrentPage().options;
     var selectedItem = $scope.businessPartners[index];

  	
     // options.order.cardName=selectedItem.cardName;
     // options.order.cardCode=selectedItem.cardCode;
     
      



if (options.form!='filters'){
     options.payment.cardCode=selectedItem.cardCode;
     options.payment.cardName=selectedItem.cardName;
      //$data.selectedItem = selectedItem;

     // alert('prueba');
    //  alert(selectedItem.cardCode);
     // salesNavigator.pushPage('views/orders/newOrder.html', {businessPartner : selectedItem});
     salesNavigator.popPage('views/payments/newPayment.html');
    }
    else{


     options.filter.cardCode=selectedItem.cardName;
     options.filter.cardName=selectedItem.cardName;
     salesNavigator.popPage('views/payments/payments.html');

    }


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

SelectBPController.$inject = ["$scope", "$http", "$filter"];

oneApp.controller('SelectBPController', SelectBPController);
