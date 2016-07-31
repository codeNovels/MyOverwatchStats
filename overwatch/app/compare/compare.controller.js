/**
 * Created by bnguyen on 6/05/2016.
 */

(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('CompareController', CompareController);

    CompareController.$inject = ['$scope', '$state', 'common', 'compareService', '$filter', 'compareModalService'];

    /* @ngInject */
    function CompareController($scope, $state, common, compareService, $filter, compareModalService) {
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
        vm.mode = 'competitive-play';
        vm.watcherMode = 1;
        vm.chooseMode = chooseMode;
        vm.compActive = 'is-active';
        vm.applyClass = applyClass;
        vm.openModal = openModal;
        vm.players = []
        vm.modeSelector = [{ id: 1, name: 'Competitive' }, { id: 0, name: 'Quick Play' }]
        vm.selectedMode = vm.modeSelector[0];
        vm.selectedHero;

        // For show or hide "Edit/Save" button


        // For CM to see if they are able to edit contractQty


        // Methods
        vm.seeAllHeroes = seeAllHeroes;
        vm.searchHero = searchHero;
        vm.removePlayer = removePlayer;
        vm.searchForIndexOfSelectedHero = searchForIndexOfSelectedHero;


        activate();

        ////////////////

        function activate() {

        }

        function searchForIndexOfSelectedHero(player, selectedHero) {
            for (var i = 0; i < player.heroStats.length; i++) {
                if (angular.equals(player.heroStats[i], selectedHero)) {
                    player.selectedHeroIndex = i;              
                }
            };
            return -1;
        }

        function removePlayer(player) {
            var index = $scope.vm.players.indexOf(player);
            vm.players.splice(index, 1)
        }

        function openModal() {
            var modalOptions = {
                closeButtonText: 'Cancel',
                actionButtonText: 'Add Player',
                headerText: 'Enter BattleTag',
            };
            compareModalService.showModal({}, modalOptions)
                .then(function (result) {
                    searchForProfile(result)
                });
        }

        $scope.applyActive = function (mode) {
            if (mode === 'competitive') {
                return 'is-active'
            }
        }

        function applyClass(mode) {
            if (mode === 'competitive') {
                vm.compActive = 'is-active'
                vm.quickActive = ''
            }
            else if (mode === 'quick') {
                vm.compActive = ''
                vm.quickActive = 'is-active'
            }
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

        function chooseMode(mode, watcherMode) {
            vm.mode = mode;
            vm.watcherMode = watcherMode;
            getProfile(vm.watcherMode);
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
        function getProfile(name, platform, region, mode) {
            var watcherMode = mode
            var oldstr = name;
            var userId = oldstr.replace("#", "%23");
            var profile = [];
            compareService.getProfile(userId, platform, region, watcherMode)
                .then(function (data) {
                    if (!data) {
                        console.log('no data retrieved for profile')
                    }
                    else {
                        profile.push(data.profile)
                        var s = data.profile.player.name
                        if (data.profile.player.platform === 'pc') {
                            profile.name = s.substring(0, s.indexOf('#'));
                        }
                        else {
                            profile.name = data.profile.player.name
                        }
                        profile[0].heroSelector = data.profile.heroStats;
                        profile[0].selectedHero = data.profile.heroStats[0];
                        profile[0].selectedHeroIndex = 0;


                        compareService.getProfile(userId, platform, region, 1)
                            .then(function (data) {
                                if (!data) {
                                    console.log('no data retrieved for profile')
                                }
                                else {
                                    var profile2 = data.profile;
                                    profile2.heroSelector = data.profile.heroStats;
                                    profile2.selectedHero = data.profile.heroStats[0];
                                    profile2.selectedHeroIndex = 0;
                                    profile.push(profile2)
                                    vm.players.push(profile);
                                }


                            });
                    }


                });
        }

        function searchForProfile(userId) {
            var user = userId.name;
            user = user.replace(/\s/g, '');
            user = user.replace('#', '%23');
            compareService.getSearchForProfile(user)
                .then(function (data) {
                    if (!data) {

                    }
                    else {
                        getProfile(data.profile.name, data.profile.platform, data.profile.region, 0);
                    }

                });
        }
    }
})();


