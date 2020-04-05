const shoppinglist_model = require('../models/shoppinglist-model');
const productmodel = require('../models/product-model');
const shoppinglist_views = require('../views/shoppinglist-views');

const get_shoppinglists = (req, res, next) => {
    const user = req.user;
    user.populate('shoppinglists')
        .execPopulate()
        .then(() => {
            console.log('user:', user);
            let data = {
                user_name: user.name,
                shoppinglists: user.shoppinglists
            };
            let html = shoppinglist_views.shoppinglists_view(data);
            res.send(html);
        });
};

const get_shoppinglist = (req, res, next) => {
    const user = req.user;
    const shoppinglist_id = req.params.id;
    shoppinglist_model.findOne({
        _id: shoppinglist_id
    }).then((shoppinglist) => {
        shoppinglist.populate('products').execPopulate().then(() => {
            let data = {
                user_name: user.name,
                shoppinglist: shoppinglist.text,
                products: shoppinglist.products,
                shoppinglist_id: shoppinglist._id
            };
            let html = shoppinglist_views.shoppinglist_view(data);
            res.send(html);
        });
    });
};

const post_delete_shoppinglist = (req, res, next) => {
    const user = req.user;
    const shoppinglist_id_to_delete = req.body.shoppinglist_id;

    //Remove shoppinglist from user.shoppinglists
    const updated_shoppinglists = user.shoppinglist.filter((shoppinglist_id) => {
        return shoppinglist_id != shoppinglist_id_to_delete;
    });
    user.shoppinglist = updated_shoppinglists;

    //Remove shoppinglist object from database
    user.save().then(() => {
        shoppinglist_model.findByIdAndRemove(shoppinglist_id_to_delete).then(() => {
            res.redirect('/');
        });
    });
};

const post_delete_product = (req, res, next) => {
    const user = req.user;
    const products = req.products;
    const shoppinglist_id = req.body.shoppinglist_id;
    const product_id_to_delete = req.body.product_id;

    //POISTO EI TOIMI..
    const updated_products = user.shoppinglist.filter((product_id) => {
        return product_id != product_id_to_delete;
    });
    user.shoppinglist = updated_products;
    console.log("*****************************************");
    console.log("product_id_to_delete:" + product_id_to_delete);
    console.log("shoppinglist-id:" + shoppinglist_id);
    console.log(products);
    console.log("*****************************************");
    
    //Remove product object from database
    user.save().then(() => {
        product-model.findByIdAndRemove(product_id_to_delete).then(() => {
            res.redirect('/');
        });
    });
};

const post_shoppinglist = (req, res, next) => {
    const user = req.user;
    let new_shoppinglist = shoppinglist_model({
        text: req.body.shoppinglist
    });
    console.log("Tallennettavan listan nimi " + new_shoppinglist);
    new_shoppinglist.save().then(() => {
        console.log('shoppinglist saved');
        user.shoppinglist.push(new_shoppinglist);
        user.save().then(() => {
            return res.redirect('/');
        });
    });
};


const post_product = (req, res, next) => {

        const shoppinglist_id = req.params.id;
        shoppinglist_model.findOne({
            _id: shoppinglist_id
        }).then((shoppinglist)=> {
            let new_product = productmodel({
                name: req.body.product,
                qty: req.body.qty,
                img: req.body.img
            });
    
            new_product.save().then(() => {
                shoppinglist.products.push(new_product);
                shoppinglist.save().then(() => {
                    return res.redirect(`/shoppinglist/${shoppinglist._id}`);
                });
            });
        });


};


module.exports.get_shoppinglists = get_shoppinglists;
module.exports.get_shoppinglist = get_shoppinglist;
module.exports.post_shoppinglist = post_shoppinglist;
module.exports.post_product = post_product;
module.exports.post_delete_shoppinglist = post_delete_shoppinglist;
module.exports.post_delete_product = post_delete_product;