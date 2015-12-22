/**
 * Created by dixiao on 2015/12/16.
 */
define(['angular'],function(ng){
    var services = ng.module('app.services', []);
    //var BASE_URL = '';
    var BASE_URL='http://raclen-wenzhang.coding.io';
    var GET_CATEGORY_API = BASE_URL + '/category';
    var GET_CONTENTS_API = BASE_URL + '/contents';
    var SUBMIT_FEEDBACK_API = BASE_URL+'/submitfeedback';
    services.factory('getCategory', ['$resource', function($resource) {
        return $resource(GET_CATEGORY_API, {}, {query: {method: 'JSONP', params: {callback:'JSON_CALLBACK'}}});
    }]);
    services.factory('getContents', ['$resource', function($resource) {
        return $resource(GET_CONTENTS_API, {}, {query: {method: 'JSONP', params: {callback:'JSON_CALLBACK'}}});
    }]);
    services.factory('submitfeedback', ['$resource', function($resource) {
        return $resource(SUBMIT_FEEDBACK_API, {}, {query: {method: 'POST', params: {}}});
    }]);

});