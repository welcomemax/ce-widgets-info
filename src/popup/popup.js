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
    $scope.widgets = [];
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
        $scope.bg_port.postMessage({method: 'postMessageRequestTabWidgets'});

        chrome.tabs.query({
            currentWindow: true,
            active: true
        }, function (tabs) {
            $scope.tab = tabs[0];
            $scope.tab_port = chrome.tabs.connect($scope.tab.id);
        });
    };

    $scope.postMessageSetTabWidgets = (data) => {
        $scope.$apply(() => {
            $scope.widgets = data;
            $scope.loaded = true;
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
            method: 'postMessageHighlightWidget',
            data: {id: id, state: state}
        });
    };

    // @TODO fix in carousel item
    $scope.moveToWidget = (id) => {
        console.log('moveTo', id);

        $scope.tab_port.postMessage({
            method: 'postMessageMoveToWidget',
            data: {id: id}
        });
    };

    $scope.reload = () => {
        $scope.reloaded = true;

        $scope.bg_port.postMessage({
            method: 'postMessageRequestTabWidgets',
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
        template: `<span class="widgets-count-counter">{{widgets.length}}</span> widget{{widgets.length > 1 ? "s" : ""}} detected`
    };
});
