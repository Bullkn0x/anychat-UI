 // Get the modal
 var $modal = $("#myModal");
                            
 // Get the button that opens the modal
 var $btn = $(".addServer");
 
 // Get the <span> element that closes the modal
 var span = $("close")[0];
 
 var $options = $('.search-options');

 //Gets the Create Server button class
 var createButton = document.querySelector("#createServer");

 //Gets the Modal that creates a new server
 var createModal= document.getElementById("newServerModal");

 // Select the create button which has 
 var $createSubmit = $("#createServerSubmit");

 var $serverName = $("#serverName");

 //As Soon as user click submit, exit the modal.
 $createSubmit.on('click' , function(){
    if($serverName.val()){
      createModal.style.display="none";
      alert($serverName.val())
      $serverName.clear();
      var room_name=$serverName.val();
      socket.emit('create server', {
        'room_name':room_name
    });
    }
  });



 createModal.onclick = function(e){
  if(e.target == e.currentTarget){
    createModal.style.display="none";
  }
 }



 //When the Create a server button is clicked, Modal is displayed.
 createButton.onclick = function(){
  createModal.style.display = "block";
 }

 // When the user clicks the button, open the modal 
 $btn.on('click', function() {
   $modal.css('display', "flex");
   $('#search-heading').addClass('animated fadeIn')
   $options.addClass('animated slideInDown delay-1s');
 });
 
 // When the user clicks on <span> (x), close the modal
 $("#myModal").click( function(e) {
    if(e.target == e.currentTarget) {
        $modal.css('display', "none");
    }
});

