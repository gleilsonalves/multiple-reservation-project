// Buttons das redes sociais
var authEmailButton = document.getElementById('btnAuthEmailPass');
var authFacebookBotton = document.getElementById('btnAuthFacebookPass');
var authGoogleBotton = document.getElementById('btnAuthGooglePass');
var authYahooBotton = document.getElementById('btnAuthYahooPass');

// Inputs de e-mail e senha
var inputEmail = document.getElementById('emailInput');
var inputPass = document.getElementById('inputPass');

// button login
var btnSubmit = document.querySelector('#submit');

// Autenticar com e-mail e senha
btnSubmit.addEventListener('click', function(){
    var user = firebase.auth().currentUser;

    if(user){
        alert('Já existe usuário logado.');
        alert('Saia do usuário atual para poder fazer novo login!');
        window.location.reload();
    }else{
        firebase.auth().signInWithEmailAndPassword(inputEmail.value, inputPass.value).then(function(result){        
            firebase.auth().onAuthStateChanged(function(user){
                if(user.emailVerified == true){
                    console.log(result);
                    console.log('Autenticação realizada com sucesso.');
                    alert('Bem Vindo a plataforma Multiple Reservation!');
                    window.location.assign('html/showTur.html');
                }else{
                    console.log('e-mail não verificado.');
                    alert('Verifique o link de confirmação no e-mail cadastrado.');
                    window.location.reload();
                }
            })        
        }).catch(function(error){
            console.log('Erro no login.');
            alert('ERRO NO LOGIN!');
            alert('Verifique se seu e-mail e senhas estão corretos.');
            console.log(error);
        })
    }
})


//função generica de autenticação das redes sociais
function signIn(provider){
    firebase.auth().signInWithPopup(provider).then(function(result){
        console.log(result);
        console.log('Autenticação realizada com sucesso.');
        var token = result.credential.accessToken;
        alert('Bem Vindo a plataforma Multiple Reservation!');
    }).catch(function(error){
        console.log('Erro na autenticação');
        console.log(error);
    })
}

// Autenticar com Facebook
authFacebookBotton.addEventListener('click', function(){
    var user = firebase.auth().currentUser;

    if(user){
        alert('Já existe usuário logado.');
        alert('Saia do usuário atual para poder fazer novo login!');
    }else{
        var provider = new firebase.auth.FacebookAuthProvider();
        signIn(provider);
        
    }

    firebase.auth().onAuthStateChanged(function(user){
        if (user != null) {
            window.location.assign('html/showTur.html');
        } else {
            console.log('Erro no observador.');
        }
    })
})

// Autenticando com o Google
authGoogleBotton.addEventListener('click', function(){
    var user = firebase.auth().currentUser;

    if(user){
        alert('Já existe usuário logado.');
        alert('Saia do usuário atual para poder fazer novo login!');
    }else{
        var provider = new firebase.auth.GoogleAuthProvider();
        signIn(provider);
    }

    firebase.auth().onAuthStateChanged(function(user){
        if (user != null) {
            window.location.assign('html/showTur.html');
        } else {
            console.log('Erro no observador.');
        }
    })
})

// Autenticando com Yahoo
authYahooBotton.addEventListener('click', function(){
    var user = firebase.auth().currentUser;
    
    if(user){
        alert('Já existe usuário logado.');
        alert('Saia do usuário atual para poder fazer novo login!');
    }else{
        var provider = new firebase.auth.OAuthProvider('yahoo.com');
        signIn(provider);
    }

    firebase.auth().onAuthStateChanged(function(user){
        if (user != null) {
            window.location.assign('html/showTur.html');
        } else {
            console.log('Erro no observador.');
        }
    })
})

//abrir o pop-up para reset de senha
function newPopup(){
    var Window = window.open (
        'popup.html',
        'pagina',
        "width=400, height=300, top=100, left=110, scrollbars=no " );
}