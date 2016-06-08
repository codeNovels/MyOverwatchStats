/**
 * Created by bnguyen on 6/05/2016.
 */

(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('SearchController', SearchController);

    SearchController.$inject = ['$scope', '$state', 'common', 'searchService'];

    /* @ngInject */
    function SearchController($scope, $state, common, searchService) {
        /* jshint validthis: true */
        var vm = this;
        var logger = common.logger;

        // Initial Data Load
        //vm.patchnotes = initialData.patchnotes;

        // For show or hide "Edit/Save" button
        

        // For CM to see if they are able to edit contractQty
        

        // Methods
        vm.searchBattleTag = searchBattleTag;


        activate();

        ////////////////

        function activate() {
            //getList();
        }
        
        function searchBattleTag(name){
            //var battleTag = name.replace('#','-');
            $state.go('home.mystats', { userId: name });
        }


        /* Calling Data Service */
        function getList() {
            patchNotesService.getList()
                .then(function(data) {
                    vm.patchnotes = data.patchnotes;                  
                });
        }

    }
})();


