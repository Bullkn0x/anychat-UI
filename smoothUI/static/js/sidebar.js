
// Selectors
var $serverList = $('.serverList');
var $serverIconList = $('#serverIcons');
//  Modals
var $discoverModal = $("#discoverModal");
var $createModal = $("#newServerModal");
var $leaveModal = $("#leaveConfirmModal");
var $serverOptionModal = $("serverOptionModal");

// Side Menu Selector for modals
var $discoverBtn = $("#discoverServer");
var $createBtn = $("#createServer");
//temporary help button'
var $helpBtn = $("#help");


var $notificationBubble =  '<div class="notificationBubble bg-theme-9 absolute rounded-full border-2" style="display: flex;right: 36px;position: relative;justify-content: center;height: 25.2px;top: 44px;min-width: 30px !important;font-style: italic;border-color: #343a40;background-color: #33c4f6;border-width: 3px;">1</div>'


function SidebarCollapse() {
    $('.menu-collapsed').toggleClass('d-none');
    $('.sidebar-submenu').toggleClass('d-none');
    $('.submenu-icon').toggleClass('d-none');
    $('#sidebar-container').toggleClass('sidebar-expanded sidebar-collapsed');

    // Treating d-flex/d-none on separators with title
    var SeparatorTitle = $('.sidebar-separator-title');
    if (SeparatorTitle.hasClass('d-flex')) {
        SeparatorTitle.removeClass('d-flex');
    } else {
        SeparatorTitle.addClass('d-flex');
    }

    // Collapse/Expand icon
    $('#collapse-icon').toggleClass('fa fa-angle-double-left fas fa-angle-double-right');
}

socket.on('new server', function (server) {
    var $serverIcon = $('<img />').attr("src", server.room_logo_url);

    var $imgDiv = $('<img />').attr("src", server.room_logo_url).css({
        "max-height": "133%",
        "border-radius": "16%",
        "margin-right": "10px",
    });

    var $serverNameDiv = $('<span class="menu-collapsed"/>')
        .text(server.room_name);
    var $tableCellDiv = $('<a href="#" class="list-group-item list-group-item-action bg-dark">').attr('room_id', server.room_id).append($imgDiv).append($serverNameDiv);
    $serverList.append($tableCellDiv);
    $serverIconList.append($('<a/>')
        .attr({ 'room_id': server.room_id, 'room_name': server.room_name })

        .append($serverIcon
            .css({
                "border-color": server.color
            })
        ));
    $tableCellDiv.click();

});

socket.on('server info', function (data) {
    $serverList.html('');
    $serverIconList.html('');
    data.server_list.forEach(function (server) {
        console.log(server.color)
        var $serverIcon = $('<img />').attr("src", server.room_logo_url);
        var $imgDiv = $('<img />').attr("src", server.room_logo_url)
            .css({
                "max-height": "133%",
                "border-radius": "16%",
                "margin-right": "10px",
                "border-color": server.color
            });
        var $serverNameDiv = $('<span class="menu-collapsed"/>')
            .text(server.room_name);
        var $tableCellDiv = $('<a />')
            .addClass('list-group-item your-server list-group-item-action')
            .attr('room_id', server.room_id)
            .append($imgDiv, $serverNameDiv);
        $serverList.append($tableCellDiv);

        $serverIconList.append($('<a/>')
            .attr({ 'room_id': server.room_id, 'room_name': server.room_name })

            .append($serverIcon
                .css({
                    "border-color": server.color
                }),
            ));
    });
});

socket.on('notification', function (data) {
    if (data.type == 'server_message') {
        let room_id = data.room_id;
        var notification = $('#serverIcons a[room_id=' +room_id +'] .notificationBubble'); 

        if (notification.length) {
            notification.html(parseInt(notification.html(), 10)+1)
        }
        else {
            $('#serverIcons a[room_id=' +room_id +']').append($notificationBubble);
        }

    }

});

// Handle ServerList Clicks 
$serverList.on('click', 'a', function () {
    joinRoom = $(this).text();
    joinRoomID = $(this).attr('room_id');
    socket.emit('join server', {
        "username": username,
        "roomID": joinRoomID,
        "room": joinRoom
    });

});

// Handle serverIcon Clicks 


$('#menuCollapse').on('click', function () {
    $('nav').toggleClass('side-nav--simple');
    $('.brandName').toggle();
    $(this).find('svg.feather-arrow-right').replaceWith(feather.icons.square.toSvg());
})


$serverIconList.on('click', 'a', function () {
    joinRoom = $(this).text();
    joinRoomID = $(this).attr('room_id');
    $(this).children('.notificationBubble').remove(); 
    socket.emit('join server', {
        "username": username,
        "roomID": joinRoomID,
        "room": joinRoom
    });

});




$('#serverIcons').on("mouseenter", "a", function () {
    var yPos = $(this).position().top + $(this).outerHeight() / 2
    var serverHoverDivHeight = 12
    var divPosY = yPos + serverHoverDivHeight / 2
    var $serverHoverDiv = $('<a/>')
        .addClass('hvr-bubble-left')
        .attr('id', 'tempHover')
        .css({
            "padding": "3px 9px",
            "position": "absolute",
            "background-color": "var(--heading-color)",
            "color": "var(--font-color)",
            "top": divPosY + "px",
            "left": "87px",
            "z-index": 50,
            "border-radius": "4px",
            "box-shadow": "3px 4px 6px 0px rgba(0,0,0,0.75)"
        }).text($(this).attr('room_name'))

    $('body').append($serverHoverDiv);
});

$('#serverIcons').on("mouseleave", "a", function () {
    $('#tempHover').remove();

});



// When the user clicks the button, open the modal 
$discoverBtn.on('click', function () {
    $discoverModal.css('display', "flex");
    $('#search-heading').addClass('animated fadeIn')
    $options.addClass('animated slideInDown delay-1s');
});

//Leave Server Modal AREA ------------
//Temp button to bring up the modal
$helpBtn.on('click', function () {
    $leaveModal.css('display', 'flex');
});

//When right click on all the servers on the serverList... Do something HERE...
//Currently Returns the text and room_id of which ever you click on
//(Think of a way to use the information and pass the arguments)
$(document).on("contextmenu", ".your-server", function (e) {
    alert($(this).text());
    alert($(this).attr('room_id'));
    $(this).on()
    $serverOptionModal.css('display', "flex");

    return false;
});

