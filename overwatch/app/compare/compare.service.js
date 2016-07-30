/**
 * Created by bnguyen on 6/05/2016.
 */

(function () {
    'use strict';

    angular
        .module('app.layout')
        .factory('compareService', compareService);

    compareService.$inject = ['common', 'SHOW_TOAST'];

    /* @ngInject */
    function compareService(common, SHOW_TOAST) {
        var $http = common.$http;
        var logger = common.logger;

        var service = {
            getProfile: getProfile,
            getSearchForProfile: getSearchForProfile
        };

        return service;

        ////////////////

        function getProfile(userId, platform, region, mode) {
            if (mode === undefined){
                var gameMode = 1
            }
            else{
                gameMode = mode
            }
            var url = 'https://api.watcher.gg/players/'+platform+ '/'+region+ '/' + userId+"?mode="+gameMode;
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

        function getSearchForProfile(userId) {
            var url = 'https://api.watcher.gg/players/search/' + userId;
            return $http.get(url)
                .then(getSearchForProfileComplete)
                .catch(getSearchForProfileFailed);

            function getSearchForProfileComplete(response) {
                return {
                    profile : response.data.data[0]
                };
            }

            function getSearchForProfileFailed(error) {
                logger.logError('Could not Find Profile.' + common.jsonMessage(error), SHOW_TOAST);
                return false;
            }
        }
    }

})();