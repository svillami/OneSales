var  OrdersController=function ($scope, $http, $filter) {


getOrders();

var order;
var filters=new Filter();
filters.docDateFrom=new Date();
filters.docDateTo=new  Date();

var  orders;
$scope.filtros = false;
$scope.ordersDiv=true;
$scope.summary= true;
$scope.details= false;

$scope.DocDate=new Date();
$scope.DocDueDate=new Date();

$scope.initOrder = function() { 

    order=new Order();
    order.cardName="";
    var docDate=new Date();
    var mes=addZero(parseInt(docDate.getMonth())+1);
    var ano=docDate.getFullYear();
    var dia=addZero(docDate.getDate());
    var date =ano+mes+dia;//+addZero(docDate.getMonth())+addZero(docDate.getDay());
    order.docDate=date;
    order.taxDate=date;//new Date();
    order.objType="17";

    //alert(date);

    var onSuccess = function(position) {
     
            order.latitude=position.coords.latitude; 
            order.longitude=position.coords.longitude; 
    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

     navigator.geolocation.getCurrentPosition(onSuccess, onError,{ enableHighAccuracy: true });


    salesNavigator.pushPage('views/orders/newOrder.html', {order : order, form : 'pedidos'});
};


$scope.addComments = function(){

//alert($scope.Comments);
 var options = salesNavigator.getCurrentPage().options;
 options.order.comments=$scope.Comments;
}

 $scope.showFiltrosDiv = function(){

    //  alert($scope.filtros);
      $scope.filtros = true;
      $scope.ordersDiv=false;
     //  alert($scope.filtros);  
    };

 $scope.showDetail= function(index){

     //alert('ppppp');
      var selectedItem = $scope.orders[index];
    //alert(selectedItem.cardCode);
       salesNavigator.pushPage('views/orders/orderDetails.html', {order : selectedItem});
       $scope.ordersDiv=true;
     //  alert($scope.filtros);  
    };

  $scope.showMoreDetails= function(index){

     //alert('ppppp');
      var selectedItem = $scope.ordersLine[index];
    //alert(selectedItem.cardCode);
       salesNavigator.pushPage('views/orders/orderMoreDetails.html', {orderLine : selectedItem});
     //  alert($scope.filtros);  
    };

  //Calling the filters in OrderDetails.html to Summary
  $scope.showOrderSummary= function(){
        $scope.summary = true;
        $scope.details=false;
 
        summaryOrders();
  };

//Calling the filters in OrderDetails.html to Details
  $scope.showOrderDetails= function(){
      $scope.details=true;
      $scope.summary = false;

      fullOrderDetail();
  };

 $scope.showOrdersDiv = function(){

//alert($scope.DocDateFrom);
      //alert($scope.ordersDiv);
    $scope.ordersDiv = true;
    $scope.filtros = false;
   //  
filtersOrders();


   //var ordersFilters=
  //  orders.filter(filtersOrders);
    //alert(orders.length); 
    // alert(orders.length); 
    };

// Active filter customers
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


function filtersOrders() {


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
var queryFilter="SELECT * FROM ORDR T0 ";

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

orders=new Array();
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
                    var order = new Order();

                    var date = results.rows.item(c).docDate;
                    var anio = date.substring(4,0);
                    var  mes=  date.substring(6,4);
                    var dia= date.substring(8,6); 
                    var concat = (anio+"-"+ mes +"-"+ dia);
                    order.docEntry= results.rows.item(c).docEntry;
                    order.cardCode=results.rows.item(c).cardCode;
                    order.cardName=results.rows.item(c).cardName;
                 
                    order.docTotal=results.rows.item(c).docTotal;
                    order.VatSum= results.rows.item(c).VatSum;
                    order.baseImp= (order.docTotal-order.VatSum);

                    order.docDate = concat;
           //          alert(results.rows.item(c).isCommited);
                     orders.push(order);
  
                  }
        
       // alert(wareHousesStock.length)
                $scope.orders=orders;
            // alert($scope.whsStockList.length);
                $scope.$apply();
    
                 },
                 function(tx, error)
                 {
                   alert(error.message); 
                 }
   );
});


    //return (obj.cardName==$scope.cardName || obj.cardName=='' );
}



$scope.getParams = function() { 
    
    var options = salesNavigator.getCurrentPage().options;
    return options.order; 
  };


// Begin summaryOrders
function summaryOrders() {

    var queryFilter="SELECT * FROM ORDR T0 ";

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
                          order.docEntry= results.rows.item(c).docEntry;
                          order.cardCode=results.rows.item(c).cardCode;
                          order.cardName=results.rows.item(c).cardName;
                          order.baseImp=results.rows.item(c).baseImp;
                          order.docTotal=results.rows.item(c).docTotal;
                          order.docDate= results.rows.item(c).docDate;
                          order.VatSum= results.rows.item(c).VatSum;
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

// Begin getParamsOrderLine
$scope.getParamsOrderLine = function() { 
    
    var options = salesNavigator.getCurrentPage().options;
    return options.orderLine; 
  };
// End getParamsOrderLine


$scope.getFilters = function() { 
    

    //var options = salesNavigator.getCurrentPage().options;
    $scope.cardName=filters.cardName;
     //alert(options.order.lines.length);
    //alert(options.businessPartner.cardCode);
    return filters; //options.businessPartner ;
  };


$scope.getComments = function() { 
    

    var options = salesNavigator.getCurrentPage().options;
    //$scope.cardName=options.order.cardName;
     //alert(options.order.lines.length);
      //alert(options.businessPartner.cardCode);
     $scope.Comments=options.order.comments; //options.businessPartner ;
  };


$scope.cancelOrder=function(){

  var options = salesNavigator.getCurrentPage().options;
  //alert(options.form);
  if (options.form=='pedidos')
  {
  
      salesNavigator.replacePage('views/orders/orders.html');
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

$scope.getTotals = function() { 
    
//alert('nojoda');
try{
    var options = salesNavigator.getCurrentPage().options;
    //$scope.cardName=options.order.cardName;
     //alert(options.order.lines.length);
    //alert(options.businessPartner.cardCode);
    //return "nojoda"; //options.businessPartner ;

   $scope.baseImp=options.order.baseImp;
   $scope.vatSum=options.order.vatSum;
   $scope.docTotal=options.order.docTotal;
  
 //  alert(options.order.comments);

}catch(err){}
  };


$scope.goToSelectBP = function() { 
    

    var options = salesNavigator.getCurrentPage().options;
  if (options.form!="activity"){
    salesNavigator.pushPage('views/orders/selectClient.html', {order : options.order,'form' : 'newOrder', filter:null});
  }
  };

$scope.goToSelectBPFilter = function() { 
    
   
   salesNavigator.pushPage('views/orders/selectClient.html', {'form' : 'filters', filter : filters});
  
  };





$scope.goToSelectItems = function() 
{ 
    

    var options = salesNavigator.getCurrentPage().options;


if (options.order.cardCode!=null && options.order.cardCode!="")
{

var docDate=$scope.DocDate;
var mes=addZero(parseInt(docDate.getMonth())+1);
var ano=docDate.getFullYear();
var dia=addZero(docDate.getDate());
 docDate =ano+mes+dia;

var docDueDate=$scope.DocDueDate;
var mes=addZero(parseInt(docDueDate.getMonth())+1);
var ano=docDueDate.getFullYear();
var dia=addZero(docDueDate.getDate());
docDueDate =ano+mes+dia;

//alert(docDate);
//alert(docDueDate);

        options.order.docDate=docDate;// $scope.DocDate;
        options.order.taxDate=docDueDate;//$scope.DocDueDate;
        options.order.comments=$scope.Comments;
       
      //  alert( options.order.lines.length);

        if (options.order.lines.length==0)
        {
        
           salesNavigator.pushPage('views/orders/selectItems.html', {order : options.order});
        }
else{
         salesNavigator.pushPage('views/orders/addQtyItems.html', {order : options.order});
     }
        
}
    
    else{

        ons.notification.alert({
             message: 'Debe seleccionar un socio de negocio',title: 'Error'
        });

    }
    
};





$scope.saveOrder = function() { 
    

    var options = salesNavigator.getCurrentPage().options;
    //$scope.cardName=options.order.cardName;
     //alert(options.order.lines.length);
    //alert(options.businessPartner.cardCode);
    // options.order; //options.businessPartner ;

    //alert(options.order.lines.length);
    
    var doc=options.order;


   save(doc).done(function(results){

       
       // alert(idPayment);
       
      ons.notification.alert({
                          message: 'El pedido fue creado con exito',title: 'Información'
                            });
       salesNavigator.replacePage('views/orders/orders.html');
    });




  };

 function save(doc){

 var err=false;
    var lastDocEntry=0;
   // alert(doc.latitude);
  

     var df = $.Deferred();
        dataBase.transaction(function(tx) {
            tx.executeSql('INSERT INTO ORDR (objType,cardCode,cardName, '
            +'docDate,taxDate,comments,docTotal,discountPercent,VatSum,latitude,longitude ) VALUES(?,?,?,?,?,?,?,?,?,?,?)', 
                 [doc.objType,doc.cardCode,doc.cardName,doc.docDate,
                  doc.taxDate,doc.comments,doc.docTotal.replace(doc.currency,''),doc.discountPercent
                  ,doc.vatSum.replace(doc.currency,''), doc.latitude,doc.longitude],
                 function(tx, results)
                 {

                    lastDocEntry=results.insertId;
                     // results is a http://dev.w3.org/html5/webdatabase/#sqlresultset .  
                    //  It has insertId, rowsAffected, and rows, which is
                   //   essentially (not exactly) an array of arrays. 
                  //    alert(lastDocEntry);
              df.resolve(true);
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


dataBase.transaction(function(tx) {

//alert('insertando lineas');
var i=1;
if (lastDocEntry>0){
   for (indice in doc.lines)
   { 
  //  alert('insertando linea 1');
        tx.executeSql('INSERT INTO RDR1 (docEntry,lineNum,itemCode,dscription,'
            +'quantity,price,taxCode,vatSum,discountPercent,lineTotal) VALUES(?,?,?,?,?,?,?,?,?,?)',
                 [lastDocEntry,indice,doc.lines[indice].itemCode,doc.lines[indice].dscription,
                 doc.lines[indice].quantity,doc.lines[indice].price,doc.lines[indice].taxCode,doc.lines[indice].vatSum,0,
                 doc.lines[indice].lineTotal],
                 function(tx, results)
                 {
                    i++;
                   // results is a http://dev.w3.org/html5/webdatabase/#sqlresultset .  
                   // It has insertId, rowsAffected, and rows, which is
                   // essentially (not exactly) an array of arrays. 

                   /* if (err==false && lastDocEntry>0 && i==doc.lines.length){

                          ons.notification.alert({
                          message: 'El pedido fue creado con exito',title: 'Información'
                            });
                        }*/
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

});



return df.promise();

 }



function getOrders(){


orders=new Array();

   dataBase.transaction(function(tx) {

   //alert('carajo');
      tx.executeSql('SELECT * FROM ORDR T0', 
                 [],
                 function(tx, results)
                 {
                   
                  var nLength = results.rows.length;
       
                  //alert(nLength);

                   for(var c=0;c<nLength;c++)
                   {
                    var order = new Order();

                    var date = results.rows.item(c).docDate;
                    var anio = date.substring(4,0);
                    var  mes=  date.substring(6,4);
                    var dia= date.substring(8,6); 
                    var concat = (anio+"-"+ mes +"-"+ dia);

                    order.docEntry= results.rows.item(c).docEntry;
                    order.cardCode=results.rows.item(c).cardCode;
                    order.cardName=results.rows.item(c).cardName;
                    order.docDate= concat;
                    order.docTotal=results.rows.item(c).docTotal;
                    order.VatSum= results.rows.item(c).VatSum;
                    order.baseImp= (order.docTotal - order.VatSum);
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


function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

}

OrdersController.$inject = ["$scope", "$http", "$filter"];

oneApp.controller('OrdersController', OrdersController);



var SelectBusinessPartnerController=function ($scope, $http, $filter) {

$scope.selectBP = function(index) {
    
     var options = salesNavigator.getCurrentPage().options;
     var selectedItem = $scope.businessPartners[index];

//alert(options.form);
if (options.form!='filters'){
      options.order.cardName=selectedItem.cardName;
      options.order.cardCode=selectedItem.cardCode;
      //$data.selectedItem = selectedItem;

     // alert('prueba');
    //  alert(selectedItem.cardCode);
     // salesNavigator.pushPage('views/orders/newOrder.html', {businessPartner : selectedItem});
      salesNavigator.popPage('views/orders/newOrder.html');
    }
    else{


     options.filter.cardCode=selectedItem.cardCode;
     options.filter.cardName=selectedItem.cardName;
     salesNavigator.popPage('views/orders/orders.html');

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

SelectBusinessPartnerController.$inject = ["$scope", "$http", "$filter"];

oneApp.controller('SelectBusinessPartnerController', SelectBusinessPartnerController);




var SelectItemsController=function ($scope, $http, $filter) {


var articulosSelecionados=new Array();

$scope.selectedItems = function(index) {
     var selectedItem = $scope.items[index];

var i=0;
var posIten=0;

var options = salesNavigator.getCurrentPage().options;

     for (indice in options.order.lines)//articulosSelecionados) 
     {
  
    //if (articulosSelecionados[indice].itemCode==selectedItem.itemCode)
        if (options.order.lines[indice].itemCode==selectedItem.itemCode)
    {
      //alert(articulosSelecionados[indice].itemName);
          //  alert(options.order.lines[indice].dscription);
      i++;
      posIten=indice;
    }
  
   }
  if (i==0){    
    //  alert('insertando' + selectedItem.itemCode);

        var orderLine =new OrderLine();
        orderLine.itemCode= selectedItem.itemCode;
        orderLine.dscription=selectedItem.itemName;
        orderLine.quantity=selectedItem.quantity;
        orderLine.taxCode=selectedItem.taxCode; 
        orderLine.price=selectedItem.price;
        orderLine.lineTotal=selectedItem.lineTotal;
        orderLine.vatSum=parseFloat(selectedItem.lineTotal)*(parseFloat(selectedItem.rate)/100);
        orderLine.rate=selectedItem.rate;
        orderLine.currency=selectedItem.currency;
        orderLine.whsCode=selectedItem.whsCode;
       // alert('insertando' + orderLine.itemCode);
       
        options.order.lines.push(orderLine);
        

    //articulosSelecionados.push(selectedItem);
  }
  else{

    //alert('borrando' + selectedItem.itemCode);
    // articulosSelecionados.splice(posIten, 1);
         options.order.lines.splice(posIten, 1);
       //  alert('borrando' + selectedItem.itemCode);
  }

  /*alert( options.order.lines.length);

  for (indice in articulosSelecionados) 
     {
      alert(articulosSelecionados[indice].itemCode);
     }*/
      
      //$data.selectedItem = selectedItem;

      //alert('prueba');
     //alert(selectedItem.cardCode);
     //salesNavigator.pushPage('views/orders/newOrder.html', {businessPartner : selectedItem});
    };

$scope.AddQtyItensHtml = function() {
    
    var options = salesNavigator.getCurrentPage().options;
    //  alert(articulosSelecionados.length);
    //  alert(selectedItem.cardCode);
    //  salesNavigator.pushPage('views/orders/addQtyItems.html', {items : articulosSelecionados});

    if (options.order.lines.length>0){

     salesNavigator.pushPage('views/orders/addQtyItems.html', {order : options.order});}
     else{ ons.notification.alert({
             message: 'Debe seleccionar un articulo',title: 'Error'
        });}
    };


//alert(articulosSelecionados.length);   
var items=new Array();

dataBase.transaction(selectRecords, errorInQuery, successResults);

function selectRecords(tx)
{
  
    tx.executeSql('SELECT *, (SELECT SUM(T5.onHand) FROM OITW T5 WHERE T5.itemCode=T0.itemCode )AS "stock", (SELECT MAX(T4.price) FROM ITM1 T6 WHERE T6.itemCode=T0.itemCode)AS "price" FROM OITM T0, OITB T1, OMRC T2, OITW T3, ITM1 T4, OSTC T5 '
      +' WHERE T0.groupCode=T1.GroupCode AND T0.firmCode=T2.FirmCode AND T0.itemCode=T3.itemCode AND T0.itemCode=T4.itemCode AND T0.taxCodeAr=T5.taxCode GROUP BY T0.itemCode', [], successResults,errorInQuery);
}
 
function successResults(tx,results)
{
    
   var nLength = results.rows.length;
       
        //alert(nLength);

// alert('consultando articulo 2' );
       for(var c=0;c<nLength;c++){
        // alert('consultando articulo 3' );
        
        var item = new Item
        (results.rows.item(c).itemCode,
        results.rows.item(c).itemName,
        results.rows.item(c).active,
        results.rows.item(c).groupCode,
        results.rows.item(c).barCode,
            results.rows.item(c).firmCode,
            results.rows.item(c).salesUnit,
            results.rows.item(c).salesUnitQty,
            1,
            results.rows.item(c).price,
            results.rows.item(c).currency,
            results.rows.item(c).firmName,
            results.rows.item(c).groupName,
            results.rows.item(c).taxCodeAr);
     //    alert(item.itemCode+ ' ' + item.itemName +'stock '+results.rows.item(c).stock);
         
            item.rate=results.rows.item(c).rate;

            item.whsCode=results.rows.item(c).whsCode;
            items.push(item);
   //alert('consultando articulo 3 ' + item.rate);
        }
        
    $scope.items=items;
    $scope.$apply();
    
}

function errorInQuery(tx,error)
{
    
    alert(error.message); 
//alert(JSON.stringify(results));
      
} 




}

SelectItemsController.$inject = ["$scope", "$http", "$filter"];

oneApp.controller('SelectItemsController', SelectItemsController);


