/**
 * Created by cwun on 5/26/2015.
 */
(function () {
    'use strict';

    angular
        .module('app.userService')
        .factory('crntUserService', crntUserService);

    crntUserService.$inject = ['$q', '$window', 'localStorageService', 'RESO_SERVER', 'crntConfig', 'common', '$http'];

    /* @ngInject */
    function crntUserService($q, $window, localStorageService, RESO_SERVER, crntConfig, common, $http) {
        var user;
        var apiUrl = common.serviceUrl(RESO_SERVER, crntConfig.apiServices.currentUser);

        var service = {
            login: login,
            getUserADId: getUserAdId
        };

        return service;

        
            



        function login() {
            // Check if the user already exists for this session
            if (user) {
                return $q.when(user); // resolve with given value, necessary because calling function expects a promise
            }

            user = localStorageService.get("CRNotificationTrackerUser");
            if (user) {
                console.log("user retrieved from storage");
                return $q.when(user);
            }
            //appSpinner.showSpinner('Authentication...');
            return $q.all([
                $http.get(apiUrl)
            ]).then(function (results) {
                //appSpinner.hideSpinner();
                user = {
                    displayName: results[0].data.displayName,
                    adId: results[0].data.adId,
                };

                //addUserToStorage();
                localStorageService.add("CRNotificationTrackerUser", user);

                console.log("user created and saved in storage");
                return $q.when(user);
            });
        }

        function getUserAdId() {
            if (user) {
                return user.adId; // resolve with given value, necessary because calling function expects a promise
            }

            //user = getUserFromStorage();
            user = localStorageService.get("CRNotificationTrackerUser");
            if (user) {
                console.log("user retrieved from storage");
                return user.adId;
            }
            return user.adId;
        }
        /*
        function addUserToStorage() {
            $window.sessionStorage["CRNotificationTrackerUser"] = JSON.stringify(user);
        }

        function getUserFromStorage() {
            if ($window.sessionStorage["CRNotificationTrackerUser"]) {
                return JSON.parse($window.sessionStorage["CRNotificationTrackerUser"]);
            }
            return null;
        }
        */
    }

})();