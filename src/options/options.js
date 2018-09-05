import 'angular';

import './options.styl';
import './options.html';

let options = angular.module('popup');

options.config(['$compileProvider', function ($compileProvider) {
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|local|data|chrome-extension):/);
}]);

options.controller('optionsController', ['$scope', function ($scope) {


    this.$onInit = function () {
        $scope.bg_port = chrome.extension.connect();
        $scope.bg_port.onMessage.addListener(function (obj) {
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