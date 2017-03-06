
var SyncController=function ($scope, $http, $filter) {


$scope.Sync = function(){

   getData();
   sendData();

};


function getData(){


getPrices();
getWareHouses();
getTaxCode();
getManufacturer();
getItemsGroup();
getPaymentsCondition();
getBanks();
getBusinessPartners();

}

function sendData(){



}


function getPrices(){

/*
$http.get('http://192.168.0.106/OneSalesWeb/ItemService.svc/getPrices',
  {
    params:  {deviceId: JSON.stringify('1')}
    ,headers: {'Content-Type': 'application/json'}
  })
   .then(
       function(response){
        
          $.each(response.data, function(key, val){
            
           // alert(key+" "+val.price+" "+val.priceList);

            insertPrices(val);
         
          });
       }, 
       function(response){
         // failure call back
        ons.notification.alert({  message: 'Error sincronizando Precios ' + response.status + ' ' +response.statusText, title:'Error'});
         //alert(response.config)
       }
    );*/




$.ajax({
      url : "http://192.168.0.106/OneSalesWeb/ItemService.svc/getPrices",
      dataType:"JSON",
      data: {deviceId: '1'},
      cache: false,
      error:function (response, ajaxOptions, thrownError){
        
                //alert(xhr.statusText);
                //alert('cono');

                 ons.notification.alert({  
                  message: 'Error sincronizando Precios '
                   + thrownError + ' ' +response.statusText, title:'Error'});
              // alert(thrownError);
            },
      success : function(data) {
        
      
          $.each(data, function(key, val){
             // alert(key+" "+val.ItemCode +" " +val.PriceList);

              insertPrices(val);
          });
     
      } 
    });





}




function getWareHouses(){

/*$http.get('http://192.168.0.106/OneSalesWeb/ItemService.svc/getWareHouses',
  {
    params:  {deviceId: JSON.stringify('1')}
    ,headers: {'Content-Type': 'application/json'}
  })
   .then(
       function(response){
        
          $.each(response.data, function(key, val){
            
            //alert(key+" "+val.PaymentGroupNum+" "+val.PymntGroup);

            insertWareHouses(val);
         
          });
       }, 
       function(response){
         // failure call back
       ons.notification.alert({  message: 'Error sincronizando Almacenes ' + response.status + ' ' +response.statusText, title:'Error'});
         //alert(response.config)
       }
    );*/

   

$.ajax({
      url : "http://192.168.0.106/OneSalesWeb/ItemService.svc/getWareHouses",
      dataType:"JSON",
      data: {deviceId: '1'},
      cache: false,
      error:function (xhr, ajaxOptions, thrownError){
        
             //   alert(xhr.statusText);
                //alert('cono');
             // alert(thrownError);

                  ons.notification.alert({  
                  message: 'Error sincronizando Precios '
                   + thrownError + ' ' +response.statusText, title:'Error'});
            },
      success : function(data) {
        
          $.each(data, function(key, val){  
            insertWareHouses(val);
          });
     
      } 
    });





}





function getTaxCode(){

/*
$http.get('http://192.168.0.106/OneSalesWeb/UtilityServices.svc/getTaxes',
  {
    params:  {deviceId: '1'}
    ,headers: {'Content-Type': 'application/json'}
  })
   .then(
       function(response){
        
          $.each(response.data, function(key, val){
            
            //alert(key+" "+val.PaymentGroupNum+" "+val.PymntGroup);

            insertTaxCode(val);
         
          });
       }, 
       function(response){
         // failure call back
        ons.notification.alert({  message: 'Error sincronizando TaxCode ' 
          + response.status + ' ' +response.statusText, title:'Error'});
         //alert(response.config)
       }
    );*/

$.ajax({
      url : "http://192.168.0.106/OneSalesWeb/UtilityServices.svc/getTaxes",
      dataType:"JSON",
      data: {deviceId: '1'},
      cache: false,
      error:function (xhr, ajaxOptions, thrownError){
        
             //   alert(xhr.statusText);
                //alert('cono');
             // alert(thrownError);

                  ons.notification.alert({  
                  message: 'Error sincronizando TaxCode '
                   + thrownError + ' ' +response.statusText, title:'Error'});
            },
      success : function(data) {
        
          $.each(data, function(key, val){  
            insertTaxCode(val);
          });
     
      } 
    });


}

function getManufacturer(){
/*
$http.get('http://192.168.0.106/OneSalesWeb/ItemService.svc/getManufacturers',
  {
    params:  {deviceId: '1'}
    ,headers: {'Content-Type': 'application/json'}
  })
   .then(
       function(response){
        
          $.each(response.data, function(key, val){
            
            //alert(key+" "+val.PaymentGroupNum+" "+val.PymntGroup);

            insertManufacturer(val);
         
          });
       }, 
       function(response){
         // failure call back
         ons.notification.alert({  message: 'Error sincronizando Fabricantes ' 
          + response.status + ' ' +response.statusText, title:'Error'});
         //alert(response.config)
       }
    );
   */

$.ajax({
      url : "http://192.168.0.106/OneSalesWeb/ItemService.svc/getManufacturers",
      dataType:"JSON",
      data: {deviceId: '1'},
      cache: false,
      error:function (xhr, ajaxOptions, thrownError){
        
             //   alert(xhr.statusText);
                //alert('cono');
             // alert(thrownError);

                  ons.notification.alert({  
                  message: 'Error sincronizando Fabricantes '
                   + thrownError + ' ' +response.statusText, title:'Error'});
            },
      success : function(data) {
        
          $.each(data, function(key, val){  
            insertManufacturer(val);
          });
     
      } 
    });




}





function getItemsGroup(){

/*
$http.get('http://192.168.0.106/OneSalesWeb/ItemService.svc/getItemsGroup',
  {
    params:  {deviceId: '1'}
    ,headers: {'Content-Type': 'application/json'}
  })
   .then(
       function(response){
        
          $.each(response.data, function(key, val){
            
            //alert(key+" "+val.PaymentGroupNum+" "+val.PymntGroup);

            insertItemsGroup(val);
         
          });
       }, 
       function(response){
         // failure call back
         ons.notification.alert({  message: 'Error sincronizando Grupos de Articulos ' 
          + response.status + ' ' +response.statusText, title:'Error'});
         //alert(response.config)
       }
    );*/

$.ajax({
      url : "http://192.168.0.106/OneSalesWeb/ItemService.svc/getItemsGroup",
      dataType:"JSON",
      data: {deviceId: '1'},
      cache: false,
      error:function (xhr, ajaxOptions, thrownError){
        
             //   alert(xhr.statusText);
                //alert('cono');
             // alert(thrownError);

                  ons.notification.alert({  
                  message: 'Error sincronizando Grupos de Articulos '
                   + thrownError + ' ' +response.statusText, title:'Error'});
            },
      success : function(data) {
        
          $.each(data, function(key, val){  
            insertItemsGroup(val);
          });
     
      } 
    });


}




function getPaymentsCondition(){

/*
$http.get('http://192.168.0.106/OneSalesWeb/UtilityServices.svc/getPaymentConditions',
  {
    params:  {deviceId: JSON.stringify('1')}
    ,headers: {'Content-Type': 'application/json'}
  })
   .then(
       function(response){
        
          $.each(response.data, function(key, val){
            
            alert(key+" "+val.PaymentGroupNum+" "+val.PymntGroup);

            insertPaymentsCondition(val);
         
          });
       }, 
       function(response){
         // failure call back
         ons.notification.alert({  message: 'Error sincronizando Condiciones de Pago ' 
          + response.status + ' ' +response.statusText, title:'Error'});
         //alert(response.config)
       }
    );
   */


   $.ajax({
      url : "http://192.168.0.106/OneSalesWeb/UtilityServices.svc/getPaymentConditions",
      dataType:"JSON",
      data: {deviceId: '1'},
      cache: false,
      error:function (xhr, ajaxOptions, thrownError){
        
             //   alert(xhr.statusText);
                //alert('cono');
             // alert(thrownError);

                  ons.notification.alert({  
                  message: 'Error sincronizando Condiciones de Pago '
                   + thrownError + ' ' +response.statusText, title:'Error'});
            },
      success : function(data) {
        
          $.each(data, function(key, val){  
            insertPaymentsCondition(val);
          });
     
      } 
    });

}



function getBanks(){

/*
$http.get('http://192.168.0.106/OneSalesWeb/BankService.svc/getBanks',
  {
    params:  {deviceId: '1'}
    ,headers: {'Content-Type': 'application/json'}
  })
   .then(
       function(response){
        
          $.each(response.data, function(key, val){
         		
         		//alert(key+" "+val.CardCode+" "+val.CardName);

         		insertBanks(val);
         
          });
       }, 
       function(response){
         // failure call back
         ons.notification.alert({  message: 'Error sincronizando Bancos ' 
          + response.status + ' ' +response.statusText, title:'Error'});
         //alert(response.config)
       }
    );
*/

 $.ajax({
      url : "http://192.168.0.106/OneSalesWeb/BankService.svc/getBanks",
      dataType:"JSON",
      data: {deviceId: '1'},
      cache: false,
      error:function (xhr, ajaxOptions, thrownError){
        
             //   alert(xhr.statusText);
                //alert('cono');
             // alert(thrownError);

                  ons.notification.alert({  
                  message: 'Error sincronizando Bancos '
                   + thrownError + ' ' +response.statusText, title:'Error'});
            },
      success : function(data) {
        
          $.each(data, function(key, val){  
            insertBanks(val);
          });
     
      } 
    });


}


function getBusinessPartners(){

/*
$http.get('http://192.168.0.106/OneSalesWeb/BusinessPartnerService.svc/getBusinessPartners',
  {
    params:  {deviceId: '1', slpCode: '2'}
    ,headers: {'Content-Type': 'application/json'}
  })
   .then(
       function(response){
        
          $.each(response.data, function(key, val){
         		
//         		alert(key+" "+val.CardCode+" "+val.CardName);

         		insertBP(val);
         
          });
       }, 
       function(response){
         // failure call back
        ons.notification.alert({  message: 'Error sincronizando Socios de Negocios ' 
          + response.status + ' ' +response.statusText, title:'Error'});
        // alert(response.config)
       }
    );*/



    $.ajax({
      url : "http://192.168.0.106/OneSalesWeb/BusinessPartnerService.svc/getBusinessPartners",
      dataType:"JSON",
      data: {deviceId: '1', slpCode: '2'},
      cache: false,
      error:function (xhr, ajaxOptions, thrownError){
        
             //   alert(xhr.statusText);
                //alert('cono');
             // alert(thrownError);

                  ons.notification.alert({  
                  message: 'Error sincronizando Socios de Negocios '
                   + thrownError + ' ' +response.statusText, title:'Error'});
            },
      success : function(data) {
        
          $.each(data, function(key, val){  
            insertBP(val);
          });
     
      } 
    });

}

function insertPrices(price){
 

 var df = $.Deferred();
 // alert('insertando bancos');
 dataBase.transaction(function(tx) {
            tx.executeSql('INSERT INTO ITM1 (itemCode,priceList,price,currency,priceListName) VALUES(?,?,?,?,?)', 
                 [price.ItemCode,price.PriceList,price.UnitPrice,price.Currency,price.priceList],
                 function(tx, results)
                 {

                    lastDocEntry=results.insertId;
                   
                  df.resolve(true);
                 },
                 function(tx, error)
                 {
                  //alert('error insertando bancos');
                    err=true;
                   df.reject(null);
                    ons.notification.alert({
                          message: 'Ocurrió un error Precio'+error.code+': '+error.message,title: 'Error'
                            });
                    //alert("Error processing SQL: "+error.code+" "+error.message);
                 }
            );  
        });

}




function insertWareHouses(whs){
 

 var df = $.Deferred();
 // alert('insertando bancos');
 dataBase.transaction(function(tx) {
            tx.executeSql('INSERT INTO OWHS (whsCode,whsName) VALUES(?,?)', 
                 [whs.WhsCode,whs.WhsName],
                 function(tx, results)
                 {

                    lastDocEntry=results.insertId;
                   
                  df.resolve(true);
                 },
                 function(tx, error)
                 {
                  //alert('error insertando bancos');
                    err=true;
                   df.reject(null);
                    ons.notification.alert({
                          message: 'Ocurrió un error Almacenes'+error.code+': '+error.message,title: 'Error'
                            });
                    //alert("Error processing SQL: "+error.code+" "+error.message);
                 }
            );  
        });

}

function insertTaxCode(tax){
 

 var df = $.Deferred();
 // alert('insertando bancos');
 dataBase.transaction(function(tx) {
            tx.executeSql('INSERT INTO OSTC (taxCode,rate) VALUES(?,?)', 
                 [tax.TaxCode,tax.Rate],
                 function(tx, results)
                 {

                    lastDocEntry=results.insertId;
                   
                  df.resolve(true);
                 },
                 function(tx, error)
                 {
                  //alert('error insertando bancos');
                    err=true;
                   df.reject(null);
                    ons.notification.alert({
                          message: 'Ocurrió un error TaxCode'+error.code+': '+error.message,title: 'Error'
                            });
                    //alert("Error processing SQL: "+error.code+" "+error.message);
                 }
            );  
        });

}



function insertManufacturer(manufacturer){
 

 var df = $.Deferred();
 // alert('insertando bancos');
 dataBase.transaction(function(tx) {
            tx.executeSql('INSERT INTO OMRC (firmCode,firmName) VALUES(?,?)', 
                 [manufacturer.FirmCode,manufacturer.FirmName],
                 function(tx, results)
                 {

                    lastDocEntry=results.insertId;
                   
                  df.resolve(true);
                 },
                 function(tx, error)
                 {
                  //alert('error insertando bancos');
                    err=true;
                   df.reject(null);
                    ons.notification.alert({
                          message: 'Ocurrió un error Fabricantes'+error.code+': '+error.message,title: 'Error'
                            });
                    //alert("Error processing SQL: "+error.code+" "+error.message);
                 }
            );  
        });

}





function insertItemsGroup(itemGrp){
 

 var df = $.Deferred();
 // alert('insertando bancos');
 dataBase.transaction(function(tx) {
            tx.executeSql('INSERT INTO OITB (groupCode,groupName) VALUES(?,?)', 
                 [itemGrp.GroupCode,itemGrp.GroupName],
                 function(tx, results)
                 {

                    lastDocEntry=results.insertId;
                   
                  df.resolve(true);
                 },
                 function(tx, error)
                 {
                  //alert('error insertando bancos');
                    err=true;
                   df.reject(null);
                    ons.notification.alert({
                          message: 'Ocurrió un error Grupos Articulos'+error.code+': '+error.message,title: 'Error'
                            });
                    //alert("Error processing SQL: "+error.code+" "+error.message);
                 }
            );  
        });

}







function insertPaymentsCondition(paymentcondition){
 

 var df = $.Deferred();
 // alert('insertando bancos');
 dataBase.transaction(function(tx) {
            tx.executeSql('INSERT INTO OCTG (paymentGroupNum,pymntGroup) VALUES(?,?)', 
                 [paymentcondition.PaymentGroupNum,paymentcondition.PymntGroup],
                 function(tx, results)
                 {

                    lastDocEntry=results.insertId;
                   
                  df.resolve(true);
                 },
                 function(tx, error)
                 {
                  //alert('error insertando bancos');
                    err=true;
                   df.reject(null);
                    ons.notification.alert({
                          message: 'Ocurrió un error Condicion de pago'+error.code+': '+error.message,title: 'Error'
                            });
                    //alert("Error processing SQL: "+error.code+" "+error.message);
                 }
            );  
        });

}




function insertBanks(bank){
 

 var df = $.Deferred();
 // alert('insertando bancos');
 dataBase.transaction(function(tx) {
            tx.executeSql('INSERT INTO DSC1 (country,branch,bankAcct,acctCode,acctName) VALUES(?,?,?,?,?)', 
                 [bank.Country,bank.Branch,bank.BankAcct,bank.AcctCode,bank.AcctName],
                 function(tx, results)
                 {

                    lastDocEntry=results.insertId;
                   
              		df.resolve(true);
                 },
                 function(tx, error)
                 {
                  //alert('error insertando bancos');
                    err=true;
  					       df.reject(null);
                    ons.notification.alert({
                          message: 'Ocurrió un error Bancos'+error.code+': '+error.message,title: 'Error'
                            });
                    //alert("Error processing SQL: "+error.code+" "+error.message);
                 }
            );  
        });

}




function insertBP(bp){
 

 var df = $.Deferred();
//alert('insertando');
 dataBase.transaction(function(tx) {
            tx.executeSql('INSERT INTO OCRD (cardCode,cardName,licTradNum,email,phone1, phone2,balance,contactCode, '
    +'paymentGroupNum,slpCode,address,mailAddress,priceList) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)', 
                 [bp.CardCode,bp.CardName,bp.LicTradNum,bp.Email,bp.Phone1,
                  bp.Phone2,0,bp.ContactCode,bp.PaymentGroupNum
                  ,bp.SplCode, bp.Address,bp.MailAddress,bp.PriceList],
                 function(tx, results)
                 {

                    lastDocEntry=results.insertId;
                   
              		df.resolve(true);
                 },
                 function(tx, error)
                 {
 
                    err=true;
  					df.reject(null);
                    ons.notification.alert({
                          message: 'Ocurrió un error BP '+error.code+': '+error.message,title: 'Error'
                            });
                    //alert("Error processing SQL: "+error.code+" "+error.message);
                 }
            );  
        });

}

}


SyncController.$inject = ["$scope", "$http", "$filter"];

oneApp.controller('SyncController', SyncController);