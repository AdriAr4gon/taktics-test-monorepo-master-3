import angular from 'angular';

export default class BudgetController {
  constructor($http) {
    this.$http = $http;
    this.budgets = [];

    this.getBudgets();
  }

  getBudgets() {
    this.$http.get('/api/budgets').then(response => {
      this.budgets = response.data;
    }).catch(error => {
      console.error('Error fetching budgets:', error);
    });
  }

  addBudget() {
    const newBudget = {
      name: 'New Budget',
      thumbnail: 'http://placehold.it/50x50',
      date: new Date(),
      clientName: 'New Client',
      totalCost: 0,
      totalSale: 0,
      chapters: []
    };

    this.$http.post('/api/budgets', newBudget).then(response => {
      this.budgets.push(response.data);
    }).catch(error => {
      console.error('Error adding budget:', error);
    });
  }

  deleteBudget(id) {
    this.$http.delete(`/api/budgets/${id}`).then(() => {
      this.budgets = this.budgets.filter(budget => budget.id !== id);
    }).catch(error => {
      console.error('Error deleting budget:', error);
    });
  }
}

BudgetController.$inject = ['$http'];
