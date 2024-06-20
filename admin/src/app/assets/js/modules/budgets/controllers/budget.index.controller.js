export default class BudgetController {
  constructor($http) {
    this.$http = $http;
    this.budgets = [];
    this.newBudget = {
      name: '',
      thumbnail: '',
      date: null,
      clientname: '',
      totalcost: 0,
      totalsale: 0,
      chapters: []
    };

    this.getBudgets();
  }

  getBudgets() {
    this.$http.get('http://localhost:3000/api/budgets').then(response => {
      this.budgets = response.data;
    }).catch(error => {
      console.error('Error fetching budgets:', error);
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

  deleteBudget(id) {
    this.$http.delete(`http://localhost:3000/api/budgets/${id}`).then(() => {
      this.budgets = this.budgets.filter(budget => budget.id !== id);
    }).catch(error => {
      console.error('Error deleting budget:', error);
    });
  }
}