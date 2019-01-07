async function makeGenerator(config){

    function getSample(id){
        return { 
            AssetId: id,
            Value: 1,
            Epoch: Date.now()/1000,//To standardize test generated data with data in the mongo db
            SiteId: 1
        }
    }

    return async function* () {
        var cnt=0
        while(true){
            cnt++
            yield getSample("Asset1")
            if(cnt%5===0){
                yield getSample("Asset2")
            }
            if(cnt%10===0){
                yield getSample("Asset3")
            }
            await new Promise( (resolve) =>{        
                    setTimeout(()=>{
                        resolve()
                    },1000)
            })
        }
    }()
}

module.exports=makeGenerator
