const express  =   require('express');
const router   =   express.Router();
const {notices,achievements} = require('../assets/dataGetter')
const data = require('../assets/data.json');

router.get('/',(req,res)=>{

    res.render('landing',{
        notice:notices,
        achievements:achievements,
        middleSec:true,
        showGallery:true,
        title:"Hyperion-The Cultural Society"})
});
router.get('/contact',(req,res)=>{
    res.render('contactus',{
        title:"Contact Us",
        notice:notices,
        achievements:achievements,
        middleSec:false,
        showGallery:true,
    });
})
router.get('/achievements',(req,res)=>{
    res.render('achievements',{layout:"onlyNav",point:"Achievements"});
})

router.get('/notices',(req,res)=>{
    res.render('notices',{layout:"onlyNav",point:"notices"});
})
router.get('/principal',(req,res)=>{
    res.render('principal',{
        layout:"onlyNav",
        point:"Principal"
   
});
});
router.get('/:socName',(req,res)=>{
    const socdata = data.filter((dat)=>{
        return dat.slug===req.params.socName;
    });
    res.render('socView',{
        layout:"navnSide",
        name:req.params.socName,
        data:socdata[0]
});
})


module.exports = router;