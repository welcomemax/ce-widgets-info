import angular from 'angular';

require('./popup.styl');
require('./popup.html');

import jsonFormatter from 'jsonformatter'
import 'jsonformatter/dist/json-formatter.css'

const DEBUG = true;

var popup = angular.module('popup', [jsonFormatter]);

popup.config(['$compileProvider', function ($compileProvider) {
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|local|data|chrome-extension):/);
}]);

popup.controller('popupController', ['$scope', '$timeout', function ($scope, $timeout) {
    $scope.widgetsData = [];
    $scope.loaded = false;

    $scope.popupActive = false;
    $scope.settings = {
        highlight: true
    };

    this.$onInit = function () {
        $scope.togglePopupActive();

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
        $scope.bg_port.postMessage({method: 'requestWidgetsData'});

        chrome.tabs.query({
            currentWindow: true,
            active: true
        }, function (tabs) {
            $scope.tab = tabs[0];
            $scope.tab_port = chrome.tabs.connect($scope.tab.id);
        });
    };

    $scope.setWidgetsData = function (data) {
        $scope.$apply(function(){
            $scope.widgetsData = data;
            $scope.loaded = true;

            console.log(data)
        })
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
        template: '<span class="widgets-count-counter">{{widgetsData.length}}</span> widget{{widgetsData.length > 1 ? "s" : ""}} detected'
    };
});