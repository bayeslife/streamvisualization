var mongo = require("mongodb")
const mongoClient = require('mongodb').MongoClient;

async function makeGenerator(config){
    
    const client = await mongoClient.connect(config.MONGO_SERVER);
    const collection = client.db(config.MONGO_DB).collection(config.MONGO_COLLECTION);

    return async function* () {
        const pipeline = [
            { $project : { 
                    "AssetId": "$fullDocument.AssetId", 
                    "Epoch": "$fullDocument.Epoch", 
                    "Value": "$fullDocument.Value", 
                    "SiteId": "$fullDocument.SiteId" } }
        ]
        const changeStream = collection.watch(pipeline,{
            startAtOperationTime: new Date( )
        });
    
        while(true){
            var change = await new Promise( (resolve) =>{
                changeStream.on("change", function(change) {
                    resolve(change)
                });
            })
            delete change._id
            yield change
        }
    }()
}

module.exports=makeGenerator