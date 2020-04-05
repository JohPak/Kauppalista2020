const login_view = () => {
    let html = `
    <html>
    <head>
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <script src="https://kit.fontawesome.com/7c42c6c3ad.js" crossorigin="anonymous"></script>
    <meta charset="UTF-8">
    </head>
    <body class="auth-views">
    <div class="login">
    
    <img src="/img/ikoni.png"> <h1>Kauppalista</h1>
        <div class=login-form>
            <form action="/login" method="POST">
                <input type="text" name="user_name">
                <button type="submit">Kirjaudu sisään</button>
            </form>
            <form action="/register" method="POST">
                <input type="text" name="user_name">
                <button type="submit">Rekisteröidy</button>
            </form>
        </div>
    </div>
    </body>
    <html>
    `;

    return html;
}

module.exports.login_view = login_view;