define(["./module"],function(e){e.controller("feedbackController",["$scope","submitfeedback",function(e,t){$("#btn-submit").on("click",function(){var e=$("#feedbackMessage").val(),n=$("#contact").val();if(""==$.trim(e))return void alert("意见信息不能为空");if(""==$.trim(n))return void alert("填一下联系方式呗");var i={feedbackMessage:e,contact:n};$("#btn-submit").addClass("dis"),t.query(i).$promise.then(function(e){$("#btn-submit").removeClass("dis"),alert("感谢您的反馈，确定后跳转到首页"),location.href="#/home"})})}])});