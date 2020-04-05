const note_model = require('../models/note-model');
const note_views = require('../views/note-views');

const get_notes = (req, res, next) => {
    const user = req.user;
    user.populate('notes')
    user.populate('shoppinglist')
        .execPopulate()
        .then(() => {
            console.log('user:', user);
            let data = {
                user_name: user.name,
                // alkup. notes: user.notes,
                //kokeilut
                shoppinglist: user.shoppinglist,
                // haetaan tuote joka on ostoslistan sisällä
                item: user.shoppinglist.note
            };
            console.log("DATA-objektin sisältö:");
            console.log(data);
            let html = note_views.notes_view(data);
            res.send(html);
        });
};

// poistetaan tuote
const post_delete_note = (req, res, next) => {
    const user = req.user;
    const note_id_to_delete = req.body.note_id;

    //Remove note from user.notes
    const updated_notes = user.notes.filter((note_id) => {
        return note_id != note_id_to_delete;
    });
    user.notes = updated_notes;

    //Remove note object from database
    user.save().then(() => {
        note_model.findByIdAndRemove(note_id_to_delete).then(() => {
            res.redirect('/');
        });
    });
};

const get_note = (req, res, next) => {
    const note_id = req.params.id;
    console.log("note_model note-controllerin get_notesta:");
    console.log(note_model);
    user_model.shoppinglist.notes.findOne({
        _id: note_id
    }).then((note) => {
        let data = {
            text: shoppinglist.notes.text
        };
        let html = note_views.note_view(data);
        res.send(html);
    });
};
// const get_note = (req, res, next) => {
//     const note_id = req.params.id;
//     note_model.findOne({
//         _id: note_id
//     }).then((note) => {
//         let data = {
//             text: note.text,
//         };
//         let html = note_views.note_view(data);
//         res.send(html);
//     });
// };

// url: /add-note
// lisätään uusi tuote kauppalistaan
const post_note = (req, res, next) => {
    const user = req.user;
    console.log("käy täällä kun käyttäjä luo ekan tuotteen");
    console.log(user);
    let new_note = note_model({
        text: req.body.note
    });
    new_note.save().then(() => {
        console.log('Tuote tallennettu: ' + new_note.text);
        // alkuper. user.notes.push(new_note);
        user.shoppinglist.push(new_note);
        user.save().then(() => {
            return res.redirect('/');
        });
    });
};





module.exports.get_notes = get_notes;
module.exports.get_note = get_note;
module.exports.post_note = post_note;
module.exports.post_delete_note = post_delete_note;