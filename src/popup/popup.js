// var bgWindow = chrome.extension.getBackgroundPage();
// var widgetsData = bgWindow.widgetsData;

var popup = angular.module('popup', []);



// doesn't work for some reasons
// chrome.browserAction.onClicked.addListener(function () {
//     $scope.togglePopupActive();
// });

popup.controller('popupController', ['$scope', '$timeout', function ($scope, $timeout) {
    $scope.widgetsData = [];
    $scope.loaded = false;

    $scope.popupActive = false;
    $scope.settings = {
        highlight: true
    };

    this.$onInit = function () {
        $scope.togglePopupActive();


        // chrome.runtime.onConnect.addListener(function (port) {
        //     port.onMessage.addListener(postMessageFactory);
        // });

        var port = chrome.extension.connect({
            name: "Sample Communication"
        });
        port.onMessage.addListener(postMessageFactory);
        port.postMessage({method: 'getWidgetsData'});

        function postMessageFactory (obj) {
            if (obj && obj.method) {
                if (obj.data) {
                    $scope[obj.method](obj.data);
                } else {
                    $scope[obj.method]();
                }
            }
        }

        chrome.tabs.query({
            currentWindow: true,
            active: true
        }, function (tabs) {
            $scope.tab = tabs[0];
            $scope.tab_port = chrome.tabs.connect($scope.tab.id);
        });

        $scope.$watch('widgetsData', function() {
            console.log('widgetsData changed')
        });

        // $scope.widgetsData = widgetsData; // @replace with port.onMessage.addListener
    };

    $scope.getWidgetsData = function (data) {
        console.log(data)

        $scope.widgetsData = data;
        $scope.loaded = true;

        console.log($scope)
    };

    $scope.togglePopupActive = function () {
        $timeout(function () {
            $scope.popupActive = !$scope.popupActive;
        });
    };

    $scope.highlightWidget = function (id, state) {
        $scope.tab_port.postMessage({
            method: 'highlightWidget',
            data: {id: id, state: state}
        });
    };

    $scope.moveToWidget = function (id) {
        $scope.tab_port.postMessage({
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