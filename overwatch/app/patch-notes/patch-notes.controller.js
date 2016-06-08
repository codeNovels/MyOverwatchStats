/**
 * Created by bnguyen on 6/05/2016.
 */

(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('PatchNotesController', PatchNotesController);

    PatchNotesController.$inject = ['$scope', '$state', 'common', 'patchNotesService'];

    /* @ngInject */
    function PatchNotesController($scope, $state, common, patchNotesService) {
        /* jshint validthis: true */
        var vm = this;
        var logger = common.logger;

        // Initial Data Load
        vm.patchnotes = [];

        // For show or hide "Edit/Save" button
        

        // For CM to see if they are able to edit contractQty
        

        // Methods


        activate();

        ////////////////

        function activate() {
            getList();
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


