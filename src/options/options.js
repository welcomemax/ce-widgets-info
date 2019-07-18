import 'angular';

import './options.styl';
import './options.html';

let options = angular.module('options', []);

options.config(['$compileProvider', ($compileProvider) => {
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|local|data|chrome-extension):/);
}]);

options.controller('optionsController', ['$scope', function ($scope) {
    $scope.data = {};
    $scope.widgets = [];

    this.$onInit = function () {
        $scope.bg_port = chrome.extension.connect();
        $scope.bg_port.onMessage.addListener((obj) => {
            if (obj && obj.method) {
                if (obj.data) {
                    $scope[obj.method](obj.data);
                } else {
                    $scope[obj.method]();
                }
            }
        });

        $scope.bg_port.postMessage({method: 'postMessageRequestAllData'});
    };

    $scope.postMessageSetAllData = (data) => {
        $scope.$apply(() => {
            $scope.data = data;

            $scope.widgets = [];

            angular.forEach($scope.data.widgets, (tabWidgets, tabId) => {
                tabWidgets.forEach(tabWidgets => {
                    tabWidgets.tab = $scope.data.tabs[tabId];
                    tabWidgets.site = $scope.data.sites[tabWidgets.tab.site];
                });

                $scope.widgets = $scope.widgets.concat(tabWidgets);
            });

            $scope.loaded = true;

            console.log($scope.data)
            console.log($scope.widgets)
        })
    };
}]);
