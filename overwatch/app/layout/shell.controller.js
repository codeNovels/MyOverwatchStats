(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('ShellController', ShellController);

    ShellController.$inject = ['common', '$rootScope'];

    /* @ngInject */
    function ShellController(common, $rootScope) {
        /* jshint validthis: true */
        var vm = this;
        var logger = common.logger;

        vm.activate = activate;
        vm.title = 'ShellController';

        vm.showSpinner = false;
        vm.spinnerMessage = 'Retrieving data...';
        vm.spinnerOptions = {
            radius: 40,
            lines: 8,
            length: 0,
            width: 30,
            speed: 1.7,
            corners: 1.0,
            trail: 100,
            color: '#428bca'
        };

        activate();

        ////////////////

        function activate() {
            logger.log('Crnt loaded!', false);
            
            // return crntUserService.login().then(function (data) {
            //     $rootScope.crntUser = data;
            // })
        }

        $rootScope.$on('spinner.toggle', function (event, args) {
            vm.showSpinner = args.show;
            if (args.message) {
                vm.spinnerMessage = args.message;
            }
        });

    }
})();