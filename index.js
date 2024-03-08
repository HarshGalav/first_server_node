const express = require('express');
const users = require('./MOCK_DATA.json');
const fs=require('fs');
const { Console } = require('console');

const app = express()
const port = 8000

app.use(express.urlencoded({extended:false}));
app.use((req,res,next)=>{
    fs.appendFile("log.txt",`${Date.now()}:${req.ip}:${req.method}:${req.path}\n`,(err,data)=>{
        next();
    });
    
})

app.get("/api/users", (req,res) => {
    return res.json(users);
})

app.get("/users",(req,res)=>{
    const html=`
    <ul>
    ${users.map((user)=>`<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html);
});
app.route("/api/users/:id")
.get((req,res)=>{
    const id=Number(req.params.id);
    const user=users.find((user) => user.id===id);
    return res.json(user);
})


.delete((req,res)=>{
    return res.json({status : "pending"});
})
.patch((req,res)=>{
 return res.json({status : "pending"});
}
)
app.post("/api/users",(req,res)=>{
    const body=req.body;
    users.push({...body,id:users.length+1});
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
        return res.status(201).json({status : "success", id: users.length});
    })
    
});

app.listen(port, () => console.log(`server started on port ${port}!`))