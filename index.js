 // creating a http server
 // express
 // using inmemory
 
 const express=require("express");
 const bodyParser=require("body-parser");

 const app=express();
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({extended:true}));

 const users=[{
        name:"John",
        kidneys:[{
            healthy:false
        }]
    }];

//kidneys info
 app.get("/",(req,res) => {
    const johnkidneys=users[0].kidneys;
    const noofkidneys=johnkidneys.length;
    const healthresult=users[0].kidneys.filter(checkhealth);

    noofhealthykidneys=healthresult.length;
    function checkhealth(kidney){
        return kidney.healthy ? 1:0;
    }
    const noofunhealthykidneys=noofkidneys-noofhealthykidneys;

    res.json({
        noofkidneys,
        noofhealthykidneys,
        noofunhealthykidneys,
    });
  });

  // Adding new kidney
  app.post("/",(req,res) => {
    const ishealthy=req.body.ishealthy;
    users[0].kidneys.push({healthy:ishealthy});

    res.json({
        msg:"Done",
    });
  });

  // Replacing all unhealthy kidneys
  app.put("/",(req,res) => {
    const healthresult=users[0].kidneys.filter(checkhealth);
    noofhealthykidneys=healthresult.length;
    function checkhealth(kidney){
        if(kidney.healthy === false){
            kidney.healthy=true;
        }
    }
    res.json({msg: "Kidneys replaced"});
  });

  // Removing unhealthy kidneys
  function istheiratleastoneunhealthykidney(){
    let atleastoneunhealthykidney=false;
    for(let i=0;i<users[0].kidneys.length;i++){
        if(!users[0].kidneys[i].healthy){
            atleastoneunhealthykidney=true;
        }
    }
    return atleastoneunhealthykidney;
  }

  app.delete("/",(req,res) =>{
    if(istheiratleastoneunhealthykidney()){
        const kidneys=users[0].kidneys;
        const healthykidneys=[];

        kidneys.filter(removeunhealthy);

        function removeunhealthy(kidney){
            if(kidney.healthy === true){
                healthykidneys.push(kidney);
            }
        }
        users[0].kidneys=healthykidneys;

        res.json({msg: "unhealthy kidneys removed"});
    }else{
        res.status(411).json({msg: "You have no bad kidneys"});
    }
  });

 app.listen(3000,() =>{
    console.log("Server Running on 3000!");
 });