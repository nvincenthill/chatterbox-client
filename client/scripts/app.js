// YOUR CODE HERE:
// endpoint = http://parse.sfm8.hackreactor.com/chatterbox/classes/messages

let endpoint = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages'

// example AJAX request

$(document).ready(function() {
    console.log( "document loaded" );
    setInterval(() => {
      retrieveMessages()}, 1000);
})

$( window ).on( "load", function() {
    console.log( "window loaded" );
});

let retrieveMessages = function() {
  $.ajax({
    url: endpoint,
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {
      console.log(data);
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message', data);
    }
  });
};


let success = () => {
  console.log('got data');
}

let fail = () => {
  console.log('failed');
}
