var ActivityController=function ($scope, $http, $filter,myService,visitService) {

var options = salesNavigator.getCurrentPage().options;
$scope.customer=options.activity.cardName;

ons.createPopover('views/activities/activityOptions.html').then(function(popover) {
      $scope.popover = popover;
       myService.setPopover($scope.popover);
    });


$scope.backActivities=function(){

 var options = salesNavigator.getCurrentPage().options;
 salesNavigator.replacePage('views/activities/activities.html');

  
};


$scope.newOrder=function(){

    var options = salesNavigator.getCurrentPage().options;
    order=new Order();
    order.cardName=options.activity.cardName;
    order.cardCode=options.activity.cardCode;
    var docDate=new Date();
    var mes=addZero(parseInt(docDate.getMonth())+1);
    var ano=docDate.getFullYear();
    var dia=addZero(docDate.getDate());
    docDate =ano+mes+dia;



    order.docDate=docDate;
    order.taxDate=docDate;
    order.objType="17";

    var myVisit=visitService.getVisit();
    
    //alert(myVisit);
    if (myVisit != null && typeof(myVisit) != 'undefined'){
    order.visit=visitService.getVisit();
    order.latitude=order.visit.location.latitude;
    order.longitude=order.visit.location.longitude;
    salesNavigator.pushPage('views/orders/newOrder.html', {order : order,form:'activity', activity:options.activity});
   } else{

        ons.notification.alert({
                          message: 'Debe iniciar la actividad para poder hacer un documento',title: 'Error'
                            });

   }
};
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

$scope.newPayment=function(){


    var options = salesNavigator.getCurrentPage().options;
    payment=new Payment();
    payment.cardName=options.activity.cardName;
    payment.cardCode=options.activity.cardCode;
    
    var docDate=new Date();
    var mes=addZero(parseInt(docDate.getMonth())+1);
    var ano=docDate.getFullYear();
    var dia=addZero(docDate.getDate());
    docDate =ano+mes+dia;

    payment.docDate=docDate;
    payment.taxDate=docDate;
    

    payment.objType="24";
    payment.payNoDoc='N';

      var myVisit=visitService.getVisit();
   // alert(myVisit);
    if (myVisit != null  && typeof(myVisit) != 'undefined')
    {
        payment.visit=visitService.getVisit();
        payment.latitude=myVisit.location.latitude;
        payment.longitude=myVisit.location.longitude;
        salesNavigator.pushPage('views/payments/newPayment.html', {payment : payment,form:'activity', activity:options.activity});
    }
    
    else{

          ons.notification.alert({
                          message: 'Debe iniciar la actividad para poder hacer un documento',title: 'Error'
                            });
}
    //alert(order.lines.length);


};


$scope.showBP=function(){

    var options = salesNavigator.getCurrentPage().options;

     salesNavigator.pushPage('views/bp/customerDetail.html', {businessPartner : options.activity.businessPartner});
    //alert(order.lines.length);
};




}

ActivityController.$inject = ["$scope", "$http", "$filter","myService","visitService"];

oneApp.controller('ActivityController', ActivityController);


var ActController=function ($scope, $http, $filter,myService,visitService) {


var visit=new Visit();

$scope.startActivity =function(){

    $scope.popover = myService.getPopover();    
     $scope.value=0;
    navigator.geolocation.getCurrentPosition(onSuccess, onError,{ enableHighAccuracy: true });

    $scope.popover.hide();

}

var onSuccess = function(position) {
 
 

        /* alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n'); */
        
        visit.location=new Location();
        visit.location.latitude=position.coords.latitude; 
        visit.location.longitude=position.coords.longitude; 
        visit.location.accuracy=position.coords.accuracy; 
        visit.location.altitudeAccuracy=position.coords.altitudeAccuracy; 
        visit.location.heading=position.coords.heading; 
        visit.location.speed=position.coords.speed; 
        visit.location.timestamp=position.coords.timestamp; 

        var date = new Date(); 
        visit.hour=date.getHours();;
        visit.seconds=addZero(date.getSeconds());;
        visit.minutes=addZero(date.getMinutes());
        visit.date=date;
        visitService.setVisit(visit);
       //alert(visit.hour+":"+visit.minutes+":"+visit.seconds);
       
       
    var options = salesNavigator.getCurrentPage().options;

      //alert(visit.location.latitude);
      dataBase.transaction(function(tx) {
            tx.executeSql('INSERT INTO VISIT (idActividad,date,latitude, '
            +'longitude,beginTime,altitude,accuracy,altitudeAccuracy,heading,speed,timestamp)'
            +' VALUES(?,?,?,?,?,?,?,?,?,?,?)', 
                 [options.activity.id,visit.date,visit.location.latitude,visit.location.longitude,
                  visit.hour+":"+visit.minutes+":"+visit.seconds,
                  visit.location.altitude,visit.location.accuracy,visit.location.altitudeAccuracy
                  ,visit.location.heading,visit.location.speed,visit.location.timestamp],
                 function(tx, results)
                 {

                    lastDocEntry=results.insertId;
                     // results is a http://dev.w3.org/html5/webdatabase/#sqlresultset .  
                    //  It has insertId, rowsAffected, and rows, which is
                   //   essentially (not exactly) an array of arrays. 
                  //    alert(lastDocEntry);
                   visit.id=lastDocEntry;
                 },
                 function(tx, error)
                 {

                    err=true;

                    ons.notification.alert({
                          message: 'Ocurrió un error'+error.code+': '+error.message,title: 'Error'
                            });
                    //alert("Error processing SQL: "+error.code+" "+error.message);
                 }
            );  
        });



ons.notification.alert({
                          message: 'Actividad Iniciada',title: 'Información'
                            });



};

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}


$scope.closeActivity =function(){

    $scope.popover = myService.getPopover();    
   // prompt(true);
    $scope.popover.hide();
      
        var date = new Date(); 
        visit.hourEnd=date.getHours();
        visit.secondsEnd=addZero(date.getSeconds());;
        visit.minutesEnd=addZero(date.getMinutes());
        var endTime=visit.hourEnd+":"+visit.minutesEnd+":"+visit.secondsEnd ;
        //alert(endTime);
        var query='UPDATE VISIT SET endTime=? where id=?';
        //alert(query);
          dataBase.transaction(function(tx) {
            tx.executeSql(query
            , 
                 [
                endTime,visit.id
                  ],
                 function(tx, results)
                 {

                    //lastDocEntry=results.insertId;
                     // results is a http://dev.w3.org/html5/webdatabase/#sqlresultset .  
                    //  It has insertId, rowsAffected, and rows, which is
                   //   essentially (not exactly) an array of arrays. 
                  //    alert(lastDocEntry);
                  // visit.id=lastDocEntry;
                 },
                 function(tx, error)
                 {

                    err=true;

                    ons.notification.alert({
                          message: 'Ocurrió un error'+error.code+': '+error.message,title: 'Error'
                            });
                    //alert("Error processing SQL: "+error.code+" "+error.message);
                 }
            );  
        });



  }


 function prompt(material) {
    var mod = material ? 'material' : undefined;
    ons.notification.prompt({
      message: "Comentario",
      modifier: mod,
      callback: function(age) {
        ons.notification.alert({
          message: 'You are ' + parseInt(age || 0) + ' years old.',
          modifier: mod
        });
      }
    });
  }




}

ActController.$inject = ["$scope", "$http", "$filter","myService","visitService"];

oneApp.controller('ActController', ActController);



oneApp.service("myService", function(){
  var sharedPopover

  var setPopover = function(pop){
    sharedPopover = pop;
  };

  var getPopover = function(){
    return sharedPopover;
  };

  return {
    setPopover: setPopover,
    getPopover: getPopover,
  };
  });


oneApp.service("visitService", function(){
  var sharedVisit

  var setVisit = function(visit){
    sharedVisit = visit;
  };

  var getVisit = function(){
    return sharedVisit;
  };

  return {
    setVisit: setVisit,
    getVisit: getVisit,
  };
  });


