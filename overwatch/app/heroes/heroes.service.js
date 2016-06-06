/**
 * Created by bnguyen on 6/05/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.layout')
        .factory('heroesService', heroesService);

    heroesService.$inject = ['common', 'SHOW_TOAST'];

    /* @ngInject */
    function heroesService(common, SHOW_TOAST) {
        var $http = common.$http;
        var logger = common.logger;

        var service = {
            getList: getList
        };

        return service;

        ////////////////

        function getList(ticketId) {
            var url = 'https://api.lootbox.eu/patch_notes';
            return $http.get(url)
                .then(getListComplete)
                .catch(getListFailed);

            function getListComplete(response) {
                return {
                    patchnotes : response.data
                };
            }

            function getListFailed(error) {
                logger.logError('Could not get Catalogs Initial Setting.' + common.jsonMessage(error), SHOW_TOAST);
                return false;
            }
        }

    }

})();