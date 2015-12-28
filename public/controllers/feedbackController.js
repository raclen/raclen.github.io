/**
 * Created by dixiao on 2015/12/16.
 */

define(['module-controllers'], function (controllers) {
    controllers.controller('feedbackController', ['$scope', 'submitfeedback', function ($scope, submitfeedback) {
        $('#btn-submit').on('click', function () {
            var feedbackMessage = $('#feedbackMessage').val();
            var contact = $('#contact').val();
            if ($.trim(feedbackMessage) == '') {
                alert('意见信息不能为空');
                return;
            }
            if ($.trim(contact) == '') {
                alert('填一下联系方式呗');
                return;
            }
            var data = {
                feedbackMessage: feedbackMessage,
                contact: contact
            };
            $('#btn-submit').addClass('dis');
            submitfeedback.query(data)
                .$promise.then(function (data) {
                    // console.log(data)
                    $('#btn-submit').removeClass('dis');
                    alert('感谢您的反馈，确定后跳转到首页');
                    location.href = '#/home';
                })

        })

    }])

})







