
export default async function testHandler(req, res){
    return res.status(200).json({"health check":"API Working"})
}