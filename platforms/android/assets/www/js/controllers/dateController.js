var DateController=function ($scope, $http, $filter) {

$scope.date = new Date();

}

DateController.$inject = ["$scope", "$http", "$filter"];

oneApp.controller('DateController', DateController);