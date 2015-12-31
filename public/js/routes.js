define(['angular','angular-route','angular-resource','angular-sanitize'],function(ng){
    var appinit =  ng.module('appinit', ['ngRoute', 'ngResource','ngSanitize','app.controllers','app.services']);
    appinit.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/home',{
            templateUrl:'view/home.html',
            controller:'homeController'
        }).when('/item/:categoryID/:articleid',{
            templateUrl:'view/item.html',
            controller:'itemController'
        }).when('/feedback',{
            templateUrl:'view/feedback.html',
            controller:'feedbackController'
        })
            .otherwise({ redirectTo: '/home'});
    }])
})



