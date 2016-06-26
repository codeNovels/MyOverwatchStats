/**
 * Created by bnguyen on 6/05/2016.
 */

(function () {
    'use strict';

    angular
        .module('app.layout')
        .factory('leaderBoardService', leaderBoardService);

    leaderBoardService.$inject = ['common', 'SHOW_TOAST'];

    /* @ngInject */
    function leaderBoardService(common, SHOW_TOAST) {
        var $http = common.$http;
        var logger = common.logger;

        var service = {
            getSearchForProfile: getSearchForProfile
            ,getList: getList
        };

        return service;

        ////////////////

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

        function getList() {
            var url = 'https://api.watcher.gg/leaderboards/featured';
            return $http.get(url)
                .then(getListComplete)
                .catch(getListFailed);

            function getListComplete(response) {
                return {
                    leaderBoards: response.data.data
                };
            }

            function getListFailed(error) {
                logger.logError('Could not get Leader Boards.' + common.jsonMessage(error), SHOW_TOAST);
                return false;
            }
        }
    }

})();