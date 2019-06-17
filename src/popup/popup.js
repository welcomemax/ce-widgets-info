import 'angular';

import 'angular-ui-carousel';
import 'angular-ui-carousel/dist/ui-carousel.css';
import 'jsonformatter';
import 'jsonformatter/dist/json-formatter.css';

import './popup.styl';
import './popup.html';

const DEBUG = true;

let popup = angular.module('popup', ['jsonFormatter', 'ui.carousel']);

popup.config(['$compileProvider', ($compileProvider) => {
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|local|data|chrome-extension):/);
}]);

popup.controller('popupController', ['$scope', '$timeout', function ($scope, $timeout) {
    $scope.widgetsData = [];
    $scope.loaded = false;
    $scope.settingsFormatted = true;

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

    $scope.setWidgetsData = (data) => {
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

    $scope.togglePopupActive = () => {
        $timeout(function () {
            $scope.popupActive = !$scope.popupActive;
        });
    };

    // @TODO fix in carousel item
    $scope.highlightWidget = (id, state) => {
        $scope.tab_port.postMessage({
            method: 'highlightWidget',
            data: {id: id, state: state}
        });
    };

    // @TODO fix in carousel item
    $scope.moveToWidget = (id) => {
        console.log('moveTo', id);

        $scope.tab_port.postMessage({
            method: 'moveToWidget',
            data: {id: id}
        });
    };

    $scope.reload = () => {
        $scope.reloaded = true;

        $scope.bg_port.postMessage({
            method: 'reload',
            data: {tab: $scope.tab}
        });
    };

    $scope.openOptions = () => {
        // if (chrome.runtime.openOptionsPage) {
        //     chrome.runtime.openOptionsPage();
        // } else {
            chrome.tabs.create({ url: "dist/options.html" });
        // }
    };
}]);

popup.directive('widgetsCount', () => {
    return {
        template: `<span class="widgets-count-counter">{{widgetsData.length}}</span> widget{{widgetsData.length > 1 ? "s" : ""}} detected`
    };
});
