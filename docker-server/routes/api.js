const express = require('express');
const router = express.Router();
var stream = require('stream');

// GET api
router.get('/', (req, res) => {
    res.send('api works');
});

/* ---------------------------------------
                CONTAINERS
   -------------------------------------*/
// GET all containers 
router.get('/containers', (req, res) => {
    var Docker = require('dockerode');
    var docker = new Docker();
    docker.listContainers({ all: true }, function (err, containers) {
        res.status(200).json(containers);
    });
});

// GET one container with its id
router.get('/container/:id', (req, res) => {
    var Docker = require('dockerode');
    var docker = new Docker({ socketPath: '/var/run/docker.sock' });
    var container = docker.getContainer(req.params.id);
    container.inspect(function (err, data) {
        res.status(200).json(data);
    });

});

// GET container's logs with its id
router.get('/container/:id/logs', (req, res) => {
    var Docker = require('dockerode');
    var docker = new Docker({ socketPath: '/var/run/docker.sock' });
    console.log("container id : ", req.params);
    var container = docker.getContainer(req.params.id);
    var result = '';
    var logStream = new stream.PassThrough();
    logStream.on('data', function (chunk) {
        console.log(chunk.toString('utf8') + "\n");
        result += chunk.toString('utf8') + "\n";
    });
    container.logs({
        follow: true,
        stdout: true,
        stderr: true,
        tail: 300
    }, function (err, stream) {
        container.modem.demuxStream(stream, logStream, logStream);
        stream.on('end', function () {
            logStream.end('**********END OF LOGS**********');
            res.status(200).json(result);
        });

        setTimeout(function () {
            stream.destroy();
        }, 2000);
    });
});

// POST Stop a container with its id
router.post('/container/stop', (req, res) => {
    var Docker = require('dockerode');
    var docker = new Docker();
    var container = docker.getContainer(req.body.Id);
    container.kill().then(function (data) {
        console.log('container killed');
        res.status(200).json(data);
    });
});

// POST Remove a container with its id
router.post('/container/remove', (req, res) => {
    var Docker = require('dockerode');
    var docker = new Docker();
    console.log('req', req.body.Id);
    var container = docker.getContainer(req.body.Id);
    container.remove().then(function (data) {
        console.log('container removed');
        res.status(200).json(data);
    });
});


function createEnv(variablesEnv) {
    var result = [];
    var temp = "";
    if (variablesEnv !== null) {
        variablesEnv.forEach(value => {
            temp = value.NomVariable + "=" + value.Valeur;
            result.push(temp);
            console.log(result);
        })
    }
    return result;
}

// POST Create a container with container object
router.post('/container/create', (req, res) => {
    console.log('req', req.body);
    var Docker = require('dockerode');
    var docker = new Docker({ socketPath: '/var/run/docker.sock' });
    const portGuest = req.body.PortGuest ? `${req.body.PortGuest}`.toString().concat('/tcp') : '';
    const portHost = req.body.PortHost ? `${req.body.PortHost}`.toString(): '';
    let name = req.body.Nom;

    docker.pull(
        req.body.Image,
        {},
        function (err, stream) {
            docker.modem.followProgress(stream, onFinished, onProgress);
            function onFinished(err, output) {
                var PortBindings = {};
                var binds = req.body.CheminHost && req.body.CheminGuest ? [req.body.CheminHost.concat(":").concat(req.body.CheminGuest)] : [];
                var variablesEnv = [];
                var temp = "";
                if (req.body.VariablesEnv !== null) {
                    req.body.VariablesEnv.forEach(value => {
                        temp = value.NomVariable + "=" + value.Valeur;
                        variablesEnv.push(temp);
                        console.log(variablesEnv);
                    })
                }
                /*console.log('------------------------VAR', req.body.variables)
                for (let i = 0; i < req.body.variables.length; i++) {
                    variablesEnv.push(req.body.variables[i].variable);
                }
                console.log('------------------------VAR2', variablesEnv)*/

                const newContainer = {

                    Image: req.body.Image,
                    name: name,
                    Env: variablesEnv,
                    Cmd: ['/bin/sh', '-c', "trap 'echo no' TERM; while true; do sleep 1; done"],
                    ExposedPorts: {
                        [portGuest]: {}
                    },
                    HostConfig: {
                        Binds:
                            binds
                        ,
                        Memory: parseInt(req.body.Ram * 1048576),
                        NanoCpus: parseInt(req.body.Cpu * 10000000),
                        PortBindings: {
                            [portGuest]: [{
                                HostPort: portHost,
                            }]
                        },

                    },

                };
                console.log('------------JSON---------', newContainer);
                console.log('------------JSON---------', newContainer.HostConfig.PortBindings);

                docker.createContainer(
                    newContainer,
                    function (err, container) {
                        console.log('ERREUR -------------- W', err);
                        if (!err) {
                            console.log('CONTENEUR', container);
                            container.start(function (err, data) {
                                console.log('---------START errr----', err)
                                console.log('---------START dataaa----', data)

                                res.redirect("/containers");
                                if (err) {
                                    res.status(400).json(err);
                                }
                            });

                        } else {
                            console.log('ERREUR CREATE----------', err);
                            res.status(400).json(err);
                        }
                    }
                );
            }
            function onProgress(event) { }
            if (err) {
                res.status(400).json(err);
            }
        },
        {}
    );


});

/* --------------------------------------
                IMAGES
   ------------------------------------*/
// GET all Images
router.get('/images', (req, res) => {
    var Docker = require('dockerode');
    var docker = new Docker();
    docker.listImages({ all: true }, function (err, images) {
        res.status(200).json(images);
    });
});






module.exports = router;