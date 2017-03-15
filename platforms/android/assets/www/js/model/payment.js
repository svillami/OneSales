function Payment (){

    //constructor(){
    this.docEntry;
    this.cardCode="";
    this.cardName="";
    this.docDate;
    this.taxDate; 
    this.comments="";
    this.invoices=new Array();
    this.currency="";
    this.cashAcct;
    this.transferAcct;
    this.bankCashAcct;
     this.transferDate;
     this.transferRef;
    this.bankTransferAcct;
    this.bankCheckAcct;
    this.cashSum=0;
    this.transferSum=0;
    this.checkSum=0;
    this.payNoDoc;
    this.payNoDocSum=0;
    this.docTotal=0;
    this.appliedInvoiceSum=0;
    this.visit;
    this.latitude;
    this.longitude;
    this.pendingToPaid=0;
    this.checks=new Array();

    //}

    this.methods="";
    this.methodsDate;
    this.methodsAcct;
    this.methodsRef;
    this.methodsTotal=0;
}
