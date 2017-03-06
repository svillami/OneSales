function Item (itemCode,itemName,active,groupCode,barCode,firmCode,salesUnit,salesUnitQty,stock, price,currency, firmName,groupName, taxCode){

	//constructor(){
	
	this.itemCode=itemCode;
    this.itemName=itemName;
    this.active=active;
    this.groupCode=groupCode;
    this.barCode=barCode;
    this.salesUnit=salesUnit;
    this.firmCode=firmCode;
    this.salesUnitQty=salesUnitQty;
    this.stock=stock;
    this.price=price;
    this.currency=currency;
    this.firmName=firmName;
    this.groupName=groupName;
    this.quantity=1;
    this.taxCode=taxCode;
    this.rate=12;
    this.lineTotal=this.price;
    this.baseImp;
    this.whsCode;
    //}
}


 