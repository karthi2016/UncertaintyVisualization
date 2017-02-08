(function() {
  'use strict';

  function QuerySelectorController($element, dialogPolyfill, QueryBuilderService) {
    var dialog = $element[0].children[1];
    this.queryList = undefined;

    //register the polyfill for old browsers
    if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }

    this.openDialog = function() {
      if (! this.queryList) {
        QueryBuilderService.loadQueries();
      }

      QueryBuilderService.ready.then(function() {
        this.queryList = QueryBuilderService.getList();
        dialog.showModal();
      }.bind(this));
    }.bind(this);

    this.closeDialog = function() {
      QueryBuilderService.reset();
      dialog.close();
    };

    this.selectQuery = function(query) {
      QueryBuilderService.getJSON(query.id);
      dialog.close();
    };
  }

  angular.module('uncertApp.querySelector').controller('QuerySelectorController', QuerySelectorController);
})();
