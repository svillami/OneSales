var BusinessPartnerDetailController=function ($scope, $http, $filter) {

    $scope.getParams = function() { 
        var options = salesNavigator.getCurrentPage().options;
        return options.businessPartner ;
    };

    // Begin  MenuDocuments
    $scope.MenuDocuments = function() {

      var options = salesNavigator.getCurrentPage().options;
      salesNavigator.pushPage('views/bp/BpDocuments.html', {businessPartner : options.businessPartner});
    };
    //End MenuDocuments

}

BusinessPartnerDetailController.$inject = ["$scope", "$http", "$filter"];

oneApp.controller('BusinessPartnerDetailController', BusinessPartnerDetailController);




//////////////////////////////// Other controller /////////////////////////////////////////

var BusinessPartnerDocumentController=function ($scope, $http, $filter) {

    $scope.getParams = function() { 
    var options = salesNavigator.getCurrentPage().options;
    return options.businessPartner ;
    };

    //Begin showOrders
    $scope.showOrders = function() {
      
        var options = salesNavigator.getCurrentPage().options;
        salesNavigator.pushPage('views/bp/customerOrders.html', {businessPartner : options.businessPartner});
    };
    //End showOrders

    //Begin showInvoices
    $scope.showInvoices = function() {
       var options = salesNavigator.getCurrentPage().options;
        salesNavigator.pushPage('views/bp/customerInvoices.html', {businessPartner : options.businessPartner});
    };
    //End showInvoices

    //Begin showPayments
    $scope.showPayments = function() {
        var options = salesNavigator.getCurrentPage().options;
        salesNavigator.pushPage('views/payments/customerPayments.html', {businessPartner : options.businessPartner});
    };
    //End showPayments

}

BusinessPartnerDocumentController.$inject = ["$scope", "$http", "$filter"];

oneApp.controller('BusinessPartnerDocumentController', BusinessPartnerDocumentController);
