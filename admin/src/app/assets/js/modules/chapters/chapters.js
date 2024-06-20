import angular from 'angular';
import chaptersUrl from './views/chapters.index.html';
import ChaptersController from './controllers/chapters.index.controller';

function routeConfig($stateProvider) {
    $stateProvider.state('chapters', {
      url: '/home/budgets/:budgetId/chapters',
      templateUrl: chaptersUrl,
      controller: ChaptersController,
      controllerAs: 'vm',
    });
  }

routeConfig.$inject = ['$stateProvider'];

export default angular.module('app.chapters', []).config(routeConfig).name;