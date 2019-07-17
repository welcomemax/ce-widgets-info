import 'angular';

import './options.styl';
import './options.html';

let options = angular.module('options', []);

options.config(['$compileProvider', ($compileProvider) => {
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|local|data|chrome-extension):/);
}]);

options.controller('optionsController', ['$scope', function ($scope) {
    $scope.widgetsData = [];

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

        $scope.bg_port.postMessage({method: 'postMessageRequestWidgetsData'});
    };

    $scope.postMessageSetWidgetsData = (data) => {
        $scope.$apply(() => {
            $scope.widgetsData = data;
            $scope.loaded = true;

            console.log($scope.widgetsData)

            // may be a fix for ngClick in carousel item
            // if ($scope.widgetsData.length) {
            //     $scope.widgetsData.forEach((item) => {
            //         item.moveTo = $scope.moveToWidget;
            //     })
            // }
        })
    };
}]);
