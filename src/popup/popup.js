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

        $scope.widgetsData = widgetsData; // @replace with port.onMessage.addListener
        $scope.loaded = true;
    };

    $scope.togglePopupActive = function () {
        $timeout(function () {
            $scope.popupActive = !$scope.popupActive;
        });
    };

    $scope.highlightWidget = function (id, state) {
        $scope.port.postMessage({
            method: 'highlightWidget',
            data: {id: id, state: state}
        });
    };

    $scope.moveToWidget = function (id) {
        $scope.port.postMessage({
            method: 'moveToWidget',
            data: {id: id}
        });
    };

    $scope.reload = function () {
        $scope.reloaded = true;

        $scope.port.postMessage({
            method: 'reload',
            data: {tab: $scope.tab}
        });
    };
}]);

popup.directive('widgetsCount', function() {
    return {
        template: '<b>{{widgetsData.length}}</b> widget{{widgetsData.length > 1 ? "s" : ""}} detected'
    };
});