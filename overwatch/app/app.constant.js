/**
 * Created by cwun on 8/19/2015.
 */
(function () {
    'use strict';

    angular
    .module('crntApp')
    .constant('LOCAL_CDN', '//localhost/cdn')
    //.constant('RESO_SERVER', '//localhost/cr-notification-apis')
    .constant('FILE_VIRTUAL_PATH', '//localhost/file-server/demo')
    .constant('CLIENT_ID', 'crntApp')
    .constant('FILE_EXTENSION', '.jpeg, .jpg, .png, .gif, .pdf, .doc, .txt, .docx, .xls, .xlsx')
    .constant('API_BASE', 'tickets')
    .constant('STATE_BASE', 'ticket')
    .constant('SHOW_TOAST', false)
    .constant('VIEW_TYPE', {
        internals: {
            false: {id: 0, color: 'charcoal-bg', icon: 'fa fa-unlock', btn: 'btn-charcoal'}
            ,true: {id: 1, color: 'orange-bg', icon: 'fa fa-lock', btn: 'btn-orange'}
        }})
})();
