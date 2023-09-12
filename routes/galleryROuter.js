const express = require('express');
const router = express.Router();
const imag = require('../assets/gallery.json');


router.get('/',(req,res)=>{
    // console.log("kejfnekfjb");
    galdata = imag.filter((gal)=>{
        return gal.slug==="All";
    });
    // console.log(galdata);
    res.render('gallery',{
        layout:"gallery_layout",
        // gname:req.params.galName,
        imag:galdata[0]
    });
})

router.get('/:galName',(req,res)=>{
            galdat = imag.filter((gal)=>{
            return gal.slug===req.params.galName;
        });
    // res.send(galdat);
    // res.send(req.params.galName+" "+galdat);
    res.render('gallery',{
        layout:"navnSide",
        // gname:req.params.galName,
        imag:galdat[0]
    });
})

//  router.get('/',(req,res)=>{
//     res.json({megh:"meghj"});
//  })
module.exports = router;