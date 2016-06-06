(function () {
    'use strict';

    var common = angular.module('app.config');

    var apiServices = {
        notificationSentList: 'sents',
        editNotificationsList: 'notifications',
        editPvmList: 'pvms',
        metrics: 'statistics/total-sent-per-month',
        currentUser: 'users/current'
    };

    var crntConfig = {
        appErrorPrefix: '[CRNT Tool Error] ', //Configure the exceptionHandler decorator
        apiServices: apiServices,
        version: '1.0.0'
    };

    common.constant('crntConfig', crntConfig);

})();
