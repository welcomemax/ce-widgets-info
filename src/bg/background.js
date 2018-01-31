var background = angular.module('background', []);

background.controller('backgroundController', ['$scope', '$window', function ($scope, $window) {
    $scope.storedWidgetsData = {};

    this.$onInit = function () {
        chrome.tabs.onUpdated.addListener(function (id, info, tab) {
            if (info && info.status && (info.status.toLowerCase() === 'complete')) {
                if(!id || !tab || !tab.url || (tab.url.indexOf('http') == -1)) {
                    return;
                }

                $scope.collectWidgetsData(id);

                console.log(id, info, tab)
            }
        });
    };

    chrome.tabs.onActivated.addListener(function (info) {
        $scope.getWidgetsData(info.tabId);
    });

    $scope.setBadge = function (count) {
        if (count) {
            chrome.browserAction.setBadgeText({text: count.toString()});
            chrome.browserAction.setBadgeBackgroundColor({color: '#38393a'});
        } else {
            chrome.browserAction.setBadgeText({text: ''});
        }
    };

    $scope.collectWidgetsData = function (id) {
        var port = chrome.tabs.connect(id);

        // port.postMessage({method: 'highlightWidgets'});
        port.postMessage({method: 'getWidgetsData'});

        port.onMessage.addListener(function (response) {
            $scope.storedWidgetsData[id] = response;

            $scope.getWidgetsData(id);
        });
    };

    $scope.getWidgetsData = function (id) {
        if ($scope.storedWidgetsData[id]) {
            $window.widgetsData = $scope.storedWidgetsData[id];
            $scope.setBadge($scope.storedWidgetsData[id].length);
        } else {
            $window.widgetsData = [];
            $scope.setBadge(0);
        }

    };
}]);