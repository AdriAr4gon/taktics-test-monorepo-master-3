export default class BudgetController {
  constructor($http, $state, $rootScope) { 
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
    this.sortDirection = {};
    this.getBudgets();
  }

  getBudgets() {
    this.$http.get('http://localhost:3000/api/budgets').then(response => {
        this.budgets = response.data;
        const promises = this.budgets.map(budget => 
            this.calculateTotalBudgetCost(budget.id).then(totalCost => {
                budget.totalcost = totalCost;
            })
        );
        return Promise.all(promises);
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
  filterBudgets() {
    if (this.filterCriteria) {
      this.budgets = this.budgets.filter(budget => 
        budget.name.includes(this.filterCriteria) ||
        budget.clientname.includes(this.filterCriteria)
      );
    } else {
      this.getBudgets();
    }
  }
  sortBudgets(field) {
    if (this.sortDirection[field] === 'ASC') {
      this.budgets.sort((a, b) => a[field] < b[field] ? 1 : -1);
      this.sortDirection[field] = 'DESC';
    } else {
      this.budgets.sort((a, b) => a[field] > b[field] ? 1 : -1);
      this.sortDirection[field] = 'ASC';
    }
  }

  calculateTotalBudgetCost(budgetId) {
    return this.$http.get(`http://localhost:3000/api/budgets/${budgetId}/chapters`).then(response => {
        const chapters = response.data;
        let totalCost = 0;
        const promises = chapters.map(chapter => 
            this.$http.get(`http://localhost:3000/api/chapters/${chapter.id}/batches`).then(response => {
                const batches = response.data;
                for (let batch of batches) {
                    totalCost += batch.totalcost;
                }
            })
        );
        return Promise.all(promises).then(() => totalCost);
    }).catch(error => {
        console.error('Error fetching chapters:', error);
    });
}



}




