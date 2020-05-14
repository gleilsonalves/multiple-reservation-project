// Inputs da tela de login do fornecedor
var inputEmailForn = document.getElementById('emailInput');
var inputPassForn = document.getElementById('inputPass');

// Button Login
var btnSubmit = document.querySelector('#submit');

// Autenticar com e-mail e senha

btnSubmit.addEventListener('click', function(){
    firebase.auth().signInWithEmailAndPassword(inputEmailForn.value, inputPassForn.value).then(function(result){
        if (user.emailVerified == true){
            console.log('Autenticação realizada com sucesso.');
            alert('Bem Vindo ' + inputEmail.value +' a plataforma Multiple Reservation!')
        };
    }).catch(function(error){
        console.log(error);
    })
    // Verificador para ver se o user está logado
    firebase.auth().onAuthStateChanged(function(user) {
        if (user.emailVerified == true) {
            window.location.assign('html/perfilForn.html')
        } else {
            console.log('Erro no observador.');
            alert('Verifique o link de confirmação no e-mail cadastrado.');
            window.location.reload();
        }
    });
})
