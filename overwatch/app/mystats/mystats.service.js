/**
 * Created by bnguyen on 6/05/2016.
 */

(function () {
    'use strict';

    angular
        .module('app.layout')
        .factory('myStatsService', myStatsService);

    myStatsService.$inject = ['common', 'SHOW_TOAST'];

    /* @ngInject */
    function myStatsService(common, SHOW_TOAST) {
        var $http = common.$http;
        var logger = common.logger;

        var service = {
            getProfile: getProfile,
            getTopHeroes: getTopHeroes
        };

        return service;

        ////////////////

        function getProfile(userId, platform, region, mode) {
            var url = 'https://api.watcher.gg/players/'+platform+ '/'+region+ '/' + userId+"?mode="+mode;
            return $http.get(url)
                .then(getProfileComplete)
                .catch(getProfileFailed);

            function getProfileComplete(response) {
                return {
                    profile: response.data.data
                };
            }

            function getProfileFailed(error) {
                logger.logError('Could not get Profile Information' + common.jsonMessage(error), SHOW_TOAST);
                return false;
            }
        }

        function getTopHeroes(userId, platform, region, mode) {
            var gameMode = mode           
            var apiUrl = 'https://api.lootbox.eu/'+platform+'/'+region+'/' + userId + '/' + gameMode +'/heroes';
            return $http({
                method: 'GET',
                url: apiUrl,
                headers: {'Content-Type' : 'application/json; charset=UTF-8'},
            })
                .then(getTopHeroesComplete)
                .catch(getTopHeroesFailed);

            function getTopHeroesComplete(response) {
                return {
                    topHeroes: response.data
                };
            }

            function getTopHeroesFailed(error) {
                logger.logError('Could not get Top Hero Information' + common.jsonMessage(error), SHOW_TOAST);
                return false;
            }
        }
    }

})();