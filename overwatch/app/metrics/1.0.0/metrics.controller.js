(function () {
    'use strict';

    angular
        .module('app.metrics')
        .controller('MetricsController', MetricsController);

    MetricsController.$inject = ['$state', 'common', '$scope', 'initialData', 'metricsService'];

    /* @ngInject */
    function MetricsController($state, common, $scope, initialData, metricsService) {
        /* jshint validthis: true */
        var vm = this;
        var logger = common.logger;

        // Methods
        vm.refreshItem = refreshItem;

        // Initial Load
        vm.initial = initialData.metrics;
        
        vm.data = [{"values": []}];
        
        vm.initial.forEach(function (item) {
            item.month = new Date(item.month).getTime() + new Date().getTimezoneOffset() * 80000;
            vm.data[0].values.push([item.month, item.total]);
        })

        vm.options = {
            chart: {
                type: 'discreteBarChart',
                height: 450,
                width: 800,
                margin: {
                    top: 20,
                    right: 20,
                    bottom: 30,
                    left: 40
                },
                x: function (d) { return d[0]; },
                y: function (d) { return d[1]; },
                useVoronoi: false,
                clipEdge: true,
                duration: 100,
                useInteractiveGuideline: true,
                xAxis: {
                    showMaxMin: false,
                    tickFormat: function (d) {
                        return d3.time.format('%B %Y')(new Date(d))
                    }
                },
                yAxis: {
                    tickFormat: function (d) {
                        return d3.format(',.2f')(d);
                    }
                },
                zoom: {
                    enabled: true,
                    scaleExtent: [1, 10],
                    useFixedDomain: false,
                    useNiceScale: false,
                    horizontalOff: false,
                    verticalOff: true,
                    unzoomEventType: 'dblclick.zoom'
                }
            }
        };

        
        activate();

        ////////////////

        function activate() {
            logger.log('Activated Notifications Sent in View', false);
        }

        function refreshItem() {
            getList();
        }

        /* Calling Data Service */
        function getList() {
            metricsService.getList()
                .then(function (data) {
                    vm.items = data.metrics;
                });
        }
    }
})();