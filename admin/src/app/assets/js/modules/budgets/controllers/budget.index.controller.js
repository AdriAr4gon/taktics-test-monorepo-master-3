export default class BudgetController {
  constructor($http, $state, $rootScope) {     // Asegúrate de inyectar $state aquí
    this.$http = $http;
    this.$state = $state;
    this.$rootScope = $rootScope;
    this.budgets = [];
    this.newBudget = {
      budgetId: '',
      name: '',
      thumbnail: '',
      date: null,
      clientname: '',
      totalcost: 0,
      totalsale: 0,
      chapters: [],
    };

    this.getBudgets();
  }

  getBudgets() {
    this.$http.get('http://localhost:3000/api/budgets').then(response => {
      this.budgets = response.data;
    }).catch(error => {
      console.error('Error fetching budgets:', error);
    });
    this.budgets.forEach(budget => {
      console.log(budget.id);
    });
  }
  

  addBudget() {
    this.$http.post('http://localhost:3000/api/budgets', this.newBudget).then(response => {
      this.budgets.push(response.data);
      this.newBudget = {
        name: '',
        thumbnail: '',
        date: null,
        clientname: '',
        totalcost: 0,
        totalsale: 0,
        chapters: []
      };
    }).catch(error => {
      console.error('Error adding budget:', error);
      console.error('Error details:', error.response.data);
    });
  }

  updateBudget(budget) {
    this.$http.put(`http://localhost:3000/api/budgets/${budget.id}`, budget).then(() => {
      budget.editMode = false;
    }).catch(error => {
      console.error('Error updating budget:', error);
    });
  }

  viewChapters(budget) {
    this.$rootScope.budgetId = budget.id;
    this.$state.go('chapters', { budgetId: budget.id });
  }

  deleteBudget(id) {
    this.$http.delete(`http://localhost:3000/api/budgets/${id}`).then(() => {
      this.budgets = this.budgets.filter(budget => budget.id !== id);
    }).catch(error => {
      console.error('Error deleting budget:', error);
    });
  }
}

