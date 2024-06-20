import angular from 'angular';
import batchesUrl from './views/batches.index.html';
import BatchesController from './controllers/batches.index.controller.js';

function routeConfig($stateProvider) {
    $stateProvider.state('batches', {
    url: '/home/chapters/:chapterId/batches',
      templateUrl: batchesUrl,
      controller: BatchesController,
      controllerAs: 'vm',
    });
}

routeConfig.$inject = ['$stateProvider'];

export default angular.module('app.batches', []).config(routeConfig).name;