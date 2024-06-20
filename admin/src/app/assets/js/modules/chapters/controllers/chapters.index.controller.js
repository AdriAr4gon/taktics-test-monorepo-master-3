export default class ChaptersController {
    constructor($http, $rootScope) {
      this.$http = $http;
      this.$rootScope = $rootScope;
      this.budgetId = this.$rootScope.budgetId;
      this.chapters = [];
      this.newChapter = {
        description: '',
        totalcost: 0,
        totalsale: 0,
      };
  
      this.getChapters();
    }
  
    getChapters() {
        this.budgetId = this.$rootScope.budgetId;
        console.log(this.budgetId);
        this.$http.get(`http://localhost:3000/api/budgets/${this.budgetId}/chapters`).then(response => {
          this.chapters = response.data;
        }).catch(error => {
          console.error('Error fetching chapters:', error);
        });
      }
  
    addChapter() {
        this.$http.post(`http://localhost:3000/api/budgets/${this.budgetId}/chapters`, this.newChapter).then(response => {
          this.chapters.push(response.data);
          this.newChapter = {
            description: '',
            totalcost: 0,
            totalsale: 0,
          };
        }).catch(error => {
          console.error('Error adding chapter:', error);
          console.error('Error details:', error.response.data);
        });
      }
  
    updateChapter(chapter) {
      this.$http.put(`http://localhost:3000/api/budgets/${this.budgetId}/chapters/${chapter.id}`, chapter).then(() => {
        chapter.editMode = false;
      }).catch(error => {
        console.error('Error updating chapter:', error);
      });
    }
  
    deleteChapter(id) {
      this.$http.delete(`http://localhost:3000/api/budgets/${this.budgetId}/chapters/${id}`).then(() => {
        this.chapters = this.chapters.filter(chapter => chapter.id !== id);
      }).catch(error => {
        console.error('Error deleting chapter:', error);
      });
    }
    // admin/src/app/assets/js/modules/chapters/controllers/chapters.index.controller.js
viewBatches(chapter) {
    this.$rootScope.chapterId = chapter.id;
    this.$state.go('batches', { chapterId: chapter.id });
  }

}

  