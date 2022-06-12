const path=require("path")
const express=require("express");
const hbs=require("hbs")
const geocode=require("./utils/geocede")
const forecast=require("./utils/forecast")
const port=process.env.PORT ||3000
//using path module
// console.log(__dirname)
// console.log(__filename)
//console.log(path.join(__dirname,"../public"))
const app=express();
//Define paths for express configuration
const publicDirPath=path.join(__dirname,"../public")
const viewsPath=path.join(__dirname,"../templates/views")
const partialsPath=path.join(__dirname,"../templates/partials")

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set("views",viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve 
app.use(express.static(publicDirPath))

//using dynamic hbs
app.get("",(req,res)=>{
    res.render("index",{
        title:'weather App',
        name:'NARENDRA KUMAR SINGH'
    })
})
app.get("/about",(req,res)=>{
    res.render("about",{
        title:"About me",
        name:"NARENDRA KUMAR SINGH"
    })
})
app.get("/help",(req,res)=>{
    res.render("help",{
        title:" Help",
        helpText: "This is helping text",
        name:'NARENDRA KUMAR SINGH'
    })
})
app.get("/weather",(req,res)=>{
    if(!req.query.address){
        return res.send({
            error :"You must provide an address"
        })
    }
    geocode(req.query.address,(error,{longitude,latitude,location,weatherStatus}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(longitude,latitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                // weatherStatus,
                address:req.query.address
            })
        })
    })
// res.send({
// forecast:"it is snowing",
// location:"Noida",
// address:req.query.address

// })
})
app.get("/product",(req,res)=>{
    
    if(!req.query.search){
        return res.send({
            error:"You must provide a search term"
        })
    }
    console.log(req.query.search)
    res.send({
        product:[]
    })

})
app.get("/help/*",(req,res)=>{
    // res.send("Help article is not found")
    res.render("404",{
        title:"404",
        name:"Andrew Mead",
        errorMessage:"Help article is not found"
    })

})
app.get("*",(req,res)=>{
    // res.send("My 404 page")
    res.render("404",{
        title:"404",
        name:"Andrew Mead",
        errorMessage:"Page not found"
    })
    
})


//goal: :create a html page for about with "About "title
// 2: create a html page for help with "Help " title
//3: Remove the old route handler fot both 
//4: visit both in browser to test your work
// app.get("",(reg,res)=>{
//     res.send("Hello World!")
// })

//serving up the HTML & JSON 
// app.get("",(reg,res)=>{
//     res.send("<h1 style='color:red;'>Hello World!</h1>")
// })
// app.get("/help",(req,res)=>{
//     res.send({
//         name:"Andrew",
//         age:27          
//     })
// })   //expected o/p  => {"name":"Anderw","age":27}

// goal:setup two new routes
// 1-setup a about route and render a page title 
// 2-setup a weather route and render a page title
// app.get("/about",(reg,res)=>{
//     res.send("About")})
// app.get("/weather",(req,res)=>{
//     res.send("your weather!")
// })
app.listen(port,()=>{
    console.log("Server is up on port "+port)
})