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
        vm.showMessage = false;

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
            if (!name) {
                return
            }
            else {
                vm.spinner = true;
                var userId = escapeHtml(name)
                getList(userId);
            }

        }

        function escapeHtml(text) {
            var map = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;',
                '#': '%23'
            };

            return text.replace(/[&<>"'#]/g, function (m) { return map[m]; });
        }


        /* Calling Data Service */
        function getList(userId) {
            searchService.getList(userId)
                .then(function (data) {
                    if (!data) {
                        vm.showMessage = true;
                        vm.spinner = false;
                    }
                    else {
                        vm.profile = data.profile;
                        vm.spinner = false;
                        vm.showMessage = false;
                        $state.go('home.mystats', { userId: userId });
                    }

                });
        }

    }
})();


