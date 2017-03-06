function abrirBaseDatos(device){

var dataBase;

 if(device.platform=="Android")
 {
      dataBase =  window.openDatabase("OneSalesDB", "1.0", "OneSalesDB",'');
    //dataBase= window.sqlitePlugin.openDatabase({name: 'OneSalesDB.db',location: 'default'});      
 }
 else{

  dataBase =  window.openDatabase("OneSalesDB", "1.0", "OneSalesDB",'');
  //dataBase = window.sqlitePlugin.openDatabase({name: 'OneSalesDB.db',location: 'default'});
 }

return dataBase;
}


function cerrarBaseDatos(db){

db.close(successcb, errorcb);

}

function successcb() 
{}

function errorcb() 
{}

function createTables(db){

alert('creando tablas');
db.transaction(createSchema, errorInSchema, successInSchema);

insertTestData(db);

//getItems1(db);
}

function createSchema(tx) 
{

 tx.executeSql('DROP TABLE IF EXISTS OITM');
 tx.executeSql('DROP TABLE IF EXISTS OWHS');
 tx.executeSql('DROP TABLE IF EXISTS ITM1');
 tx.executeSql('DROP TABLE IF EXISTS OITW');
 tx.executeSql('DROP TABLE IF EXISTS OITB');
 tx.executeSql('DROP TABLE IF EXISTS OMRC');
 tx.executeSql('DROP TABLE IF EXISTS OUOM');
 tx.executeSql('DROP TABLE IF EXISTS OCRD');
 tx.executeSql('DROP TABLE IF EXISTS CRD1');
 tx.executeSql('DROP TABLE IF EXISTS OCTG');
 tx.executeSql('DROP TABLE IF EXISTS OCPR');
 tx.executeSql('DROP TABLE IF EXISTS ORDR');
 tx.executeSql('DROP TABLE IF EXISTS RDR1');
 tx.executeSql('DROP TABLE IF EXISTS OSTC');
 tx.executeSql('DROP TABLE IF EXISTS DSC1');
 tx.executeSql('DROP TABLE IF EXISTS OINV');
 tx.executeSql('DROP TABLE IF EXISTS INV1');
 tx.executeSql('DROP TABLE IF EXISTS OCLG');
 tx.executeSql('DROP TABLE IF EXISTS VISIT');
 tx.executeSql('DROP TABLE IF EXISTS ORCT');
 tx.executeSql('DROP TABLE IF EXISTS RCT2');
 tx.executeSql('DROP TABLE IF EXISTS RCT1');
 tx.executeSql('DROP TABLE IF EXISTS OUSR');



// inicio tablas de articulos almacen y precios //

tx.executeSql('CREATE TABLE IF NOT EXISTS OITM(itemCode TEXT '+
  'PRIMARY KEY ,itemName TEXT,groupCode TEXT,firmCode TEXT,salesUnit TEXT,salesUnitCode TEXT,salesUnitQty REAL,barCode TEXT,active TEXT,taxCodeAr TEXT,whsCode TEXT)');
tx.executeSql('CREATE TABLE IF NOT EXISTS OITB(id INTEGER PRIMARY KEY AUTOINCREMENT,groupCode TEXT '+
  ',groupName TEXT)');

tx.executeSql('CREATE TABLE IF NOT EXISTS OWHS(whsCode TEXT PRIMARY KEY ,whsName TEXT)');
tx.executeSql('CREATE TABLE IF NOT EXISTS OITW(itemCode TEXT,whsCode TEXT,onHand REAL,isCommited REAL)');
tx.executeSql('CREATE TABLE IF NOT EXISTS ITM1(id INTEGER PRIMARY KEY AUTOINCREMENT,itemCode TEXT,priceList TEXT,'
  +' price REAL, currency TEXT, priceListName TEXT)');
tx.executeSql('CREATE TABLE IF NOT EXISTS OMRC(id INTEGER PRIMARY KEY AUTOINCREMENT,firmCode TEXT,firmName TEXT)');
tx.executeSql('CREATE TABLE IF NOT EXISTS OUON(id INTEGER PRIMARY KEY AUTOINCREMENT,salesUnitCode TEXT,salesUnit TEXT)');
tx.executeSql('CREATE TABLE IF NOT EXISTS OSTC(id INTEGER PRIMARY KEY AUTOINCREMENT,taxCode TEXT,rate REAL)');


// fin tablas de articulos almacen y precios //


// inicio tablas de socio de negocio clientes
tx.executeSql('CREATE TABLE IF NOT EXISTS OCRD(cardCode TEXT PRIMARY KEY ,cardName TEXT, licTradNum TEXT ' +

  ', email TEXT, phone1 TEXT, phone2 TEXT, balance REAL, contactCode TEXT, paymentGroupNum TEXT,slpCode TEXT, address TEXT, mailAddress TEXT, priceList INTEGER)');

tx.executeSql('CREATE TABLE IF NOT EXISTS CRD1(id INTEGER PRIMARY KEY AUTOINCREMENT,cardCode TEXT,addressType TEXT, street TEXT ' +

  ', city TEXT, state TEXT, building TEXT, country TEXT,zipCode TEXT)');


tx.executeSql('CREATE TABLE IF NOT EXISTS OCTG(id INTEGER PRIMARY KEY AUTOINCREMENT,paymentGroupNum TEXT,pymntGroup TEXT)');

tx.executeSql('CREATE TABLE IF NOT EXISTS OCPR(id INTEGER PRIMARY KEY AUTOINCREMENT,contactCode TEXT,contactName TEXT,position TEXT, phone1 TEXT)');

// fin tablas de socio de negocio clientes

// inicio tablas de pedido

tx.executeSql('CREATE TABLE IF NOT EXISTS ORDR(docEntry INTEGER PRIMARY KEY AUTOINCREMENT,objType TEXT,cardCode TEXT,cardName TEXT, '
  +
  'docDate TEXT,taxDate TEXT,comments TEXT,docTotal REAL,discountPercent REAL, VatSum REAL , docStatus TEXT,idVisit INTEGER,latitude TEXT,longitude TEXT)');


tx.executeSql('CREATE TABLE IF NOT EXISTS RDR1(docEntry INTEGER ,lineNum INTEGER,itemCode TEXT,dscription TEXT,  '
  +
  'quantity REAL,price REAL,taxCode TEXT,vatSum REAL,discountPercent REAL, lineTotal REAL )');

// fin tablas de pedidos


// tablas de pagos // 

tx.executeSql('CREATE TABLE IF NOT EXISTS DSC1(id INTEGER PRIMARY KEY AUTOINCREMENT,country TEXT,branch TEXT,'
  +
  'bankAcct TEXT,acctCode TEXT,acctName TEXT , bankCode TEXT)');


tx.executeSql('CREATE TABLE IF NOT EXISTS ORCT(docEntry INTEGER PRIMARY KEY AUTOINCREMENT,objType TEXT,cardCode TEXT,cardName TEXT,'
  +'payNoDoc TEXT,docDate TEXT, reference TEXT,'
  +'cashSum REAL,checkSum REAL, transferSum REAL, cashAcct TEXT, transferAcct TEXT, comments TEXT, docTotal REAL,payNoDocSum REAL,latitude TEXT, longitude TEXT, transferDate TEXT,transferRef TEXT,idVisit INTEGER)');


tx.executeSql('CREATE TABLE IF NOT EXISTS RCT2(paymentId INTEGER ,invoiceId INTEGER,sumApplied REAL)');

tx.executeSql('CREATE TABLE IF NOT EXISTS RCT1(checkID INTEGER PRIMARY KEY AUTOINCREMENT,paymentId INTEGER , checkSum REAL,checkNum TEXT, checkAcct TEXT, checkBankAcct TEXT)');

// tabla de facturas

tx.executeSql('CREATE TABLE IF NOT EXISTS OINV(docEntry INTEGER PRIMARY KEY AUTOINCREMENT,objType TEXT,cardCode TEXT,cardName TEXT, '
  +
  'docDate TEXT,taxDate TEXT,comments TEXT,docTotal REAL,discountPercent REAL, VatSum REAL , docStatus TEXT, paidToDate REAL)');


tx.executeSql('CREATE TABLE IF NOT EXISTS INV1(docEntry INTEGER ,lineNum INTEGER,itemCode TEXT,dscription TEXT,  '
  +
  'quantity REAL,price REAL,taxCode TEXT,vatSum REAL,discountPercent REAL, lineTotal REAL )');




// fin tabla de facturas
 


// tabla de visitas actividad

tx.executeSql('CREATE TABLE IF NOT EXISTS OCLG(id INTEGER PRIMARY KEY AUTOINCREMENT,'
  +'cardCode TEXT, type TEXT,action TEXT,beginDate TEXT,slpCode TEXT,'
  +'cardName TEXT,beginTime TEXT,endTime TEXT,priority TEXT,address TEXT,'
  +'addressLat TEXT,addressLong TEXT,repeatOptions TEXT, interval TEXT, subObtion TEXT, monday TEXT,tuesday TEXT,wednesday TEXT,'
  +'thursday TEXT,friday TEXT,saturday TEXT,sunday TEXT , dayInMonth TEXT, week TEXT, dayOfWeek TEXT)');


tx.executeSql('CREATE TABLE IF NOT EXISTS VISIT(id INTEGER PRIMARY KEY AUTOINCREMENT ,idActividad INTEGER,date TEXT,latitude TEXT,  '
  +
  'longitude TEXT,beginTime TEXT,endTime TEXT,altitude TEXT, accuracy TEXT,altitudeAccuracy TEXT,'
  +'heading TEXT,speed TEXT,timestamp TEXT,comments TEXT  )');


// TABLAS DE usuarios

tx.executeSql('CREATE TABLE IF NOT EXISTS OUSR(id INTEGER PRIMARY KEY AUTOINCREMENT,userCode TEXT,userName TEXT,password TEXT, '
  +
  'accessType TEXT, company TEXT)');



}


 
function errorInSchema()
{
 console.log("Error to create schema");
 alert("Error to create schema");
}
 
function successInSchema()
{
 console.log("Schema creation successful");
}


function insertTestData(db){
  alert('creando data');
  db.transaction(insertRecord, errorInsert, SuccessInsert);
 
 }
function insertRecord(tx)
{
    alert('insertando data de prueba');

// insertando impuestos

  tx.executeSql('INSERT INTO OSTC (taxCode,rate) '+
      ' VALUES("IVA",12)',[],SuccessInsert,errorInsert);


  tx.executeSql('INSERT INTO OSTC (taxCode,rate) '+
      ' VALUES("IVA_EXE",0)',[],SuccessInsert,errorInsert);

// insertando fabricantes
   tx.executeSql('INSERT INTO OMRC (firmCode,firmName) '+
      ' VALUES("1","Lenovo Computer")',[],SuccessInsert,errorInsert);


   tx.executeSql('INSERT INTO OMRC (firmCode,firmName) '+
      ' VALUES("2","HP Computer")',[],SuccessInsert,errorInsert);


// insertando grupos

   tx.executeSql('INSERT INTO OITB (groupCode,groupName) '+
      ' VALUES("1","Equipos de Computación")',[],SuccessInsert,errorInsert);


// insertando articulos
    tx.executeSql('INSERT INTO OITM (itemCode,itemName,groupCode,barCode,active, firmCode,salesUnit,salesUnitQty,taxCodeAr,whsCode) '+
      ' VALUES("A0001","Lenovo computer G01","1","00001","Y","1","Unidad","1","IVA","01")',[],SuccessInsert,errorInsert);
   
    tx.executeSql('INSERT INTO OITM (itemCode,itemName,groupCode,barCode,active, firmCode,salesUnit,salesUnitQty,taxCodeAr,whsCode) '+
      ' VALUES("A0002","HP computer Ml10","1","00001","Y","2","Unidad","1","IVA","02")',[],SuccessInsert,errorInsert);
    
  // insertando almacenes
    tx.executeSql('INSERT INTO OWHS (whsCode,whsName) '+
      ' VALUES("01","Almacen 01")',[],SuccessInsert,errorInsert);


    tx.executeSql('INSERT INTO OWHS (whsCode,whsName) '+
      ' VALUES("02","Almacen 02")',[],SuccessInsert,errorInsert);


  // insertando stock

    tx.executeSql('INSERT INTO OITW (itemCode,whsCode,onHand,isCommited) '+
      ' VALUES("A0001","01","5","0")',[],SuccessInsert,errorInsert);

        tx.executeSql('INSERT INTO OITW (itemCode,whsCode,onHand,isCommited) '+
      ' VALUES("A0001","02","3","0")',[],SuccessInsert,errorInsert);



        tx.executeSql('INSERT INTO OITW (itemCode,whsCode,onHand,isCommited) '+
      ' VALUES("A0002","01","10","0")',[],SuccessInsert,errorInsert);

        tx.executeSql('INSERT INTO OITW (itemCode,whsCode,onHand,isCommited) '+
      ' VALUES("A0002","02","1","0")',[],SuccessInsert,errorInsert);

  // insertando listas de precios

  tx.executeSql('INSERT INTO ITM1 (itemCode,priceList,price,currency,priceListName) '+
      ' VALUES("A0001","1","200.000","Bs","Base")',[],SuccessInsert,errorInsert);

  tx.executeSql('INSERT INTO ITM1 (itemCode,priceList,price,currency,priceListName) '+
      ' VALUES("A0001","2","190.000","Bs","Descuento")',[],SuccessInsert,errorInsert);


  tx.executeSql('INSERT INTO ITM1 (itemCode,priceList,price,currency,priceListName) '+
      ' VALUES("A0002","1","250.000","Bs","Base")',[],SuccessInsert,errorInsert);

// insertando socios de negocios





  tx.executeSql('INSERT INTO OCTG (paymentGroupNum,pymntGroup) '+
      ' VALUES("1","Contado")',[],SuccessInsert,errorInsert);


  tx.executeSql('INSERT INTO OCTG (paymentGroupNum,pymntGroup) '+
      ' VALUES("2","Credito")',[],SuccessInsert,errorInsert);


tx.executeSql('INSERT INTO OCPR (contactCode,contactName,position,phone1) '+
      ' VALUES("1","Orlando","Presidente","0412-2222469")',[],SuccessInsert,errorInsert);


tx.executeSql('INSERT INTO OCPR (contactCode,contactName,position,phone1) '+
      ' VALUES("2","Prueba","Presidente","0412-2222469")',[],SuccessInsert,errorInsert);


  tx.executeSql('INSERT INTO OCRD (cardCode,cardName,licTradNum,email,phone1, phone2,balance,contactCode, '
    +'paymentGroupNum,slpCode,address,mailAddress,priceList) '+
      ' VALUES("C000001","IDA SOFTWARE SOLUTIONS C.A","J-401329969","orauseo@softwareida.com",' +
      ' "2342142","2153184","0","1","1","1","Los Ruices Centro Empresarial Miranda ", '+
      ' "Los Ruices Centro Empresarial Miranda","2")',[],SuccessInsert,errorInsert);


 tx.executeSql('INSERT INTO OCRD (cardCode,cardName,licTradNum,email,phone1, phone2,balance,contactCode, '
    +'paymentGroupNum,slpCode,address,mailAddress,priceList) '+
      ' VALUES("C000002","LA CASA DE LA CANA C.A","J-999999999","lcdlc@lcdlc.com",' +
      ' "2342142","2153184","0","2","2","1","Pto. la cruz ", '+
      ' "Pto. la cruz","1")',[],SuccessInsert,errorInsert);





 tx.executeSql('INSERT INTO CRD1 (cardCode,addressType,street,city,state, building,country,zipCode) '+
      ' VALUES("C000001","S","Av. Francisco Miranda","caracas",' +
      ' "Miranda","Centro Empresarial Miranda","Venezuela","1071")',[],SuccessInsert,errorInsert);

 tx.executeSql('INSERT INTO CRD1 (cardCode,addressType,street,city,state, building,country,zipCode) '+
      ' VALUES("C000002","S","Guaragua","Pto. La Cruz",' +
      ' "Anzuategui","lcdlc","Venezuela","1071")',[],SuccessInsert,errorInsert);



 tx.executeSql('INSERT INTO DSC1 (country,branch,bankAcct,acctCode,acctName) '+
      ' VALUES("VE","1","12345678901234567890","123456",' +
      ' "Banesco")',[],SuccessInsert,errorInsert);

  tx.executeSql('INSERT INTO DSC1 (country,branch,bankAcct,acctCode,acctName) '+
      ' VALUES("VE","1","98345678901247567662","654321",' +
      ' "Mercantil")',[],SuccessInsert,errorInsert);

   tx.executeSql('INSERT INTO DSC1 (country,branch,bankAcct,acctCode,acctName) '+
      ' VALUES("VE","1","09876543213456789065","987654",' +
      ' "BOD")',[],SuccessInsert,errorInsert);


 tx.executeSql('INSERT INTO OINV (objType,cardCode,cardName, '
            +'docDate,taxDate,comments,docTotal,discountPercent,VatSum,docStatus,paidToDate) '
            +'VALUES("13","C000001","IDA SOFTWARE SOLUTIONS" '
              +',"20160505","20160505","SERVICIOS","200000","0","24000","O",0)',[],SuccessInsert,errorInsert);


 tx.executeSql('INSERT INTO INV1 (docEntry,lineNum,itemCode,dscription,'
            +'quantity,price,taxCode,vatSum,discountPercent,lineTotal) VALUES(1,1,"A0001","Lenovo computer G01","100000","200","IVA","24000",0,"200000")',[],SuccessInsert,errorInsert);



tx.executeSql('INSERT INTO OINV (objType,cardCode,cardName, '
            +'docDate,taxDate,comments,docTotal,discountPercent,VatSum,docStatus,paidToDate) '
            +'VALUES("13","C000001","IDA SOFTWARE SOLUTIONS" '
              +',"20160505","20160505","SERVICIOS","100000","0","12000","O",0)',[],SuccessInsert,errorInsert);


 tx.executeSql('INSERT INTO INV1 (docEntry,lineNum,itemCode,dscription,'
            +'quantity,price,taxCode,vatSum,discountPercent,lineTotal) VALUES(2,2,"A0001","Lenovo computer G01","50000","200","IVA","12000",0,"100000")',[],SuccessInsert,errorInsert);


tx.executeSql('INSERT INTO OCLG (cardCode,type,action,beginDate,'
            +'slpCode,cardName,beginTime,endTime,priority,address,'
            +'repeatOptions) '
            +' VALUES("C000001","Visita","Visita","20160511","1","IDA SOFTWARE SOLUTIONS","8:00","9:00","Alta","Los Ruices","Diaria")',[],SuccessInsert,errorInsert);



 tx.executeSql('INSERT INTO OCLG (cardCode,type,action,beginDate,'
            +'slpCode,cardName,beginTime,endTime,priority,address,'
            +'repeatOptions) '
            +' VALUES("C000002","Visita","Visita","20160511","1","LA CASA DE LA CANA","10:00","11:00","Alta","Las Mercedes","Diaria")',[],SuccessInsert,errorInsert);



 

   alert('creo la base de datos y data');
}
 
function SuccessInsert(tx,result){
        // alert("Last inserted ID = " + result.insertId);
}
 
function errorInsert(error){
    alert("Error processing SQL: "+error.code+" "+error.message);
}







/*var items=new Array();
function getItems1(db){

dataBase.transaction(selectRecords, errorInQuery, successResults);
//var item = new Item('0001','lenovo');
 //alert(item.itemCode+ ' ' + item.itemName);


}



 
function selectRecords(tx)
{
    tx.executeSql('SELECT * FROM OITM', [], successResults,errorInQuery);
}
 
function successResults(tx,results){
        //    alert(JSON.stringify(results));
       // var sData = jquery.ParseJSON(results);
       // alert(sData);
        var nLength = results.rows.length;
        alert(nLength);
        for(var c=0;c<nLength;c++){
         // execute or place your desired statement

         alert(results.rows.item(c).itemCode);

    var item = new Item
    (results.rows.item(c).itemCode,
    results.rows.item(c).itemName,
    results.rows.item(c).active,
    results.rows.item(c).groupCode,
    results.rows.item(c).barCode);
      //alert(item.itemCode+ ' ' + item.itemName);

    items.push(item);




        }
    
for (indice in items) {
alert('array prueba'+items[indice].itemName);
}


    }


    function errorInQuery(tx,results){
        //    alert(JSON.stringify(results));
      
    }*/


/*

db.transaction(function(tx) {
   tx.executeSql('SELECT * FROM Drinks', 
                 [],
                 function(tx, results)
                 {
                   // results is a http://dev.w3.org/html5/webdatabase/#sqlresultset .  
                   // It has insertId, rowsAffected, and rows, which is
                   // essentially (not exactly) an array of arrays. 
                 },
                 function(tx, error)
                 {

                 }
   );
});


*/
