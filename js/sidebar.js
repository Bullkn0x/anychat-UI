
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




// Hide submenus
$('#body-row .collapse').collapse('hide');

// Collapse/Expand icon
$('#collapse-icon').addClass('fa-angle-double-left');

// Collapse click
$('[data-toggle=sidebar-colapse]').click(function () {
    SidebarCollapse();
});



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
    $('#collapse-icon').toggleClass('fa-angle-double-left fa-angle-double-right');
}

socket.on('new server', function (server) {

    var $imgDiv = $('<img />').attr("src", server.room_logo_url).css({
        "max-height": "133%",
        "border-radius": "16%",
        "margin-right": "10px",
    });

    var $serverNameDiv = $('<span class="menu-collapsed"/>')
        .text(server.room_name);
    var $tableCellDiv = $('<a href="#" class="list-group-item list-group-item-action bg-dark">').attr('room_id', server.room_id).append($imgDiv).append($serverNameDiv);
    $serverList.append($tableCellDiv);
    $tableCellDiv.click();

});

socket.on('server info', function (data) {
    console.log(data);
    $serverList.html('');
    $serverIconList.html('');
    data.server_list.forEach(function (server) {
        var $serverIcon = $('<img />').attr("src", server.room_logo_url);
        var $imgDiv = $('<img />').attr("src", server.room_logo_url)
            .css({
                "max-height": "133%",
                "border-radius": "16%",
                "margin-right": "10px",
            });
        var $serverNameDiv = $('<span class="menu-collapsed"/>')
            .text(server.room_name);
        var $tableCellDiv = $('<a />')
            .addClass('list-group-item your-server list-group-item-action')
            .attr('room_id', server.room_id)
            .append($imgDiv, $serverNameDiv);
        $serverList.append($tableCellDiv);

        $serverIconList.append($('<a/>').attr({ 'room_id': server.room_id, 'room_name': server.room_name }).append($serverIcon));
    });
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

$serverIconList.on('click', 'a', function () {
    joinRoom = $(this).text();
    joinRoomID = $(this).attr('room_id');
    socket.emit('join server', {
        "username": username,
        "roomID": joinRoomID,
        "room": joinRoom
    });

});



$('#serverIcons').on("mouseenter", "a", function() {
    var yPos = $(this).position().top + $(this).outerHeight() / 2
    console.log(yPos);
    var serverHoverDivHeight = 24
    var divPosY = yPos - serverHoverDivHeight/2
    var $serverHoverDiv = $('<div/>')
        .attr('id','tempHover')
        .css({
            "position": "absolute",
            "background-color": "red",
            "top": divPosY + "px",
            "left": "87px",
            "z-index": 2,
            "height": "24px"
        }).text($(this).attr('room_name'))
    $('body').append($serverHoverDiv);
});

$('#serverIcons').on("mouseleave", "a", function() {
    $('#tempHover').remove();

});

$('#serverIcons').on('click', 'a', function () {
    var yPos = $(this).position().top + $(this).outerHeight() / 2
    console.log(yPos);
    var serverHoverDivHeight = 24
    var divPosY = yPos - serverHoverDivHeight/2
    var $serverHoverDiv = $('<div/>')
        .css({
            "position": "absolute",
            "background-color": "red",
            "top": divPosY + "px",
            "left": "87px",
            "z-index": 2,
            "height": "24px"
        }).text('hello')
    $('body').append($serverHoverDiv);

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