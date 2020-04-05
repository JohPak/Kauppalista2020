const notes_view = ((data) => {
    let html = `
    <html>
    <head>
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <meta charset="UTF-8">
    </head>
    <body class="note-views">
        <div class="topbanner">
        <h2>Kauppalistat</h2>
        <p>- tervetuloa ${data.user_name}</p>
        <form action="/logout" method="POST">
            <button type="submit">Kirjaudu ulos</button>
        </form>
        </div>

        `;



// Kauppalistat
if(data.shoppinglist != null) {
    data.shoppinglist.forEach((shoppinglist) =>
    {
        html += `
        <a href="/shoppinglist/${shoppinglist._id}" class="shoppinglist-link">
            <div class="rowline">
                <p>
                    ${shoppinglist.text} 
                </p>
                <form action="delete-shoppinglist" method="POST">
                    <input type="hidden" name="shoppinglist_id" value="${shoppinglist._id}">
                    <button class="delete" type="submit">Poista kauppalista</button>
                </form>
            </div>
        </a>
            `;
    });
}


// tuotteet
    //alkuper. data.notes.forEach((note) => {
        if(data.item != null) {
            data.item.forEach((note) => {
                html += `<div class="rowline"><p>`;
                html += note.text;
                html += `
                    </p>
                    <form action="delete-note" method="POST">
                        <input type="hidden" name="note_id" value="${note._id}">
                        <button class="delete" type="submit">Poista tuote</button>
                    </form>
                    </div>
                    `;
                });
        }
    


html += `
    <form action="/add-shoppinglist" method="POST">
    <input type="text" name="shoppinglist">
    <button type="submit">Lisää kauppalista</button>
    </form>
    </html>
    </body>
    `;
    return html;
});




const note_view = (data) => {
    //let html = `
    html += `
    <html>
    <body>
        Note text: ${data.text}
    </body>
    </html>
    `;
    return html;
};



module.exports.notes_view = notes_view;
module.exports.note_view = note_view;