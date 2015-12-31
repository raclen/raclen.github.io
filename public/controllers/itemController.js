/**
 * Created by dixiao on 2015/12/16.
 */

define(['module-controllers'], function (controllers) {
    controllers.controller('itemController', ['$scope', '$sce', '$routeParams', 'getContents', function ($scope, $sce, $routeParams, getContents) {
        var item = {
            init: function () {
                var _this = this;
                //文章ID
                var categoryid = $routeParams.categoryID;
                var articleid = $routeParams.articleid;
                this.section = $('<section class="mod model-3"> <div class="spinner"> </div> </section>');
                this.getwenzhang(categoryid, articleid);
                $('#random').on('click', function () {
                    _this.getwenzhang('003');
                })
            },
            getwenzhang: function (c, id) {
                var _this = this;
                var contentsData = {
                    categoryid: c,
                    articleid: id
                };
                $('body').prepend(_this.section);
                getContents.query(contentsData)
                    .$promise.then(function (data) {
                        console.log(data);
                        _this.section.remove();
                        $scope.content = data.items;
                        $scope.thisCanBeusedInsideNgBindHtml = $sce.trustAsHtml(data.items.content);
                        document.body.scrollTop = 0;

                    })

            }
        };
        item.init();
        $(window).scroll(function () {
            var scrollTop = $(this).scrollTop();
            var scrollHeight = $(document).height();
            var windowHeight = $(this).height();
            if (scrollTop + windowHeight + 20 >= scrollHeight) {
                $('.goback').hide();
            }
            else {
                $('.goback').show();
            }
        });

    }])

})







