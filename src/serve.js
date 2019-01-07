var debug = require('debug')('streamvis')
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

async function serve(generatorFactory, config){

    server.listen(config.SERVE_PORT);

    app.get('/', function (req, res) {
      res.sendFile(__dirname + '/index.html');
    });

    var count=0   
    var generator
    io.on('connection', async function (socket) {
        debug('Connection')
        socket.emit('generator', "started")
        generate()    

        socket.on('request', function (data) {
            generate() //restart the generator
        })

        async function generate() {
            if(generator)
                generator.return()
            generator = await generatorFactory()
            // setTimeout( ()=> {
            //     debug('stopped generating')    
            //     generator.return() //This will stop the generator
            //     socket.emit('generator', "stopped")
            // }, 20000 )

            for await (const change of generator) {
                change.count = ++count
                debug('.')
                //debug(change)
                socket.emit('measurement', change); //Push the event to the UI
            }
        }
    });
}

module.exports = serve