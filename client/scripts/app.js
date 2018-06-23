// let username = 'Nick';
let messages = [];


let App = function () {
  this.username;
  this.server = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages';
  this.APIFetchparams = ''; // '/where={"createAt":{"$gte":1000,"$lte":0}}'
}

// fetch messages from server
App.prototype.fetch = function() {
  console.log('fetching data...');
  $.ajax({
    url: this.server + this.APIFetchparams,
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

}

// clear all messages
App.prototype.clearMessages = function () {  
  $( "#chats" ).empty();
}

// add messages to the DOM
App.prototype.renderMessage = function (message) {
  // console.log(message);
  let messageUsername = message.username;
  let messageText = message.text;
  let createdAt = message.createdAt;
  let roomName = message.roomName;
  
  
  $( "#chats" ).append(
    `<div>
      <h1 class='username'>${messageUsername}</h1>
      <p>${messageText}</p>
      <p>${createdAt}</p>
    </div>`);
}

// render a room to the DOM
App.prototype.renderRoom = function (roomName) {
  $( "#roomSelect" ).append(`<div>${JSON.stringify(roomName)}</div>`);
}

// handle a click
App.prototype.handleUsernameClick = function () {
  $('#chats').on('click', '.username', () => {
    console.log('clicked');
  })
}

// handle message submission
App.prototype.handleSubmit = function () {
  
}

// create app
var app = new App();

$(document).ready(function() {
    console.log( "document loaded" );
    
    // call for new messages every second
    // setInterval(() => {
      // app.fetch()
    // }, 1000);

    
    setTimeout(function () {
      app.fetch();

    })
    setTimeout(() => {
      for (let i = 0; i < messages.results.length; i++) {
        app.renderMessage(messages.results[i]);
      }
    }, 1000);
});

