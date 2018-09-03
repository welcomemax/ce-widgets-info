import 'angular';

import './options.styl';
import './options.html';

let options = angular.module('popup');

options.config(['$compileProvider', function ($compileProvider) {
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|local|data|chrome-extension):/);
}]);

options.controller('optionsController', ['$scope', function ($scope) {

}]);