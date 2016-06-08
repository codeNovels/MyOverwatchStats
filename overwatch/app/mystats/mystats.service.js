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
            getProfile: getProfile
        };

        return service;

        ////////////////

        function getProfile(userId) {
            var url = 'https://api.watcher.gg/players/pc/us/' + userId;
            return $http.get(url)
                .then(getProfileComplete)
                .catch(getProfileFailed);

            function getProfileComplete(response) {
                return {
                    profile : response.data.data
                };
            }

            function getProfileFailed(error) {
                logger.logError('Could not get Profile Information' + common.jsonMessage(error), SHOW_TOAST);
                return false;
            }
        }
    }

})();