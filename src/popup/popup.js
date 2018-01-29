var bgWindow = chrome.extension.getBackgroundPage();
var widgetsData = bgWindow.widgetsData;

var popup = angular.module('popup', []);

popup.controller('popupController', ['$scope', '$timeout', function ($scope, $timeout) {
    $scope.popupActive = false;
    $scope.settings = {
        highlight: true
    };

    this.$onInit = function () {
        $scope.togglePopupActive();

        $scope.widgetsData = widgetsData;

        if ($scope.widgetsData) {
            $scope.count = $scope.widgetsData.length;
        }
    };

    chrome.browserAction.onClicked.addListener(function () {
        $scope.togglePopupActive();
    });

    $scope.togglePopupActive = function () {
        $timeout(function () {
            $scope.popupActive = !$scope.popupActive;
        });
    };

    $scope.highlightWidget = function () {
        console.log('widget hovered')
    }
}]);

popup.directive('widgetsCount', function() {
    return {
        template: '<b>{{count}}</b> widget{{count > 1 ? "s" : ""}} detected'
    };
});

popup.directive('widgetsEmpty', function() {
    return {
        template: 'Widgets weren\'t detected on the current page'
    };
});