var express = require('express');
var router = express.Router();


/*
- 채널/채팅 정보 관리 RESTful API 라우팅 기능 제공
http://localhost:3000/api/channel
*/

var apiResult = {
  code:200,
  data:[],
  result:"OK"
}

// 채널 데이터
const Channel = require('../schemas/channel');



// 채널 정보 관리 RESTful API 라우팅 기능 제공
// http://localhost:3000/api/channel
router.get('/', async (req, res)=>{
  try{
    apiResult.code = 200;
    apiResult.data = await Channel.find({});
    apiResult.result = "OK";

  }catch(err){
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.result = "Server Error";

    console.log(err);
  }
  
  
  res.json(apiResult);
});


// 채널 생성 요청과 응답 메소드
// http://localhost:3000/api/channel
router.post('/', async (req,res)=>{
  
  try{
    // 새채널 정보 입력 받기
    var community_id = req.body.community_id;
    var category_code = req.body.category_code;
    var channel_name = req.body.channel_name;
    var user_limit = req.body.user_limit;
    var channel_img_path = req.body.channel_img_path;
    var channel_desc = req.body.channel_desc;
    var channel_state_code = req.body.channel_state_code;


    // 새 채널 정보 객체화
    var newChannel =   {
      community_id,
      category_code,
      channel_name,
      user_limit,
      channel_img_path,
      channel_desc,
      channel_state_code,

    }

    let createdChannel = await Channel.create(newChannel);

    apiResult.code = 200;
    apiResult.data = createdChannel;
    apiResult.result = "OK";

  }catch(err){
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.result = "Server Error";
    
    console.log(err);
  }


  res.send(apiResult);

})


// 채널 수정 요청과 응답 메소드
// http://localhost:3000/api/channel/1
router.put('/:cid', async(req,res)=>{
  
  try{
    var channel_id = req.params.cid
    var community_id = req.body.community_id;
    var category_code = req.body.category_code;
    var channel_name = req.body.channel_name;
    var user_limit = req.body.user_limit;
    var channel_img_path = req.body.channel_img_path;
    var channel_desc = req.body.channel_desc;
    var channel_state_code = req.body.channel_state_code;


    var channel =   {
      community_id,
      category_code,
      channel_name,
      user_limit,
      channel_img_path,
      channel_desc,
      channel_state_code,
      reg_date:Date.now()
    }
  

    var modifoedChannel = await Channel.updateOne({channel_id:channel_id}, channel);

  
    if(modifoedChannel == undefined){
      res.send("해당 계정은 존재하지 않습니다.");
    }

    apiResult.code = 200;
    apiResult.data = modifoedChannel;
    apiResult.result = "Failed";

  }catch(err){
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.result = "Failed";

    console.log(err);
  }

  res.json(apiResult);
})


// 채널 삭제
// http://localhost:3000/api/channel/1
router.delete('/:cid',async(req,res)=>{

  try{
    // 삭제 채널 id 파라미터 방식으로 받기
    let channel_id = req.params.cid;
  
  
    let deletedChannel = await Channel.deleteOne({ channel_id:channel_id });
  
  
    if(deletedChannel == undefined){
      res.send("해당 계정은 존재하지 않습니다.");
    }

    apiResult.code = 200;
    apiResult.data = deletedChannel;
    apiResult.result = "Deleted Channel Data";

  }catch(err){
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.result = "Server Error";

    console.log(err);
  }

  res.send(apiResult);
});


// 단일 채널 찾기
// http://localhost:3000/api/channel/1
router.get('/:cid',async(req, res)=>{
  try{
    let channel_id = req.params.cid;
  
    let findOneChannel = await Channel.findOne({ channel_id:channel_id });
  

    if(findOneChannel === undefined){
      res.send("해당 계정은 존재하지 않습니다.");
    }
    

  }catch(err){
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.result = "Failed";

    console.log(err);
  }


  res.json(apiResult);
})



module.exports = router;
