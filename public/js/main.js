/**
 * Created by dixiao on 2015/12/16.
 */
require.config({
    baseUrl: 'js/',
    paths: {
        'Zepto': 'dist/zepto/zepto.min',
        'angular': 'dist/angular/angular.min',
        'angular-route': 'dist/angular/angular-route.min',
        'angular-resource': 'dist/angular/angular-resource.min',
        'angular-sanitize': 'dist/angular/angular-sanitize.min',
        'routes': 'routes',
        'controllers': '../controllers/index',
        'services': '../services/index'

    },

    /**
     * for libs that either do not support AMD out of the box, or
     * require some fine tuning to dependency mgt'
     */
    shim: {
        'angular': {
            exports: 'angular'
        },
        'angular-route': {
            deps: ['angular']
        },
        'angular-resource': {
            deps: ['angular']
        },
        'angular-sanitize':{
            deps: ['angular']
        },
        'controllers': {
            deps: ['angular','routes', 'Zepto','services']
        }


    }
});
require(["angular", "controllers"], function (ng) {
    //ng.bootstrap手动注册app，使用require，要使用上
    ng.bootstrap(document, ['appinit']);
});
