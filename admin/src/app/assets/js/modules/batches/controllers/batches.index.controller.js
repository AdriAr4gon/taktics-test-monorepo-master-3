export default class BatchesController {
    constructor($http, $rootScope) {
        this.$http = $http;
        this.$rootScope = $rootScope;
        this.newBatch = {
            description: '',
            totalcost: 0,
            totalsale: 0,
        };
    }

    addBatch() {
        this.$http.post(`http://localhost:3000/api/budgets/${this.$rootScope.budgetId}/chapters/${this.$rootScope.chapterId}/batches`, this.newBatch).then(response => {
          this.batches.push(response.data);
          this.newBatch = {
            description: '',
            totalcost: 0,
            totalsale: 0,
          };
        }).catch(error => {
          console.error('Error adding batch:', error);
          console.error('Error details:', error.response.data);
        });
    }

    updateBatch(batch) {
        this.$http.put(`http://localhost:3000/api/budgets/${this.$rootScope.budgetId}/chapters/${this.$rootScope.chapterId}/batches/${batch.id}`, batch).then(() => {
          batch.editMode = false;
        }).catch(error => {
          console.error('Error updating batch:', error);
        });
    }

    deleteBatch(id) {
        this.$http.delete(`http://localhost:3000/api/budgets/${this.$rootScope.budgetId}/chapters/${this.$rootScope.chapterId}/batches/${id}`).then(() => {
          this.batches = this.batches.filter(batch => batch.id !== id);
        }).catch(error => {
          console.error('Error deleting batch:', error);
        });
    }
}