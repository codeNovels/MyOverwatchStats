/**
 * Created by cwun on 8/21/2015.
 */
(function () {
    'use strict';

    angular
        .module('app.metrics')
        .factory('metricsService', metricsService);

    metricsService.$inject = ['common', 'crntConfig', 'EditPvmListModel', 'RESO_SERVER', 'SHOW_TOAST'];

    /* @ngInject */
    function metricsService(common, config, EditPvmListModel, RESO_SERVER, SHOW_TOAST) {
        var $http = common.$http;
        var logger = common.logger;
        //var apiUrl = common.serviceUrl(RESO_SERVER, config.apiServices.metrics);

        var service = {
            getList: getList
        };

        return service;

        ////////////////

        function getList() {
            var url = 'https://api.lootbox.eu/patch_notes';
            return $http.get(url)
                .then(getListComplete)
                .catch(getListFailed);

            function getListComplete(response) {
               // var data = response.data.items.length === 0 ? [] : common.transform(response.data.items, EditPvmListModel);
                return {
                    metrics: response.data
                }
            }

            function getListFailed(error) {
                logger.logError('Could not get Work List.' + common.jsonMessage(error), SHOW_TOAST);
              //  return new EditPvmListModel();
            }
        }
    }

})();