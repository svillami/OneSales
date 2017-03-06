var PendingDocsController=function ($scope, $http, $filter) {


$scope.save= function(){

var options = salesNavigator.getCurrentPage().options;
salesNavigator.pushPage('views/payments/addPaidToDatePayment.html', {payment : options.payment});

}

$scope.selectedDocuments = function(index) {
     var selectedItem = $scope.documents[index];

var i=0;
var posIten=0;

var options = salesNavigator.getCurrentPage().options;

     for (indice in options.payment.invoices)//articulosSelecionados) 
     {
  
    //if (articulosSelecionados[indice].itemCode==selectedItem.itemCode)
        if (options.payment.invoices[indice].docEntry==selectedItem.docEntry)
    {
      //alert(articulosSelecionados[indice].itemName);
          //  alert(options.order.lines[indice].dscription);
      i++;
      posIten=indice;
    }
  
   }
  if (i==0){    
      //alert('insertando' + selectedItem.docEntry);

     
       // alert('insertando' + orderLine.itemCode);
       
        options.payment.invoices.push(selectedItem);
        

    //articulosSelecionados.push(selectedItem);
  }
  else{

    // alert('borrando' + selectedItem.docEntry);
    // articulosSelecionados.splice(posIten, 1);
         options.payment.invoices.splice(posIten, 1);
       //  alert('borrando' + selectedItem.itemCode);
  }
//alert( options.payment.invoices.length);
  /*

  for (indice in articulosSelecionados) 
     {
      alert(articulosSelecionados[indice].itemCode);
     }*/
      
      //$data.selectedItem = selectedItem;

      //alert('prueba');
     //alert(selectedItem.cardCode);
     //salesNavigator.pushPage('views/orders/newOrder.html', {businessPartner : selectedItem});
    };



var documents=new Array();

dataBase.transaction(selectRecords, errorInQuery, successResults);

function selectRecords(tx)
{
  var options = salesNavigator.getCurrentPage().options;

    tx.executeSql('SELECT * FROM OINV T0, INV1 T1 WHERE T0.docEntry=T1.docEntry AND T0.docStatus="O" AND cardCode=? AND (docTotal-PaidToDate)<>0', [options.payment.cardCode], successResults,errorInQuery);
}
 
function successResults(tx,results)
{
    
   var nLength = results.rows.length;
       
        //alert(nLength);
       for(var c=0;c<nLength;c++){
        
		    // alert(results.rows.item(c).itemCode);
		     var doc = new Document();
         doc.docEntry=results.rows.item(c).docEntry;
         doc.cardCode=results.rows.item(c).cardCode;
		     doc.cardName=results.rows.item(c).cardName;
         doc.docTotal=results.rows.item(c).docTotal;
		     doc.vatSum=results.rows.item(c).vatSum;
         doc.docDate=results.rows.item(c).docDate;
         doc.discountPercent=results.rows.item(c).discountPercent;
		     doc.comments=results.rows.item(c).Comments;
         doc.pending=parseFloat(results.rows.item(c).docTotal)-parseFloat(results.rows.item(c).paidToDate);
         doc.paidToDate=parseFloat(results.rows.item(c).paidToDate);
        // alert(results.rows.item(c).docDate);
		     // alert(item.itemCode+ ' ' + item.itemName +'stock '+results.rows.item(c).stock);
			
     /*this.docEntry;
    this.cardCode="";
    this.cardName="";
    this.docDate;
    this.taxDate; 
    this.baseImp=0;
    this.docTotal=0;
    this.docStatus;
    this.vatSum=0;
    this.discount=0;
    this.discountPercent=0;
    this.comments="";*/






      documents.push(doc);



	
        }
        
    $scope.documents=documents;
    $scope.$apply();
    
}

function errorInQuery(tx,error)
{
    
    alert(error.message); 
//alert(JSON.stringify(results));
      
} 




}

PendingDocsController.$inject = ["$scope", "$http", "$filter"];

oneApp.controller('PendingDocsController', PendingDocsController);
