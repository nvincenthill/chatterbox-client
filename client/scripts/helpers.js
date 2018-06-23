$( window ).on( "load", function() {
    console.log( "window loaded" );
});

let fetchSuccess = (data) => {
  console.log('chatterbox: Messages fetched');
  messages = data;
  console.log(data);
  // console.log(data.results.filter(a => a.username === 'Nick'));
}

let fetchFail = (data) => {
  console.error('chatterbox: Failed to fetch', data);
}

let encodeHTML = (str) => {
  if (str === undefined) {
    str = 'n/a';
  }
  str = str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  return str;
}

let searchByUser = username => {
  return messages.results.filter(a => a.username === username);
}

let createRooms = () => {
  let rooms = [];
  let filtered = messages.results.filter(a => a.roomname);
  for (let prop of filtered) {
    rooms.push(prop.roomname);
  }
  let unique = [...new Set(rooms)]; 
  return unique;
}


