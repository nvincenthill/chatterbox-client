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

let encodeHTML = (s) => {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

let searchByUser = username => {
  return messages.results.filter(a => a.username === username);
}


