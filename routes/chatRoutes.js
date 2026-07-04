const express =require("express");
const { getALLCharts, askQuestion } = require("../controllers/chatControllers");

const router=express.Router();

router.get("/",getALLCharts);
router.post("/",askQuestion);
module.exports=router;