import 'angular';

import './options.styl';
import './options.html';

let options = angular.module('options');

options.config(['$compileProvider', ($compileProvider) => {
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|local|data|chrome-extension):/);
}]);

options.controller('optionsController', ['$scope', function ($scope) {
    this.$onInit = () => {
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
    };
}]);
