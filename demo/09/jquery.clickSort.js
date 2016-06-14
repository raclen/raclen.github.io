(function($) {
    $.fn.clickSort = function(opts) {
        var defaults = {
            speed: 200 //移动速度
        }
        var option = $.extend(defaults, opts);
        this.each(function() {
            var _this = $(this);
            _this.on('click', '.moveup', function() {
                var parent = $(this).parents('.sortableitem');
                var prevItem = parent.prev('.sortableitem');
                if (prevItem.length == 0) return;
                var parentTop = parent.position().top;
                var prevItemTop = prevItem.position().top;
                parent.css('visibility', 'hidden');
                prevItem.css('visibility', 'hidden');
                parent.clone().insertAfter(parent).css({ position: 'absolute', visibility: 'visible', top: parentTop }).animate({ top: prevItemTop }, option.speed, function() {
                    $(this).remove();
                    parent.insertBefore(prevItem).css('visibility', 'visible');
                    option.callback();
                });
                prevItem.clone().insertAfter(prevItem).css({ position: 'absolute', visibility: 'visible', top: prevItemTop }).animate({ top: parentTop }, option.speed, function() {
                    $(this).remove();
                    prevItem.css('visibility', 'visible');
                });
            });
            _this.on('click', '.movedown', function() {
                var parent = $(this).parents('.sortableitem');
                var nextItem = parent.next('.sortableitem');
                if (nextItem.length == 0) return;
                var parentTop = parent.position().top;
                var nextItemTop = nextItem.position().top;
                parent.css('visibility', 'hidden');
                nextItem.css('visibility', 'hidden');
                parent.clone().insertAfter(parent).css({ position: 'absolute', visibility: 'visible', top: parentTop }).animate({ top: nextItemTop }, option.speed, function() {
                    $(this).remove();
                    parent.insertAfter(nextItem).css('visibility', 'visible');
                    option.callback();
                });
                nextItem.clone().insertAfter(nextItem).css({ position: 'absolute', visibility: 'visible', top: nextItemTop }).animate({ top: parentTop }, option.speed, function() {
                    $(this).remove();
                    nextItem.css('visibility', 'visible');
                });
            });

        });
    }
})(jQuery)
