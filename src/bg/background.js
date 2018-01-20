var background = angular.module('background', []);

background.controller('backgroundController', ['$scope', '$window', function($scope, $window) {
    this.$onInit = function () {
        chrome.tabs.onUpdated.addListener(function(id, info, tab) {
            chrome.browserAction.setBadgeText({text: '0'});

            $scope.getWidgetsData();
        })
    };



    $scope.getWidgetsData = function () {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var port = chrome.tabs.connect(tabs[0].id);

            port.postMessage({getWidgets: true, highlightWidgets: true});

            port.onMessage.addListener(function getResp(response) {
                $window.widgetsData = $scope.widgetsData = response;

                chrome.browserAction.setBadgeText({text: $scope.widgetsData.length.toString()});
            });
        });
    }
}]);