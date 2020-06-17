var inputEmail = document.getElementById('emailInput');
var inputSenha = document.getElementById('inputPass');

var btnSubmit = document.getElementById('submit');

btnSubmit.addEventListener('click', function(){
    firebase.auth().createUserWithEmailAndPassword(inputEmail.value, inputSenha.value).then(function(result){
        console.log('Cadastro efetuado com sucesso.');
        console.log(result);
        alert('Cadastro realizado com sucesso!');
        var user = firebase.auth().currentUser;
        user.sendEmailVerification().then(function(){
            console.log('Email de verificação enviado.');
            alert('Enviamos um e-mail de veirificação para o e-mail cadastrado, favor verifique!');
            window.location.reload();
        }).catch(function(error){
            console.log(error);
        });
        firebase.auth().signOut();     
    }).catch(function(error){
        console.log('Falha ao cadastrar');
        console.log(error);
        alert('Erro no cadastro! Verifique os dados e tente novamente.');
        firebase.auth().signOut();
        window.location.reload();
    });

    
})

