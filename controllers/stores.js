const Store = require('../models/store');
const mongoose = require("mongoose");


exports.getStores = async (req, res) => {
    const store = await Store.find()
    if (!store) return res.status(500).send('cannot get store');
    res.status(200).send(store);
}
exports.getStore = async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('invalid store id');
    }
    const pizza = await Pizza.findById(req.params.id);
    if (!pizza) return res.status(500).send('cannot get store');
    res.status(200).send(store);
}
// const fileName = file.filename;
//     const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
//     imagepath = `${basePath}${fileName}`
exports.createStore = async (req, res) => {
    if (!req.file) return res.status(400).send('image not found');
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images2/" + req.file.filename;
    let store = new Store({
        name: req.body.name,
        adress: req.body.adress,
        phoneNumber: req.body.phoneNumber,
        image2:imagePath
    })

    store = await store.save();
    if (!store) return res.status(500).send('cannot create store');
    res.status(200).send(store);
}


// exports.createStoress = (req, res) => {
//     const store = new Store({
//         name: req.body.name,
//         adress: req.body.adress,
//         phoneNumber: req.body.phoneNumber,
//     })
//     store.save().then(() => {
//         res.status(200).send(store);
//     }).catch(() => {
//         res.status(500).send('cannot add store');
//     })
// }
exports.deleteStore = async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('invalid store id');
    }
    const store = await Store.findByIdAndRemove(req.params.id);
    if (!store) res.status(500).send('cannot delete store');
    res.status(200).send(store);
}


exports.updateStore = async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('invalid store id');
    }
    const store = await Store.findById(req.params.id);
    if (!store) return res.status(400).send('invalid store');
    let imagePath;
    if (req.file) {
        const url = req.protocol + "://" + req.get("host");
        imagePath = url + "/images2/" + req.file.filename;
    }
    else {
        imagepath = store.image;
    }
    const updatedStore = await Store.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            adress: req.body.adress,
           
            phoneNumber: req.body.phoneNumber,
            image: imagePath,
            //category: req.body.category,
            // stock: req.body.stock
        },
        { new: true }
    )
    if (!updatedStore) return res.status(500).send('cannot update store');
    res.status(200).send(updatedStore);
}




// exports.getStoreCount = async (req, res) => {
//     const storeCount = await Store.countDocuments();
//     if (!storeCount) {
//         return res.status(500).json({ success: false });
//     }
//     res.send({ storeCount: storeCount });
// }