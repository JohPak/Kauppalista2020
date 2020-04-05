const shoppinglists_view = ((data) => {
    let html = `
    <html>
    <head>
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <meta charset="UTF-8">
    </head>
    <body>
        <div class="topbanner">
            <p>Logged in as user: ${data.user_name}</p>
            <form action="/logout" method="POST">
                <button type="submit">Log out</button>
            </form>
        </div>
        `;


    // data.shoppinglists.forEach((shoppinglist) => {
    //     html += shoppinglist.text;
    //     html += `
    //         <form action="delete-shoppinglist" method="POST">
    //             <input type="hidden" name="shoppinglist_id" value="${shoppinglist._id}">
    //             <button type="submit">Delete shoppinglist</button>
    //         </form>
    //         `;
    // });

    // html += `
    //     <form action="/add-shoppinglist" method="POST">
    //         <input type="text" name="shoppinglist">
    //         <button type="submit">Add shoppinglist</button>
    //     </form>
    // </html>
    // </body>
    // `;
    return html;
});


const shoppinglist_view = (data) => {
    let html = `
    <html>
    <body>
        Shoppinglist text: ${data.text}
    </body>
    </html>
    `;
    return html;
};

module.exports.shoppinglists_view = shoppinglists_view;
module.exports.shoppinglist_view = shoppinglist_view;