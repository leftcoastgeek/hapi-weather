var Hapi = require('hapi');
var _ = require('lodash');

var server = new Hapi.Server();
server.connection({ port: 8080, labels: 'weather' });


server.route([
  {
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      reply.file('./public/index.html');
    }
  },
  {
    method: 'POST',
    path: '/weather',
    handler: function (request, reply) {
      reply("win");
    },
    config:{
      // pre:{ meth}
    }
  }
]);


// get_weather = function (argument) {
//   wreck post to 'https://api.forecast.io/forecast/a1fdea9579fb6c7b357ea96421151567/37.8267,-122.423'
//   // body...
// }

server.start(function (err) {
  var server_info = _.map(server.connections, function(connection){
    return  [
    connection.settings.labels.join(', '),
    ': ',
    connection.info.uri,
    ' with plugins ',
    _.keys(connection._registrations).join(', ')
    ].join('');
  });
  console.log("Hapi version:", server.version, "started with servers: \n", server_info.join('\n '));
});
