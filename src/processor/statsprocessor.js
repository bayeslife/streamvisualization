
var historylength = 10

const stats = function(historical,newvalue) {
    if(!historical){
        historical = {
            label: newvalue.AssetId,
            times: [],
            last10: [], 
            previous: null,
            averageDelta:0}
    }

    var e = newvalue.Epoch*1000
    if(!historical.times.includes(e))
        historical.times.push(e)
    if(historical.times.length>historylength){
        historical.times.shift()
    }
    
    if(historical.previous){
        historical.last10.push(newvalue.Epoch*1000 - historical.previous*1000)
        if(historical.last10.length>historylength){
            historical.last10.shift()
        }
        var sum = historical.last10.reduce((a,b)=>a+b)
        historical.averageDelta = sum/historical.last10.length
    }
    historical.previous = newvalue.Epoch
    return historical
}

module.exports = function() {
    var accumulation = {}
    return x => {
        var result = Object.assign({},accumulation)
        var id = x["AssetId"]
        accumulation[id] = stats(accumulation[id],x)
        result[id] = accumulation[id]
        return result
    }
}
