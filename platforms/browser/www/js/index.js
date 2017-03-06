// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints,
// and then run "window.location.reload()" in the JavaScript Console.

var dataBase;
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );

        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.

       // console.log('Orlando Rauseo Develper');

      

      
      /* if(device.platform=="Android")
        {
       
        db = window.openDatabase("OneSalesDB", "1.0", "OneSalesDB",'');
        //db = window.sqlitePlugin.openDatabase({name: 'OneSalesDB.db',location: 'default'});
       // db= window.sqlitePlugin.openDatabase({name: "OneSalesDBAndroid", androidDatabaseImplementation: 2});
      
        }
        
        else
        {

           db =   window.openDatabase("OneSalesDB", "1.0", "OneSalesDB",'');

           //db = window.sqlitePlugin.openDatabase({name: 'OneSalesDB.db',location: 'default'});

         }*/

dataBase=abrirBaseDatos(device);


//createTables(dataBase);
/*db.transaction(createSchema, errorInSchema, successInSchema);
 
function createSchema(tx) 
{
 tx.executeSql('DROP TABLE IF EXISTS OITM');
    //tx.executeSql('CREATE TABLE IF NOT EXISTS OITM(nID INTEGER PRIMARY KEY AUTOINCREMENT,sName TEXT)');
    //tx.executeSql('CREATE TABLE IF NOT EXISTS OITM(nID INTEGER PRIMARY KEY AUTOINCREMENT,sName TEXT)');
}
 
function errorInSchema()
{
   alert("Error to create schema");
}
 
function successInSchema()
{

   alert("Schema creation successful");
}*/




    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
} )();