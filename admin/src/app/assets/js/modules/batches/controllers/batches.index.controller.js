export default class BatchesController {
    constructor($http, $state, $rootScope) {
        this.$state = $state;
        this.$http = $http;
        this.$rootScope = $rootScope;
        this.budgetId = this.$rootScope.budgetId;
        this.chapterId = this.$rootScope.chapterId;
        this.batches = [];
  
        this.getBatches();
    }

    getBatches() {
        this.budgetId = this.$rootScope.budgetId;
        this.chapterId = this.$rootScope.chapterId;
        this.$http.get(`http://localhost:3000/api/chapters/${this.chapterId}/batches`).then(response => {
            this.batches = response.data;
          }).catch(error => {
            console.error('Error fetching batches:', error);
          });
    }

    addBatch() {
        this.$http.post(`http://localhost:3000/api/chapters/${this.chapterId}/batches`, this.newBatch)
    .then(response => {
        this.newBatch = {
            rank: 0,
            description: '',
            mount: 0,
            materialcost: 0,
            labourcost: 0,
            totalcost: 0,
            unitarycost: 0,
            totalsale: 0,
        };
        this.getBatches();
    })
    .catch(error => {
        console.error('Error adding batch:', error);
        if (error.response) {
            console.error('Error details:', error.response.data);
        }
    });
    }

    updateBatch(batch) {
        this.$http.put(`http://localhost:3000/api/chapters/${this.chapterId}/batches`, batch).then(() => {
          batch.editMode = false;
        }).catch(error => {
          console.error('Error updating batch:', error);
        });
    }

    deleteBatch(id) {
        this.$http.delete(`http://localhost:3000/api/chapters/${this.chapterId}/batches`).then(() => {
          this.batches = this.batches.filter(batch => batch.id !== id);
        }).catch(error => {
          console.error('Error deleting batch:', error);
        });
    }

    editBatch(batch) {
        batch.editMode = true;
    }



    viewBatches(chapter) {
        this.chapterId = chapter.id;
        this.$state.go('batches', { chapterId: this.chapterId });
    }
}