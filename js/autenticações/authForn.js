// Inputs da tela de login do fornecedor
var inputEmailForn = document.getElementById('emailInput');
var inputPassForn = document.getElementById('inputPass');

// Button Login
var btnSubmit = document.querySelector('#submit');

// Autenticar com e-mail e senha

btnSubmit.addEventListener('click', function(){
    firebase.auth().signInWithEmailAndPassword(inputEmailForn.value, inputPassForn.value).then(function(result){        
        firebase.auth().onAuthStateChanged(function(user){
            if(user.emailVerified == true){
                console.log(result);
                console.log('Autenticação realizada com sucesso.');
                alert('Bem Vindo a plataforma Multiple Reservation!');
                window.location.assign('html/showForn.html');
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
