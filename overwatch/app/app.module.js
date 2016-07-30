(function () {
    'use strict';

    // Create our angular app and inject ui-router, ui.bootstrap, .....
    var app = angular
        .module('crntApp', [
            /*
             * Order is not important. Angular makes a
             * pass to register all of the modules listed
             * and then when app.dashboard tries to use app.data,
             * it's components are available.
             */

             /*
              * Everybody has access to these.
              * We could place these under every feature area,
              * but this is easier to maintain.
              */
            'acsys.core'
            /*
             * Specific Feature areas
             */
            ,'app.layout'
            ,'app.config'
           // ,'app.userService'
            ,'nvd3'     
         ]);

    // Configuring our routes
    app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', 'LOCAL_CDN',
        function($stateProvider, $urlRouterProvider, $httpProvider, LOCAL_CDN) {

        $urlRouterProvider.otherwise("/home/leader-boards");

        $stateProvider
            .state('login',         {url: '/login', templateUrl: 'app/login/login.html', controller: 'LoginController', controllerAs: "vm", data: { pageTitle: 'Login', specialClass: 'gray-bg' } })
            //.state('refresh',         {url: '/refresh', templateUrl: 'app/login/login.html', controller: 'LoginController', controllerAs: "vm", data: { pageTitle: 'Login', specialClass: 'gray-bg' } })
            //.state('register',      {url: '/register', templateUrl: 'app/register/register.html', controller: 'RegisterController', controllerAs: "vm", data: { pageTitle: 'Register', specialClass: 'gray-bg' } })

            .state('401',     {url: '/401', templateUrl: LOCAL_CDN + "/assets/http-error/1.0.0/error-401.html", data: { pageTitle: '401', specialClass: 'gray-bg' } })
            .state('403',     {url: '/403', templateUrl: LOCAL_CDN + "/assets/http-error/1.0.0/error-403.html", data: { pageTitle: '403', specialClass: 'gray-bg' } })
            .state('404',     {url: '/404', templateUrl: LOCAL_CDN + "/assets/http-error/1.0.0/error-404.html", data: { pageTitle: '404', specialClass: 'gray-bg' } })
            .state('500',     {url: '/500', templateUrl: LOCAL_CDN + "/assets/http-error/1.0.0/error-500.html", data: { pageTitle: '500', specialClass: 'gray-bg' } })

                                                                                                                                                                                               
            .state('home',          { url: "/home",     templateUrl: "app/layout/shell.html", controller: "ShellController", controllerAs: "vm", abstract: true })
            .state('home.patchnotes',  {url: "/patch-notes",   templateUrl: "app/patch-notes/patch-notes.html" , controller: 'PatchNotesController', controllerAs: "vm",data: { pageTitle: 'Patch Notes' }
                                                                    }) 
            .state('home.mystats',  {url: "/mystats/:platform/:region/:userId",   templateUrl: "app/mystats/mystats.html" , controller: 'MyStatsController', controllerAs: "vm",data: { pageTitle: 'My Stats' }
                                                                    }) 
            .state('home.heroes',  {url: "/heroes",   templateUrl: "app/heroes/heroes.html" , controller: 'HeroesController', controllerAs: "vm",data: { pageTitle: 'Heroes' }
                                                                    })  
            .state('home.compare',  {url: "/compare",   templateUrl: "app/compare/compare.html" , controller: 'CompareController', controllerAs: "vm",data: { pageTitle: 'Compare' }
                                                                    })
            .state('home.leaderBoards',  {url: "/leader-boards",   templateUrl: "app/leader-board/leader-board.html" , controller: 'LeaderBoardController', controllerAs: "vm",data: { pageTitle: 'Search' }
                                                                    })                                                                                                                                                                             
                                                                                                                                   
        }
    ]);

    // Intercept all http request
    app.config(['$httpProvider', function ($httpProvider) {
        //Enable cross domain calls (Chrome doesn't allow localhost..
        //Solution:  Edit host file to map 127.0.0.1 to acsys.com:8888
        //           Running the webApi from acsys.com:8888/universal-apis/api
        //           Running web client from acsys.com:888/universal
        // $httpProvider.defaults.useXDomain = true;
        // $httpProvider.defaults.withCredentials = true;
        // //Remove the header used to identify ajax call  that would prevent CORS from working
         delete $httpProvider.defaults.headers.common['X-Requested-With'];
         $httpProvider.defaults.headers.common["Accept"] = "application/json, text/plain, */*";
         $httpProvider.defaults.headers.common["Content-Type"] = "application/json, charset=utf-8";
        // // Disable IE ajax request caching
        // $httpProvider.defaults.headers.common['Cache-Control'] = 'no-cache';
        // $httpProvider.defaults.headers.common['Pragma'] = 'no-cache';
        // $httpProvider.defaults.cache = false;

    }]);

    // Remove hash tags in the url
    /*
    app.config(["$locationProvider", function($locationProvider) {
        $locationProvider.html5Mode(true);
    }]);
    */
    app.config(['$logProvider', function ($logProvider) {
        // turn debugging off/on (no info or warn)
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(false);
        }
    }]);

    app.config(['$translateProvider', function ($translateProvider) {
        $translateProvider.preferredLanguage('en');
        // Enable escaping of HTML
        $translateProvider.useSanitizeValueStrategy('sanitize');
    }]);
    

    app.run(['$rootScope', '$state', '$location', function($rootScope, $state , $location) {
        $rootScope.$state = $state;
        TrNgGrid.defaultPagerMinifiedPageCountThreshold = 4;

        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            console.log(error);
            switch (error.status) {
                case 401:
                    // Unauthorized Access
                    $state.transitionTo('401');
                    break;
                case 403:
                    // Forbidden Access
                    $state.transitionTo('403');
                    break;
                case 404:
                    // Page Not Found
                    $state.transitionTo('404');
                    break;
                case 500:
                    // Internal Server Error
                    $state.transitionTo('500');
                    break;
                default:
                    // Redirect to home page
                    $state.transitionTo('home.leaderBoards');
            }
        });

    }]);

})();