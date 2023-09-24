const express = require('express')
const app = express()
const Links = require('../schema/schema')
const randomString = require('randomstring')

const shLink = async(req, res, next)=>{
    string1 = randomString.generate(7)

    const {link} = req.body
    const originalLink = link.replaceAll('https://', '')
   
    console.log(originalLink)

   const newLink = new Links({
    original: originalLink,
    shortened: string1
   })

   try{
     await newLink.save()
    res.status(200).json({success: true, message: `http://localhost:8000/${string1}`})
   } catch(err){
    res.status(404).json({success: false, message: 'could not ceate link'})
    return next(err)
   }

   
  
}

const getLink = async(req, res, next)=>{
        const link = req.params.link
        console.log(link)

        let originalLink;
        try{
            rawItems = await Links.find()
            // console.log(rawItems)
           item =  rawItems.find((item)=>{
                // console.log(item.shortened === link);
                return item.shortened === link
            })
            originalLink = item.original
        }catch(err){
            res.status(400).json({success: false, message: 'could not find link'})
            return next (err)

        }
        if(originalLink){
            try{
                res.status(302).redirect(`https://${originalLink}`)
            }catch(err){
            res.status(400).json({success: false, message: 'could not find link'})
                return next (err)
            }
        }
        else if(!originalLink){
            res.status(400).json({success: false, message: 'could not get the link'})
        }


}

// const getLink = async(req, res, next)=>{
//     const {link} = req.body

//     res.
// }

module.exports = {shLink, getLink}