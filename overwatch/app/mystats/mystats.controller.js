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
        vm.platform = $state.params.platform
        vm.region = $state.params.region
        vm.limitTo = 5;
        vm.profileAvatar = '';
        vm.selectedHeroId = 0;
        vm.selectedHeroName = 'ALL HEROES';
        vm.topHeroes = [];
        vm.mode = 'quick-play';
        vm.chooseMode = chooseMode;


        // For show or hide "Edit/Save" button


        // For CM to see if they are able to edit contractQty


        // Methods
        vm.seeAllHeroes = seeAllHeroes;
        vm.searchHero = searchHero;


        activate();

        ////////////////

        function activate() {
            getProfile();
            getTopHeroes();
        }

        function seeAllHeroes() {
            if (vm.limitTo === 5) {
                vm.limitTo = 30;
            }
            else {
                vm.limitTo = 5
            }
        }

        function searchHero(heroName) {
            angular.forEach(heroName, function (name) {
                angular.forEach(vm.profile.heroStats, function (profile, index) {
                    if (name === profile.name) {
                        vm.selectedHeroId = index;
                        vm.selectedHeroName = profile.name;
                    }
                    else if (name === 'ALL HEROES') {
                        vm.selectedHeroId = 0;
                        vm.selectedHeroName = 'ALL HEROES';
                    }
                    else {

                    }
                })

            })
        }

        function getMostPlayedHero() {
            var highestSecondsPlayed = 0;
            var avatar = '';

            angular.forEach(vm.profile.heroStats, function (hero) {
                if (hero.timePlayed > highestSecondsPlayed) {
                    if (hero.name !== 'All') {
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

                case 'l%C3%BAcio':
                    vm.profileAvatar = 'lucio'
                    break;

                case 'Lúcio':
                    vm.profileAvatar = 'lucio'
                    break;

                case 'Torbj&#xF6;rn':
                    vm.profileAvatar = 'torbjorn'
                    break;

                case 'Torbjörn':
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

        function chooseMode(mode, watcherMode){
            vm.mode = mode;
            getProfile(watcherMode);
            getTopHeroes();
        }

        function decodeUri(topHeroes) {
            angular.forEach(topHeroes, function (hero, index) {
                if (hero.name === 'Torbj&#xF6;rn') {
                    vm.topHeroes[index].name = 'Torbjorn'
                }
                else if (hero.name === 'L&#xFA;cio') {
                    vm.topHeroes[index].name = 'Lucio'
                }
            })


        }


        /* Calling Data Service */
        function getProfile(mode) {
            var watcherMode = mode
            var oldstr = vm.userId;
            var userId = oldstr.replace("-", "%23");
            myStatsService.getProfile(userId, vm.platform, vm.region, watcherMode)
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
                        vm.heroSelector = data.profile.heroStats;

                    }


                });
        }

        function getTopHeroes() {
            var oldstr = vm.userId;
            var userId = oldstr.replace("#", "-");
            vm.showTopHeroes = false;
            vm.showSpinner = true;
            myStatsService.getTopHeroes(userId, vm.platform, vm.region, vm.mode)
                .then(function (data) {
                    if (!data) {
                        console.log('no data retrieved for topHeroes')
                    }
                    else {
                        vm.topHeroes = data.topHeroes;
                        decodeUri(vm.topHeroes);
                        vm.showSpinner = false;
                        vm.showTopHeroes = true
                    }
                });
        }
    }
})();


