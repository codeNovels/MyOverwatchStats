/**
 * Created by bnguyen on 6/05/2016.
 */

(function () {
    'use strict';

    angular
        .module('app.layout')
        .factory('searchService', searchService);

    searchService.$inject = ['common', 'SHOW_TOAST'];

    /* @ngInject */
    function searchService(common, SHOW_TOAST) {
        var $http = common.$http;
        var logger = common.logger;

        var service = {
            getList: getList
        };

        return service;

        ////////////////

        function getList(ticketId) {
            var url = 'https://api.watcher.gg/players/pc/us/php%231783' ;
            return $http.get(url)
                .then(getListComplete)
                .catch(getListFailed);

            function getListComplete(response) {
                return {
                    profile : response.data.data
                };
            }

            function getListFailed(error) {
                logger.logError('Could not get Catalogs Initial Setting.' + common.jsonMessage(error), SHOW_TOAST);
                return false;
            }
        }

    }

})();