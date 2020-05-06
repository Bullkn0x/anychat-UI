
    var $routes =  $('#routes')

    $routes.on('click', 'a', function () {
        if ($(this).attr('id') != 'menuCollapse') {
        let componentName = $(this).attr('id');
        $('#routes a').removeClass('side-menu--active');
        $(this).addClass('side-menu--active');
        $('.componentMount').load( componentName+ 'PageComponent.html');
        $('#componentTitle').text($(this).text())
        }
    })