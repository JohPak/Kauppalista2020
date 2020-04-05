const shoppinglists_view = ((data) => {
    let html = `
    <html>
    <head>
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <meta charset="UTF-8">
    </head>
    <body class="note-views">
        <div class="topbanner">
        <h2>Tuotteet</h2>
        <p>- tervetuloa ${data.user_name}</p>
        <form action="/logout" method="POST">
            <button type="submit">Kirjaudu ulos</button>
        </form>
        </div>

        `;

        return html;
    });


// TÄMÄ NÄYTTÄÄ KAUPPALISTAN SISÄLLÖN

const shoppinglist_view = ((data) => {
    let html = `
    <html>
    <head>
    <link rel="stylesheet" type="text/css" href="../css/style.css">
    <meta charset="UTF-8">
    </head>
    <body class="note-views">
        <div class="topbanner">
        <h2>${data.shoppinglist}</h2>
        <p>(${data.products.length} tuotetta)</p>
        <a href="/" class="back-link"> &#8810; takaisin kauppalistoihin</a>
        <form action="/logout" method="POST">
            <button type="submit">Kirjaudu ulos</button>
        </form>
        </div>

        
        `;
            data.products.forEach((products) =>
            {
                html += `
                <div class="rowline-product">
                    <div class="product-image">
                        <a href="${products.img}"><img src="${products.img}"></a>                    
                    </div>
                    <div class="product-information">
                        ${products.name}<br>
                        <p class="product-qty">
                            ${products.qty} kpl
                        </p>
                    </div>
                    <form action="delete-product" method="POST">
                    <input type="hidden" name="product_id" value="${products._id}">
                    <input type="hidden" name="shoppinglist_id" value="${data.shoppinglist_id}">
                    <button class="delete" type="submit">Poista tuote</button>
                </form>
                </div>
                
                
                `;
            });
        // tuotteen lisäyslomake
        html += `
                <form action="/add-product/${data.shoppinglist_id}" method="POST">
                <label for="prod">Tuote</label>
                <input type="text" name="product" id="prod" required><br>
                <label for="qt">Kpl</label>
                <input type="number" name="qty" id="qt" value="1"><br>
                <label for="image">Kuvan url</label>
                <input type="url" name="img" id="image"><br><br>
                <button type="submit">Lisää tuote</button>
                </form>
                `;

    return html;
});

module.exports.shoppinglists_view = shoppinglists_view;
module.exports.shoppinglist_view = shoppinglist_view;