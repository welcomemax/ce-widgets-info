var bgWindow = chrome.extension.getBackgroundPage();
var widgetsData = bgWindow.widgetsData;

var popup = angular.module('popup', []);

popup.controller('popupController', ['$scope', function ($scope) {
    $scope.settings = {
        highlight: true
    };

    this.$onInit = function () {
        $scope.widgetsData = widgetsData;

        if ($scope.widgetsData) {
            $scope.count = $scope.widgetsData.length;
        }
    };
}]);

popup.directive('widgetsCount', function() {
    return {
        template: '<b>{{count}}</b> widget{{count > 1 ? "s" : ""}} detected'
    };
});