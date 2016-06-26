/**
 * Created by bnguyen on 6/05/2016.
 */

(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('LeaderBoardController', LeaderBoardController);

    LeaderBoardController.$inject = ['$scope', '$state', 'common', 'leaderBoardService', '$filter'];

    /* @ngInject */
    function LeaderBoardController($scope, $state, common, leaderBoardService, $filter) {
        /* jshint validthis: true */
        var vm = this;
        var logger = common.logger;

        // Initial Data Load
        vm.profile = [];
        vm.pcLeaderBoards = [];
        vm.psnLeaderBoards = [];
        vm.xboxLeaderBoards = [];
        vm.spinner = false;
        vm.showMessage = false;


        // Methods
        vm.searchBattleTag = searchBattleTag;


        activate();

        ////////////////

        function activate() {
            getList();
        }

        function searchBattleTag(name) {
            if (!name) {
                return
            }
            else {
                vm.spinner = true;
                var userId = escapeHtml(name)
                searchForProfile(userId);
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
        function searchForProfile(userId) {
            leaderBoardService.getSearchForProfile(userId)
                .then(function (data) {
                    if (!data) {
                        vm.showMessage = true;
                        vm.spinner = false;
                    }
                    else {
                        vm.profile = data.profile;
                        vm.spinner = false;
                        vm.showMessage = false;
                        $state.go('home.mystats', { platform: data.profile.platform, region: data.profile.region, userId: userId });
                    }

                });
        }

        function getList() {
            leaderBoardService.getList()
                .then(function (data) {
                    if (!data) {
                        vm.showMessage = true;
                        vm.spinner = false;
                    }
                    else {
                        vm.pcLeaderBoards = data.leaderBoards.pc;
                        vm.psnLeaderBoards = data.leaderBoards.psn;
                        vm.xboxLeaderBoards = data.leaderBoards.xbl;
                    }

                });
        }
    }
})();


