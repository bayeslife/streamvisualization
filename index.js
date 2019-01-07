//var makeGenerator = require('./src/generator/mongo-generator.js')
var makeGenerator = require('./src/generator/test-generator.js')

const fp = require('funprog')

var statsprocessor = require('./src/processor/statsprocessor.js')

var serve = require('./src/serve.js')

var config = require('./src/config/env.js')

/* This is a transform which drops content the front end doesnt use */
const backendForFrontEnd = x => {
    return Object.keys(x).map((k)=>{
        var data = x[k]
        return {
           label: k,
           times: data.times,
           average: data.averageDelta
        }             
    })
}

var transformation = fp.compose(
    fp.mapping(statsprocessor()),
    fp.sampling(2000),
    fp.mapping(backendForFrontEnd)
)


async function pipelineFactory() {
    var sourceGenerator = await makeGenerator(config)


    var uiGenerator = fp.transduceGenerator(transformation, fp.latest, null, sourceGenerator);
    return uiGenerator;
}

async function setup() {

    // var generator = await pipelineFactory()
    // async function query(){
    //     for await (const v of generator) {
    //         console.log(v)
    //     }
    // }
    // query()

    serve(pipelineFactory,config)
}

setup()