/**
 * Created by dixiao on 2015/12/16.
 */

define(['module-controllers'], function (controllers) {
    controllers.controller('homeController', ['$scope', 'getCategory', function ($scope, getCategory) {
        var section = $('<section class="mod model-3"> <div class="spinner"> </div> </section>');
        var oPage = {
            '001': 1,
            '002': 1,
            '004': 1
        };

        function showhometitle(p, id) {
            var categoryDate = {
                page: p,
                categoryid: id
            };
            $('body').prepend(section);
            getCategory.query(categoryDate)
                .$promise.then(function (data) {
                    console.log(data);
                    section.remove();
                    $scope.categoryList = data.items;
                    $scope.categoryid = $('.category.active').data('categoryid');
                    setinterli('off');
                    setinterli('on');
                    $('.main h1').addClass('animate');
                    //最后一页了
                    if (id === '004') {
                        var tolpage = parseInt(data.pagenum / 10) + 1;
                        if (oPage[id] == tolpage) {
                            $('#next').addClass('dis');

                        }
                    }else{
                        $('#next').hasClass('dis')&&$('#next').removeClass('dis');
                    }


                })

        }

        var animateli = null;

        function setinterli(s) {
            var step = 0;
            if (s === 'on') {
                animateli = setInterval(function () {
                    var li = $('#ul-list li');
                    if (step == li.length) {
                        step = 0;
                    }
                    li.removeClass('ani');
                    li.eq(step).addClass('ani');
                    step++;
                }, 3000)
            } else if (s === 'off') {
                clearInterval(animateli);
            }
        }

        showhometitle(1, '001');

        $('#pre').on('click', function () {
            var categoryid = $('.category.active').data('categoryid');
            var page = oPage[categoryid] = --oPage[categoryid];
            $('#next').removeClass('dis');
            if (oPage[categoryid] == 1) {
                $('.pagination a').eq(0).addClass('dis');
            }
            showhometitle(page, categoryid);

        });
        $('#next').on('click', function () {
            var categoryid = $('.category.active').data('categoryid');
            var page = oPage[categoryid] = ++oPage[categoryid];
            $('.pagination a').removeClass('dis');
            showhometitle(page, categoryid);

        });
        var $main = $('.main');
        var $sidebar = $('.sidebar');
        $('.menu').on('click', function (e) {
            if ($main.hasClass('opend')) {
                $main.removeClass('opend');
                $sidebar.removeClass('animate');
            } else {
                $main.addClass('opend');
                $sidebar.addClass('animate');
            }
            e.stopPropagation();
            e.preventDefault();
        });

        $main.on('click', function (e) {
            if ($main.hasClass('opend')) {
                $main.removeClass('opend');
                $sidebar.removeClass('animate');
                e.stopPropagation();
                e.preventDefault();
            }
        });
        var $category = $('.category');
        $category.on('click', function () {
            var categoryid = $(this).data('categoryid');
            $category.removeClass('active');
            oPage[categoryid] == 1;
            $('.pagination a').eq(0).addClass('dis');
            $(this).addClass('active');
            showhometitle(1, categoryid);
            $main.removeClass('opend');
            $sidebar.removeClass('animate');
        });
        var height = $(window).height();
        $('.main').css('minHeight',height);

    }])

});







