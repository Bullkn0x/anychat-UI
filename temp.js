unction openContextMenu(menuSelector, e) {
    var $window = $(window),
        $sub = menuSelector.find(".submenu");

    $sub.removeClass("oppositeX oppositeY");

    e.preventDefault();

    var w = menuSelector.width();
    var h = menuSelector.height();
    var x = e.clientX;
    var y = e.clientY;
    var ww = $window.width();
    var wh = $window.height();
    var padx = 30;
    var pady = 20;
    var fx = x;
    var fy = y;
    var hitsRight = (x + w >= ww - padx);
    var hitsBottom = (y + h >= wh - pady);

    if (hitsRight) {
        fx = ww - w - padx;
    }

    if (hitsBottom) {
        fy = wh - h - pady;
    }

    menuSelector
        .css({
            left: fx - 1,
            top: fy - 1
        });

    var sw = $sub.width();
    var sh = $sub.height();
    var sx = $sub.offset().left;
    var sy = $sub.offset().top;
    var subHitsRight = (sx + sw - padx >= ww - padx);
    var subHitsBottom = (sy + sh - pady >= wh - pady);

    if (subHitsRight) {
        $sub.addClass("oppositeX");
    }

    if (subHitsBottom) {
        $sub.addClass("oppositeY");
    }

    menuSelector.addClass("is-visible");

    $doc.on("mousedown", function (e) {

        var $tar = $(e.target);

        if (!$tar.is(menuSelector) && !$tar.closest(".context").length) {

            menuSelector.removeClass("is-visible");
            $doc.off(e);

        }

    });

}