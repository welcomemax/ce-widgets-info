var background = angular.module('background', []);

background.controller('backgroundController', ['$scope', '$window', function ($scope, $window) {
    $scope.tabsWidgetsData = {};

    this.$onInit = function () {
        chrome.tabs.onUpdated.addListener(function (id, info, tab) {
            if (info && info.status && (info.status.toLowerCase() === 'complete')) {
                if(!id || !tab || !tab.url || (tab.url.indexOf('http') == -1)) {
                    return;
                }

                $scope.collectWidgetsData(id);
            }
        });
    };

    chrome.tabs.onActivated.addListener(function (info) {
        if ($scope.tabsWidgetsData[info.tabId]) {
            $scope.getWidgetsData(info.tabId);
        } else {
            $scope.setBadge(0);
        }
    });

    $scope.setBadge = function (count) {
        if (count) {
            chrome.browserAction.setBadgeText({text: count.toString()});
        } else {
            chrome.browserAction.setBadgeText({text: ''});
        }
    };

    $scope.collectWidgetsData = function (id) {
        var port = chrome.tabs.connect(id);

        port.postMessage({getWidgets: true, highlightWidgets: true});

        port.onMessage.addListener(function (response) {
            $scope.tabsWidgetsData[id] = response;

            $scope.getWidgetsData(id);
        });
    };

    $scope.getWidgetsData = function (id) {
        $window.widgetsData = $scope.tabsWidgetsData[id];
        $scope.setBadge($scope.tabsWidgetsData[id].length);
    };
}]);