const service = require("./theaters.service.js")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary.js");

async function listTheaters(req, res){
    const data = await service.listTheaters()
    res.json({data})
}

module.exports = {
    listTheaters:[asyncErrorBoundary(listTheaters)]
}