// let username = 'Nick';
let messages = [];


let App = function () {
  this.username;
  this.server = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages';
  this.APIparams = {order: '-createdAt'};
};

// fetch messages from server
App.prototype.fetch = function() {
  console.log('fetching data...');
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
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message', data);
    }
  });
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
  // console.log(message);
  let messageUsername = message.username;
  let messageText = message.text;
  let createdAt = message.createdAt;
  createdAt = new Date(encodeHTML(createdAt)).toString();
  let roomName = message.roomName;
  
  
  $( '#chats' ).append(
    `<div class='message'>
      <h1 class=' username'>${encodeHTML(messageUsername)}</h1>
      <p>${encodeHTML(messageText)}</p>
      <p>${createdAt}</p>
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
$(document).on('click', '.username', () => {
  app.handleUsernameClick();
});

$(document).on('submit', '.submit', () => {
  app.handleSubmit();
});



$(document).ready(function() {
  console.log( 'document loaded' );

  setTimeout(() => {
      
    for (let i = 0; i < messages.results.length; i++) {
      app.renderMessage(messages.results[i]);
    }
    
    $('.submit').on('click', () => {
      app.handleSubmit();
    });
    
    let rooms = createRooms();
    rooms.forEach((room) => {
      $('#select').append(`
        <option id='${room}" value='${room}'>${room}</option>
        `);
    });
    
    var roomSelect = $("#select");

    $(document).on('change', '#select', (e) => {
      let selectedValue = e.target[e.target.selectedIndex].text;
      let filteredByRoom;
      if (selectedValue === 'All') {
        filteredByRoom = messages.results;
      } else {
        filteredByRoom = searchByQuery('roomname', selectedValue);
      }
      app.clearMessages();
      for (let i = 0; i < filteredByRoom.length; i++) {
        app.renderMessage(filteredByRoom[i]);
      }
      
      // change text of message send form 
      $('#roomvalue').val(selectedValue);
    });
    
  }, 750);
});

