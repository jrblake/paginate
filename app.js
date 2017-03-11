const request = require('request');

var options = {
  url: 'https://api.getbase.com/v2/deals?per_page=100',
  headers: {
    'Authorization': 'Bearer 9573ec936f46b85ec07e3bf495d16798954525cbce9d929e5451dd73a0148862',
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'User-Agent': 'node'
  }
};

var getRequest = () => {
  function callback (error, response, body) {
    if (!error && response.statusCode == 200) {
      var current = options.url;
      while(current) {
        var current = getRequest();
      }
      iterate(body);
      console.log(body);
      return body;
      // return JSON.parse(body.meta.links.next_page);
    } else {
    console.log(error);
    }
  };
  request.get(options, callback);
};

var iterate = (body) => {
  var dealData = []
  var jsonData = JSON.parse(body)
    for(i = 0; i < jsonData.items.length; i++) { 
      var info = jsonData.items[i];
      dealData.push({
        index: i,
        id: info.data.id,
        name: info.data.name,
        value: info.data.value
      });
    };
    console.log(dealData);
  return dealData;
};

var current = options.url;
while(current) {
  var current = getRequest();
}
console.log(current);





