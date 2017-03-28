/**
 * @Author:  dixiao
 * @Date:   2017/3/15.
 *
 */
var vue = {};
var temp = {};
Object.defineProperty(vue, 'userinfo', {
    set: function (n) {
        temp = n;
    },
    get: function () {
        console.log(temp);
    }
});
vue.userinfo = {name: 'aaa',age:11};
vue.userinfo