const express = require('express');
const router = express.Router();
const extractFile2 = require('../middleware/file2');
const StoreController = require('../controllers/stores');


router.get('/', StoreController.getStores);


router.get('/:id', StoreController.getStore);


router.post('/', extractFile2, StoreController.createStore);


router.put('/:id', extractFile2, StoreController.updateStore);


router.delete('/:id', StoreController.deleteStore);


// router.get('/get/count', StoreController.getStoreCount);


 module.exports = router;
// const  Store  = require("../models/store");
// const router = require("express").Router();

// // router.get(`/`, async (req, res) => {
// //   const store = await Store.find();

// //   if (!store) {
// //     res.status(500).json({ success: false });
// //   }
// //   res.status(200).send(store);
// // });

// // router.get("/:id", async (req, res) => {
// //   const store = await Store.findById(req.params.id);

// //   if (!store) {
// //     return res
// //       .status(500)
// //       .json({ message: "The store with the given ID was not found." });
// //   }
// //   res.status(200).send(store);
// // });

// // router.post("/", async (req, res) => {
// //   let store = new Store({
// //     name: req.body.name
// //   });
// //   store = await store.save();

// //   if (!store) return res.status(400).send("the store cannot be created!");

// //   res.send(store);
// // });

// // router.put("/:id", async (req, res) => {
// //   const store = await Store.findByIdAndUpdate(
// //     req.params.id,
// //     {
// //       name: req.body.name
// //     },
// //     { new: true }
// //   );

// //   if (!store) return res.status(400).send("the store cannot be created!");

// //   res.send(store);
// // });

// // router.delete("/:id", (req, res) => {
// //   Store.findByIdAndRemove(req.params.id)
// //     .then((store) => {
// //       if (store) {
// //         return res
// //           .status(200)
// //           .json({ success: true, message: "the store is deleted!" });
// //       } else {
// //         return res
// //           .status(404)
// //           .json({ success: false, message: "store not found!" });
// //       }
// //     })
// //     .catch((err) => {
// //       return res.status(500).json({ success: false, error: err });
// //     });
// // });

// // module.exports = router;
// router.get('/', async(req,res) => {
//     try{
//         const store = await Store.find()
//         res.json(store)
//     }catch(err){
//         res.send('Error ' + err)
//     }
// })

// router.get('/:id', async(req,res) => {
//     try{
//            const store = await Store.findById(req.params.id)
//            res.json(store)
//     }catch(err){
//         res.send('Error ' + err)
//     }
// })


// router.post('/', async(req,res) => {
//     const store = new Store({
//         name: req.body.name,
//         adress: req.body.adress,
//         phoneNumber: req.body.phoneNumber
//     })

//     try{
//         const a1 =  await store.save() 
//         res.json(a1)
//     }catch(err){
//         res.send('Error')
//     }
// })

// router.patch('/:id',async(req,res)=> {
//     try{
//         const store = await Store.findById(req.params.id) 
//         store.sub = req.body.sub
//         const a1 = await store.save()
//         res.json(a1)   
//     }catch(err){
//         res.send('Error')
//     }

// })
// module.exports=router
