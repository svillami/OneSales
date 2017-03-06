var AddQtyItemsController=function ($scope, $http, $filter) {

    var options = salesNavigator.getCurrentPage().options;
    //$scope.items=options.items;

    $scope.items=options.order.lines;
    
    
    //$scope.$apply();
   //alert(options.items.length);
    $scope.increaseItem = function(item) {
		
		//alert(item.itemCode);
		//alert(item.quantity);
    	//alert(parseInt(item.quantity)+1);

    	var qty=parseFloat(item.quantity)+1;

    
    	item.quantity=qty;
        item.lineTotal=parseFloat(item.quantity)*parseFloat(item.price);
        item.vatSum= parseFloat(item.lineTotal)*(parseFloat(item.rate)/100);
		// alert(item.vatSum);
   	    $scope.quantity=qty;

        var baseImp=0;
        var vatSum=0;
        calcBaseImp();
        /*for (indice in $scope.items){

       
          baseImp=parseFloat(baseImp)+parseFloat($scope.items[indice].lineTotal);
          
          vatSum=parseFloat(vatSum)+
         
          ((parseFloat($scope.items[indice].lineTotal))*(parseFloat($scope.items[indice].rate)/100))
         
        }

        item.baseImp=baseImp;
        //alert(item.baseImp);
        $scope.baseImp=baseImp +' '+ item.currency;
        $scope.vatSum=vatSum +' '+ item.currency;
        $scope.docTotal=(parseFloat(baseImp)+parseFloat(vatSum))+' '+ item.currency;*/
       // alert($scope.baseImp);
    };


function calcBaseImp(){ 
  try{
    var options = salesNavigator.getCurrentPage().options;
    $scope.baseImp=baseImp=1;

        var baseImp=0;
        var vatSum=0;
        var currency=''; 
        for (indice in $scope.items){

       
          baseImp=parseFloat(baseImp)+parseFloat($scope.items[indice].lineTotal);
          vatSum=parseFloat(vatSum)+

          ((parseFloat($scope.items[indice].lineTotal))*(parseFloat($scope.items[indice].rate)/100))
          currency=$scope.items[indice].currency;
        }



        $scope.baseImp=baseImp +' '+ currency;
        $scope.vatSum=vatSum +' '+ currency;
        var docTotal=(parseFloat(baseImp)+parseFloat(vatSum));
     
        //docTotal=formatoNumero(docTotal,2,',','.');
     
        $scope.docTotal=docTotal+' '+ currency;



        options.order.currency=currency;
        options.order.docTotal=docTotal;
        options.order.baseImp=baseImp +' '+ currency;
        options.order.vatSum=vatSum +' '+ currency;

      }catch(err){}
      };

$scope.orderItemDetails = function(index,item) {
		//alert(index);
		//alert(item.itemCode);

          var options = salesNavigator.getCurrentPage().options;
		 salesNavigator.pushPage('views/orders/orderItemDetails.html', {item : item,order : options.order});
		//
		//alert(item.quantity);
    	//alert(parseInt(item.quantity)+1);

    	
    };

    $scope.decreaseItem = function(item) {

    	//alert(item.itemCode);
		//alert(item.quantity);
    	//alert(parseInt(item.quantity)-1);

    	var qty=parseFloat(item.quantity)-1;
    	if (qty<1){
    		qty=1;
    	}
    	item.quantity=qty;
        item.lineTotal=parseFloat(item.quantity)*parseFloat(item.price);
        item.vatSum= parseFloat(item.lineTotal)*(parseFloat(item.rate)/100);

		//alert(item.quantity);
   	    $scope.quantity=qty;
        calcBaseImp();
        /*var baseImp=0;
        var vatSum=0;
        for (indice in $scope.items){

       
          baseImp=parseFloat(baseImp)+parseFloat($scope.items[indice].lineTotal);
        vatSum=parseFloat(vatSum)+
         
          ((parseFloat($scope.items[indice].lineTotal))*(parseFloat($scope.items[indice].rate)/100))
        }

        item.baseImp=baseImp;
        $scope.baseImp=baseImp +' '+ item.currency;
        $scope.docTotal=(parseFloat(baseImp)+parseFloat(vatSum))+' '+ item.currency;
        */
    };

    $scope.lineItemPrice = function(item) {

        //alert(item.itemCode);
        //alert(item.quantity);
        //alert(parseInt(item.quantity)-1);

        var qty=parseFloat(item.quantity);
        //alert(qty);
        if (qty<1){
            qty=1;
        }

      
        item.quantity=qty;
        item.lineTotal=parseFloat(item.quantity)*parseFloat(item.price);
         item.vatSum= parseFloat(item.lineTotal)*(parseFloat(item.rate)/100);
        //alert(item.quantity);
        $scope.quantity=qty;
        calcBaseImp();
        /*var baseImp=0;
        var vatSum=0;
        for (indice in $scope.items){

       
          baseImp=parseFloat(baseImp)+parseFloat($scope.items[indice].lineTotal);
          vatSum=parseFloat(vatSum)+

          ((parseFloat($scope.items[indice].lineTotal))*(parseFloat($scope.items[indice].rate)/100))
        }

        item.baseImp=baseImp;
        //alert(item.baseImp);
        $scope.baseImp=baseImp +' '+ item.currency;
        $scope.vatSum=vatSum +' '+ item.currency;
        $scope.docTotal=(parseFloat(baseImp)+parseFloat(vatSum))+' '+ item.currency;
        */
    };

$scope.getBaseImp = function() {

try{
        var options = salesNavigator.getCurrentPage().options;
        $scope.baseImp=baseImp=1;

        var baseImp=0;
        var vatSum=0;
        var currency=''; 
        for (indice in $scope.items){

       
          baseImp=parseFloat(baseImp)+parseFloat($scope.items[indice].lineTotal);
          vatSum=parseFloat(vatSum)+

          ((parseFloat($scope.items[indice].lineTotal))*(parseFloat($scope.items[indice].rate)/100))
          currency=$scope.items[indice].currency;
        }

        $scope.baseImp=baseImp +' '+ currency;
        $scope.vatSum=vatSum +' '+ currency;
        var docTotal=(parseFloat(baseImp)+parseFloat(vatSum))+' '+ currency;
        $scope.docTotal=docTotal


        options.order.docTotal=docTotal;
        options.order.baseImp=baseImp +' '+ currency;
        options.order.vatSum=vatSum +' '+ currency;
   }catch(err){}
      };

$scope.saveOrderLines = function() {

      var options = salesNavigator.getCurrentPage().options;
      options.order.qtyItems=0;
var error=false;
       for (indice in options.order.lines){

       
       if (isNaN(options.order.lines[indice].quantity)){

        error =true;
       }
      /* alert(options.order.lines[indice].itemCode);
       alert(options.order.lines[indice].dscription);
       alert(options.order.lines[indice].price);
       alert(options.order.lines[indice].lineTotal);
       alert(options.order.lines[indice].vatSum);
       alert(options.order.lines[indice].quantity);*/
         options.order.qtyItems=options.order.qtyItems+options.order.lines[indice].quantity;
        }

if (error==false){
    salesNavigator.replacePage('views/orders/newOrder.html', {order : options.order});
       }
       else{

 ons.notification.alert({
                          message: 'Los articulos deben tener candidad',title: 'Error'
                            });

       }
      };


$scope.addMoreItems = function() {

    var options = salesNavigator.getCurrentPage().options;
      

    salesNavigator.replacePage('views/orders/selectItems.html', {order : options.order});
       
      };


function formatoNumero(numero, decimales, separadorDecimal, separadorMiles) {
    var partes, array;

    if ( !isFinite(numero) || isNaN(numero = parseFloat(numero)) ) {
        return "";
    }
    if (typeof separadorDecimal==="undefined") {
        separadorDecimal = ",";
    }
    if (typeof separadorMiles==="undefined") {
        separadorMiles = "";
    }

    // Redondeamos
    if ( !isNaN(parseInt(decimales)) ) {
        if (decimales >= 0) {
            numero = numero.toFixed(decimales);
        } else {
            numero = (
                Math.round(numero / Math.pow(10, Math.abs(decimales))) * Math.pow(10, Math.abs(decimales))
            ).toFixed();
        }
    } else {
        numero = numero.toString();
    }

    // Damos formato
    partes = numero.split(".", 2);
    array = partes[0].split("");
    for (var i=array.length-3; i>0 && array[i-1]!=="-"; i-=3) {
        array.splice(i, 0, separadorMiles);
    }
    numero = array.join("");

    if (partes.length>1) {
        numero += separadorDecimal + partes[1];
    }

    return numero;
}


}

AddQtyItemsController.$inject = ["$scope", "$http", "$filter"];

oneApp.controller('AddQtyItemsController', AddQtyItemsController);
