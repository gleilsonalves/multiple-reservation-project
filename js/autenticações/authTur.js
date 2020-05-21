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
        console.log(error);
    })
})


//função generica de autenticação das redes sociais
function signIn(provider){
    firebase.auth().signInWithPopup(provider).then(function(result){
        console.log(result);
        console.log('Autenticação realizada com sucesso.');
        var token = result.credential.accessToken;
        alert('Bem Vindo ' + result.user.displayName +' a plataforma Multiple Reservation!');
    }).catch(function(error){
        console.log('Erro na autenticação');
        console.log(error);
    })

    //veerificar se o usuário logou e direcionar para a pagina de perfis
    firebase.auth().onAuthStateChanged(function(user){
        if (user != null) {
            window.location.assign('html/perfilTur.html');
        } else {
            console.log('Erro no observador.');
        }
    })
}

// Autenticar com Facebook
authFacebookBotton.addEventListener('click', function(){
    var provider = new firebase.auth.FacebookAuthProvider();
    signIn(provider);
})

// Autenticando com o Google
authGoogleBotton.addEventListener('click', function(){
    var provider = new firebase.auth.GoogleAuthProvider();
    signIn(provider);
})

// Autenticando com Yahoo
authYahooBotton.addEventListener('click', function(){
    var provider = new firebase.auth.OAuthProvider('yahoo.com');
    signIn(provider);
})