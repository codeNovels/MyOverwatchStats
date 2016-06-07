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
            getFeaturedStats: getFeaturedStats,
            getTopHeroes: getTopHeroes
        };

        return service;

        ////////////////

        function getProfile(userId) {
            var url = 'https://api.lootbox.eu/pc/us/' + userId +'/profile';
            return $http.get(url)
                .then(getProfileComplete)
                .catch(getProfileFailed);

            function getProfileComplete(response) {
                return {
                    profile : response.data.data
                };
            }

            function getProfileFailed(error) {
                logger.logError('Could not get Catalogs Initial Setting.' + common.jsonMessage(error), SHOW_TOAST);
                return false;
            }
        }
        
        function getFeaturedStats(userId) {
            var url = 'https://api.lootbox.eu/pc/us/' + userId +'/allHeroes/';
            return $http.get(url)
                .then(getFeaturedStatsComplete)
                .catch(getFeaturedStatsFailed);

            function getFeaturedStatsComplete(response) {
                return {
                    featuredStats : response.data
                };
            }

            function getFeaturedStatsFailed(error) {
                logger.logError('Could not get Catalogs Initial Setting.' + common.jsonMessage(error), SHOW_TOAST);
                return false;
            }
        }
        
        function getTopHeroes(userId) {
            var url = 'https://api.lootbox.eu/pc/us/' + userId +'/heroes';
            return $http.get(url)
                .then(getTopHeroesComplete)
                .catch(getTopHeroesFailed);

            function getTopHeroesComplete(response) {
                return {
                    topHeroes : response.data
                };
            }

            function getTopHeroesFailed(error) {
                logger.logError('Could not get Catalogs Initial Setting.' + common.jsonMessage(error), SHOW_TOAST);
                return false;
            }
        }

    }

})();