/**
 * Created by bnguyen on 6/05/2016.
 */

(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('MyStatsController', MyStatsController);

    MyStatsController.$inject = ['$scope', '$state', 'common', 'myStatsService', '$filter'];

    /* @ngInject */
    function MyStatsController($scope, $state, common, myStatsService, $filter) {
        /* jshint validthis: true */
        var vm = this;
        var logger = common.logger;

        // Initial Data Load
        vm.profile = [];
        vm.userId = $state.params.userId
        vm.limitTo = 5;
        vm.profileAvatar = '';
        vm.heroSelector = [
            { id: 0, name: 'ALL HEROES', value: "0x02E00000FFFFFFFF" },
            { id: 1, name: 'Reaper', value: "0x02E0000000000002" },
            { id: 2, name: 'Mercy', value: "x02E0000000000004" },
            { id: 3, name: 'Hanzo', value: "x02E0000000000005" },
            { id: 4, name: 'Torbjorn', value: "x02E0000000000006" },
            { id: 5, name: 'Reinhardt', value: "x02E0000000000007" },
            { id: 6, name: 'Pharah', value: "x02E0000000000008" },
            { id: 7, name: 'Winston', value: "x02E0000000000009" },
            { id: 8, name: 'Widowmaker', value: "x02E000000000000A" },
            { id: 9, name: 'Bastion', value: "x02E0000000000015" },
            { id: 10, name: 'Zenyatta' },
            { id: 11, name: 'Genji', value: "x02E0000000000029" },
            { id: 12, name: 'Roadhog', value: "x02E0000000000040" },
            { id: 13, name: 'McCree', value: "x02E0000000000042" },
            { id: 14, name: 'Junkrat', value: "x02E0000000000065" },
            { id: 15, name: 'Soldier: 76', value: "x02E000000000006E" },
            { id: 16, name: 'Lucio', value: "x02E0000000000079" },
            { id: 17, name: 'D.Va', value: "x02E000000000007A" },
            { id: 18, name: 'Mei', value: "x02E00000000000DD" },
        ];
        vm.selectedHero = vm.heroSelector[0];


        // For show or hide "Edit/Save" button


        // For CM to see if they are able to edit contractQty


        // Methods
        vm.seeAllHeroes = seeAllHeroes;


        activate();

        ////////////////

        function activate() {
            getProfile();
        }

        function seeAllHeroes() {
            if (vm.limitTo === 5) {
                vm.limitTo = 30;
            }
            else {
                vm.limitTo = 5
            }
        }

        function getMostPlayedHero(){
            var highestSecondsPlayed = 0;
            var avatar = '';

            angular.forEach(vm.profile.heroStats, function(hero){
                if(hero.timePlayed > highestSecondsPlayed){
                    if(hero.name !== 'All'){
                        highestSecondsPlayed = hero.timePlayed;
                        avatar = hero.name;
                    }       
                }
            })
            stripAndToLower(avatar)
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

        function stripAndToLower(name) {
            switch (name) {
                case 'L&#xFA;cio':
                    vm.profileAvatar = 'lucio'
                    break;

                case 'Torbj&#xF6;rn':
                    vm.profileAvatar = 'torbjorn'
                    break;

                case 'Soldier: 76':
                    vm.profileAvatar = 'soldier-76'
                    break;

                case 'D.Va':
                    vm.profileAvatar = 'dva'
                    break;

                default:
                    vm.profileAvatar = $filter('lowercase')(name);
                    break;
            }
        }


        /* Calling Data Service */
        function getProfile() {
            var userId = escapeHtml(vm.userId);
            myStatsService.getProfile(userId)
                .then(function (data) {
                    if (!data) {
                        console.log('no data retrieved for profile')
                    }
                    else {
                        vm.profile = data.profile;

                        var playerName = vm.profile.player.name
                        vm.playerName = playerName.split("#")[0];
                        getMostPlayedHero()
                        vm.hoursPlayed = (vm.profile.heroStats[0].timePlayed) / 3600;

                    }


                });
        }
    }
})();


