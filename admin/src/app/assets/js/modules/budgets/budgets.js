import angular from 'angular';
import budgetUrl from './views/budget.index.html';
import BudgetController from './controllers/budget.index.controller';

export default angular.module('app.budget', []).config(routeConfig).name;

function routeConfig($stateProvider) {
  $stateProvider.state('budget', {
    url: '/budgets',
    templateUrl: budgetUrl,
    controller: BudgetController,
    controllerAs: 'vm',
  });
}

routeConfig.$inject = ['$stateProvider']