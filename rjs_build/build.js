({
    baseUrl: '../public/js',
    out: '../public/js/main-build.js',
    name: 'main',
    //optimize: 'none',
    paths: {
        'Zepto': 'dist/zepto/zepto.min',
        'angular': 'dist/angular/angular.min',
        'angular-route': 'dist/angular/angular-route.min',
        'angular-resource': 'dist/angular/angular-resource.min',
        'angular-sanitize': 'dist/angular/angular-sanitize.min',
        'routes': 'routes',
        'controllers': '../controllers/index',
        'services': '../services/index',
        'home-controllers': '../controllers/homeController',
        'feedback-controllers': '../controllers/feedbackController',
        'item-controllers': '../controllers/itemController',
        'module-controllers': '../controllers/module'

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
        }


    }
})