const express = require("express");
const router = express.Router();
const axios = require('Axios');
const collection = require("../module/mongodb");

const user1 = {
    trialName: "TestUser",
    trialEmail: "test@test.com",
    trialPassword: "12345678"
};

router.get("/", (req, res)=>{
    res.render("loginViews", {title: "Login"});
});

router.get("/login", (req, res)=>{
    res.render("loginViews", {title: "Login"});
});

router.post("/login", (req, res)=>{
    
        if(user1.trialEmail==req.body.email && user1.trialPassword == req.body.password){
            req.session.user = user1.trialName;
            res.redirect("/dashboard")
        } else if(user1.trialEmail==req.body.email || user1.trialPassword == req.body.password) {
            res.render('loginViews', {title: 'Login', pwError:'incorrect user/password'})
        } else {
        res.render('loginViews', {title: 'Login', dataError:'user not found'})
    }

});

router.post("/signup",async (req, res)=>{

    const data = {
        userName:req.body.userName,
        email:req.body.email,
        password:req.body.password
    }

    await collection.insertMany([data])

    res.redirect('/dashboard');
})

router.get("/dashboard", (req, res)=>{

    if(req.session.user){

        let userPOS=10000;
        let allPOS=100000;
        let userHolder = `Php ${userPOS}`;
        let allHolder = `Php ${allPOS}`;
        res.render("dashViews", {title: "Dashboard", user:req.session.user, userRevenue:userHolder, allRevenue:allHolder});
    }else{
        res.sendStatus(403);
    }
});

router.get('/movieInfo', async(req,res)=>{
if(req.session.user){
        try{
            const cinema1 = await axios.get('https://imdb8.p.rapidapi.com/title/get-overview-details?tconst=tt26533869&currentCountry=US', {
                headers:{'X-RapidAPI-Key': '9785db78edmshe01f19b9b2eac9fp16546djsn33fa3dc81372',
                'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'}
            });
            const cinema2 = await axios.get('https://imdb8.p.rapidapi.com/title/get-overview-details?tconst=tt13086266&currentCountry=US', {
                headers:{'X-RapidAPI-Key': '9785db78edmshe01f19b9b2eac9fp16546djsn33fa3dc81372',
                'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'}
            })
            const cinema3 = await axios.get('https://imdb8.p.rapidapi.com/title/get-overview-details?tconst=tt10160976&currentCountry=US', {
                headers:{'X-RapidAPI-Key': '9785db78edmshe01f19b9b2eac9fp16546djsn33fa3dc81372',
                'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'}
            })
        
            const cinema4 = await axios.get('https://imdb8.p.rapidapi.com/title/get-overview-details?tconst=tt22687790&currentCountry=US', {
                headers:{'X-RapidAPI-Key': '9785db78edmshe01f19b9b2eac9fp16546djsn33fa3dc81372',
                'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'}
            })
        
            res.render('movieViews', {title: 'Select Movie', c1Title:cinema1.data.title.title, c2Title:cinema2.data.title.title, c3Title:cinema3.data.title.title, c4Title:cinema4.data.title.title})
        } catch (error) {
            console.error(error);
            res.status(500).send('Error');
        }
    }else{
        res.sendStatus(403);
    }
})

router.get('/movieSummary1', (req,res)=>{
    if(req.session.user){
            axios.get('https://imdb8.p.rapidapi.com/title/get-overview-details?tconst=tt26533869&currentCountry=US', {
                headers:{'X-RapidAPI-Key': '9785db78edmshe01f19b9b2eac9fp16546djsn33fa3dc81372',
                'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'}
            })
                .then(response => {
                    res.render('movieInfoViews', {title: response.data.title.title,  cTitle:response.data.title.title, cGenre:response.data.genres, cRating:response.data.ratings.rating, cPlot:response.data.plotOutline.text, cImage:response.data.title.image.url})
                    // console.log(response.data)
                })
                .catch(error =>{
                    console.log(error)
                })
        }
    }
)

router.get('/movieSummary2', (req,res)=>{
    if(req.session.user){
            axios.get('https://imdb8.p.rapidapi.com/title/get-overview-details?tconst=tt13086266&currentCountry=US', {
                headers:{'X-RapidAPI-Key': '9785db78edmshe01f19b9b2eac9fp16546djsn33fa3dc81372',
                'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'}
            })
                .then(response => {
                    res.render('movieInfoViews', {title: response.data.title.title,  cTitle:response.data.title.title, cGenre:response.data.genres, cRating:response.data.ratings.rating, cPlot:response.data.plotOutline.text, cImage:response.data.title.image.url})
                })
                .catch(error =>{
                    console.log(error)
                })
        }
    }
)

router.get('/movieSummary3', (req,res)=>{
    if(req.session.user){
            axios.get('https://imdb8.p.rapidapi.com/title/get-overview-details?tconst=tt10160976&currentCountry=US', {
                headers:{'X-RapidAPI-Key': '9785db78edmshe01f19b9b2eac9fp16546djsn33fa3dc81372',
                'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'}
            })
                .then(response => {
                    res.render('movieInfoViews', {title: response.data.title.title,  cTitle:response.data.title.title, cGenre:response.data.genres, cRating:response.data.ratings.rating, cPlot:response.data.plotOutline.text, cImage:response.data.title.image.url})
                })
                .catch(error =>{
                    console.log(error)
                })
        }
    }
)

router.get('/movieSummary4', (req,res)=>{
    if(req.session.user){
            axios.get('https://imdb8.p.rapidapi.com/title/get-overview-details?tconst=tt22687790&currentCountry=US', {
                headers:{'X-RapidAPI-Key': '9785db78edmshe01f19b9b2eac9fp16546djsn33fa3dc81372',
                'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'}
            })
                .then(response => {
                    res.render('movieInfoViews', {title: response.data.title.title,  cTitle:response.data.title.title, cGenre:response.data.genres, cRating:response.data.ratings.rating, cPlot:response.data.plotOutline.text, cImage:response.data.title.image.url})
                    // console.log(response.data.ratings.rating)
                })
                .catch(error =>{
                    console.log(error)
                })
        }
    }
)

router.get("/reserve", async (req, res)=>{
    if(req.session.user){
        try{
            const cinema1 = await axios.get('https://imdb8.p.rapidapi.com/title/get-overview-details?tconst=tt26533869&currentCountry=US', {
                headers:{'X-RapidAPI-Key': '9785db78edmshe01f19b9b2eac9fp16546djsn33fa3dc81372',
                'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'}
            });
            const cinema2 = await axios.get('https://imdb8.p.rapidapi.com/title/get-overview-details?tconst=tt13086266&currentCountry=US', {
                headers:{'X-RapidAPI-Key': '9785db78edmshe01f19b9b2eac9fp16546djsn33fa3dc81372',
                'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'}
            })
            const cinema3 = await axios.get('https://imdb8.p.rapidapi.com/title/get-overview-details?tconst=tt10160976&currentCountry=US', {
                headers:{'X-RapidAPI-Key': '9785db78edmshe01f19b9b2eac9fp16546djsn33fa3dc81372',
                'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'}
            })
        
            const cinema4 = await axios.get('https://imdb8.p.rapidapi.com/title/get-overview-details?tconst=tt22687790&currentCountry=US', {
                headers:{'X-RapidAPI-Key': '9785db78edmshe01f19b9b2eac9fp16546djsn33fa3dc81372',
                'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'}
            })
        
            res.render('selectMovieViews', {title: 'Select Movie', c1Title:cinema1.data.title.title, c2Title:cinema2.data.title.title, c3Title:cinema3.data.title.title, c4Title:cinema4.data.title.title})
        } catch (error) {
            console.error(error);
            res.status(500).send('Error');
        }
    }else{
        res.sendStatus(403);
    }
});

router.get("/cinema1", (req, res)=>{
    if(req.session.user){
        res.render("cinemaSeatViews", {title: "Select Seat"});
    }else{
        res.sendStatus(403);
    }
});

router.get("/cinema2", (req, res)=>{
    if(req.session.user){
        res.render("cinemaSeatViews", {title: "Select Seat"});
    }else{
        res.sendStatus(403);
    }
});

router.get("/cinema3", (req, res)=>{
    if(req.session.user){
        res.render("cinemaSeatViews", {title: "Select Seat"});
    }else{
        res.sendStatus(403);
    }
});

router.get("/cinema4", (req, res)=>{
    if(req.session.user){
        res.render("cinemaSeatViews", {title: "Select Seat"});
    }else{
        res.sendStatus(403);
    }
});

router.get("/logout", (req, res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send(err);
        }else{
            res.redirect('/login');
        }
    });
});



module.exports = router;