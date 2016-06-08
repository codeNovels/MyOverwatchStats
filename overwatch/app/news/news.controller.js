/**
 * Created by bnguyen on 6/05/2016.
 */

(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('NewsController', NewsController);

    NewsController.$inject = ['$scope', '$state', 'common', 'newsService'];

    /* @ngInject */
    function NewsController($scope, $state, common, newsService) {
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
            newsService.getList()
                .then(function(data) {
                    vm.patchnotes = data.patchnotes;                  
                });
        }

    }
})();


