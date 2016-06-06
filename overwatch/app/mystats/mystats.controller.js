/**
 * Created by bnguyen on 6/05/2016.
 */

(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('MyStatsController', MyStatsController);

    MyStatsController.$inject = ['$scope', '$state', 'common', 'myStatsService'];

    /* @ngInject */
    function MyStatsController($scope, $state, common, myStatsService) {
        /* jshint validthis: true */
        var vm = this;
        var logger = common.logger;

        // Initial Data Load
        //vm.patchnotes = initialData.patchnotes;

        // For show or hide "Edit/Save" button
        

        // For CM to see if they are able to edit contractQty
        

        // Methods


        activate();

        ////////////////

        function activate() {
            //getList();
        }


        /* Calling Data Service */
        function getList() {
            heroesService.getList()
                .then(function(data) {
                    vm.patchnotes = data.patchnotes;                  
                });
        }

    }
})();


