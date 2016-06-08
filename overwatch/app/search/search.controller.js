/**
 * Created by bnguyen on 6/05/2016.
 */

(function () {
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
        vm.profile = [];
        vm.spinner = false;
        vm.cannotFindPlayer = false;

        // Initial Data Load
        //vm.patchnotes = initialData.patchnotes;

        // For show or hide "Edit/Save" button


        // For CM to see if they are able to edit contractQty


        // Methods
        vm.searchBattleTag = searchBattleTag;


        activate();

        ////////////////

        function activate() {
        }

        function searchBattleTag(name) {
            vm.spinner = true;
            getList();
        }


        /* Calling Data Service */
        function getList(name) {
            searchService.getList()
                .then(function (data) {
                    if (!data) {
                        vm.cannotFindPlayer = true;
                    }
                    else {
                        vm.profile = data.profile;
                        vm.spinner = false;
                        vm.cannotFindPlayer = false;
                        $state.go('home.mystats', { userId: name });
                    }

                });
        }

    }
})();


