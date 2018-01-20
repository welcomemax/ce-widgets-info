var bgWindow = chrome.extension.getBackgroundPage();
var widgetsData = bgWindow.widgetsData;

var popup = angular.module('popup', []);

popup.controller('popupController', ['$scope', function ($scope) {
    this.$onInit = function () {
        angular.extend($scope, widgetsData);

        $scope.count = widgetsData.length;
    };
}]);