var bgWindow = chrome.extension.getBackgroundPage();
var widgetsData = bgWindow.widgetsData;

var popup = angular.module('popup', []);

// doesn't work for some reasons
// chrome.browserAction.onClicked.addListener(function () {
//     $scope.togglePopupActive();
// });

popup.controller('popupController', ['$scope', '$timeout', function ($scope, $timeout) {
    $scope.popupActive = false;
    $scope.settings = {
        highlight: true
    };

    this.$onInit = function () {
        $scope.togglePopupActive();

        chrome.tabs.query({
            currentWindow: true,
            active: true
        }, function (tabs) {
            $scope.tab = tabs[0];
            $scope.port = chrome.tabs.connect($scope.tab.id);
        });

        $scope.widgetsData = widgetsData;

        if ($scope.widgetsData) {
            $scope.count = $scope.widgetsData.length;
        }
    };

    $scope.togglePopupActive = function () {
        $timeout(function () {
            $scope.popupActive = !$scope.popupActive;
        });
    };

    $scope.highlightWidget = function (id, state) {
        $scope.port.postMessage({
            method: 'highlightWidget',
            data: {id: id, state: state} // @TODO replace hardcoded ID
        });
    };

    $scope.moveToWidget = function (id) {
        $scope.port.postMessage({
            method: 'moveToWidget',
            data: {id: id}  // @TODO replace hardcoded ID
        });
    };
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