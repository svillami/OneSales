var DialogController=  function ($scope)
{

 $scope.dialogs = {};

  $scope.show = function(dlg) {
    if (!$scope.dialogs[dlg]) {
      ons.createDialog(dlg).then(function(dialog) {
        $scope.dialogs[dlg] = dialog;
        dialog.show();
      });
    } else {
      $scope.dialogs[dlg].show();
    }
  }


}

DialogController.$inject = ["$scope"];

oneApp.controller('DialogController', DialogController);
