let messages = [];
let oldMessages = [];
let friends = [];
let lastTimeStamp = [];
let previousRooms = [];
let rooms = [];


// create a chatterbox chat app
let App = function () {
  this.username;
  this.server = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages';
  this.APIparams = {order: '-createdAt'};
};

// fetch messages from server
App.prototype.fetch = function() {
  $.ajax({
    url: this.server,
    data: this.APIparams,
    type: 'GET',
    dataType: 'json',
    contentType: 'application/json',
    success: fetchSuccess,
    error: fetchFail
  });
};

// send a new message
App.prototype.send = function(data) {
  $.ajax({
    url: this.server,
    type: 'POST',
    data: JSON.stringify(data),
    contentType: 'application/json',
    success: function (data) {
      // console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // console.error('chatterbox: Failed to send message', data);
    }
  });
  
  app.clearMessages();
  setTimeout(() => {
    app.fetch();
    setTimeout(() => {
      for (let i = 0; i < messages.results.length; i++) {
        app.renderMessage(messages.results[i]); 
      }
    }, 1000);
  }, 2000); 
};

// init app
App.prototype.init = function () {

};

// clear all messages
App.prototype.clearMessages = function () {  
  $( '#chats' ).empty();
};

// add messages to the DOM
App.prototype.renderMessage = function (message) {
  let messageUsername = message.username;
  let messageText = message.text;
  messageText = messageText.split('').splice(0, 200).join('');
  
  
  let createdAt = message.createdAt;
  let timeAgo = jQuery.timeago(createdAt);
  createdAt = new Date(encodeHTML(createdAt)).toString();
  createdAt = moment(createdAt).format('dddd, MMMM Do YYYY, h:mm:ss a');
  let roomName = JSON.stringify(message.roomname);

  $('#chats').append(
    `<div class='message animated zoomInRight'>
      <h1 class='username'>${encodeHTML(messageUsername)}</h1>
      <p class='messagetext'>${encodeHTML(messageText)}</p>
      <div class='messagetime'>
        <p class='messagetimestamp'>${createdAt}</p>
        <p class='messagetimeago'>${timeAgo}</p>
      </div>
      <h1 class='roomname'>${roomName}</h1>
      <h1 class='chatter'>chatted in room</h1>
    </div>`);
};

// render a room to the DOM
App.prototype.renderRoom = function (roomName) {
  $( '#roomSelect' ).append(`<div>${JSON.stringify(roomName)}</div>`);
};

// handle a click
App.prototype.handleUsernameClick = function () {

};

// handle message submission
App.prototype.handleSubmit = function () {
  console.log('submitting a new message...');
  let usernamevalue = $( '#usernamevalue' );
  let roomvalue = $( '#roomvalue' );
  let messagevalue = $( '#messagevalue' );
  console.log(usernamevalue, roomvalue, messagevalue);
  let message = {
    username: usernamevalue[0].value,
    text: messagevalue[0].value,
    roomname: roomvalue[0].value
  };
  
  app.send(message);
};

// create app
let app = new App();
app.fetch();

$(document).ready(function() {
    
  $(document).on('click', '.username', () => {
    app.handleUsernameClick();
  });

  $(document).on('submit', '.submit', () => {
    app.handleSubmit();
  });

  $(document).on('click', '.username', (e) => {
    let selectedValue = e.target.innerHTML;
    createFriend(selectedValue);
  });
  
  // handle room select
  $(document).on('change', '#select', (e) => {
    let selectedValue = e.target[e.target.selectedIndex].text;
    let filteredByRoom;
    if (selectedValue === 'All') {
      filteredByRoom = messages.results;
    } else {
      filteredByRoom = searchByQuery('roomname', selectedValue);
    }
    
    // clear messages
    app.clearMessages();
    
    // rerender only room messages
    for (let i = 0; i < filteredByRoom.length; i++) {
      app.renderMessage(filteredByRoom[i]);
    }
    
    // change text of message send form 
    $('#roomvalue').val(selectedValue);
  });
  
  // new message submission click handler
  $('.submit').on('click', () => {
    app.handleSubmit();
  });
    

    
  // var roomSelect = $("#select");
    
  // fetch new messages periodically
  setInterval(() => {
    app.fetch();
  }, 10000);

});

