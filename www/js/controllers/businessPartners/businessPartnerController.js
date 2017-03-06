var BusinessPartnerController=function ($scope, $http, $filter) {

    


    $scope.divBP = true;
    $scope.filtros = false;
    $scope.showDetail = function(index) {
     var selectedItem = $scope.businessPartners[index];
      //$data.selectedItem = selectedItem;

      // alert('prueba');
      //alert(selectedItem.itemCode);


      //getData();

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

BusinessPartnerController.$inject = ["$scope", "$http", "$filter"];

oneApp.controller('BusinessPartnerController', BusinessPartnerController
  );
