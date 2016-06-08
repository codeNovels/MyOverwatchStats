/**
 * Created by bnguyen on 6/05/2016.
 */

(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('MyStatsController', MyStatsController);

    MyStatsController.$inject = ['$scope', '$state', 'common', 'myStatsService', '$filter'];

    /* @ngInject */
    function MyStatsController($scope, $state, common, myStatsService, $filter) {
        /* jshint validthis: true */
        var vm = this;
        var logger = common.logger;

        // Initial Data Load
        vm.profile = [];
        vm.userId = $state.params.userId
        vm.limitTo = 5;
        vm.profileAvatar = '';

        // For show or hide "Edit/Save" button
        

        // For CM to see if they are able to edit contractQty
        

        // Methods
        vm.seeAllHeroes = seeAllHeroes;


        activate();

        ////////////////

        function activate() {
            getProfile();
        }
        
        function seeAllHeroes(){
            if(vm.limitTo === 5){
                vm.limitTo = 30;
            }
            else{
                vm.limitTo = 5
            }
        }
        
        function stripAndToLower(name){
            switch(name){
               case 'L&#xFA;cio':
                vm.profileAvatar = 'lucio'
               break;
               
               case 'Torbj&#xF6;rn':
                vm.profileAvatar = 'torbjorn'
               break;
               
               case 'Soldier: 76':
                vm.profileAvatar = 'soldier-76'
               break;
               
               case 'D.Va':
                vm.profileAvatar = 'dva'
               break;
               
               default:
                vm.profileAvatar = $filter('lowercase')(name);
               break;
            }
        }


        /* Calling Data Service */
        function getProfile() {
            myStatsService.getProfile(vm.userId)
                .then(function(data) {
                    vm.patchnotes = data.patchnotes;                  
                });
        }
    }
})();


