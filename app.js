var request = require('request');

var options = {
  url: 'https://api.getbase.com/v2/deals?per_page=100',
  headers: {
    'Authorization': 'Bearer 9573ec936f46b85ec07e3bf495d16798954525cbce9d929e5451dd73a0148862',
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'User-Agent': 'node'
  }
};

function httpGET() {
  request.get(options, callback);
}

function callback(error, response, body) {
  if (!error && response.statusCode === 200) {
    var current = options.url;
    iterate(body);
    var parsed = JSON.parse(body);
    if (!parsed.meta.links.next_page)
      return;
    console.log('parsed.meta.links.next_page');
    console.log(parsed.meta.links.next_page);
    // update the link:
    options.url = parsed.meta.links.next_page;
    httpGET();
  } else {
    console.log('error:');
    console.log(error);
  }
}

var iterate = function (body) {
  var dealData = [];
  var jsonData = JSON.parse(body);
  for (i = 0; i < jsonData.items.length; i++) {
    var info = jsonData.items[i];
    dealData.push({
      index: i,
      id: info.data.id,
      name: info.data.name,
      value: info.data.value
    });
  }
  ;
  console.log(dealData);
  return dealData;
};

var current = options.url;
console.log('current:');
console.log(current);
//while(current) {
current = httpGET();
console.log('end current:');
console.log(current);
// process.exit(1);
//}





