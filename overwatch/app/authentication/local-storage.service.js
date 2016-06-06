/**
 * Created by cwun on 5/29/2015.
 */
(function () {
    'use strict';

    angular.module('app.userService')
        .factory('localStorageService', localStorageService);

    localStorageService.$inject = ['$window'];

    function localStorageService($window) {
        var store = $window.localStorage;
        var service = {
            add: add,
            get: get,
            remove: remove
        };

        return service;

        function add(key, value) {
            value = angular.toJson(value);
            store.setItem(key, value);
        }

        function get(key) {
            var value = store.getItem(key);
            if (value) {
                value = angular.fromJson(value);
            }
            return value;
        }

        function remove(key) {
            store.removeItem(key);
        };
    }

})();
