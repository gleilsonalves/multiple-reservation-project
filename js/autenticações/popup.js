var emailReset = document.getElementById('infoEmail');
var sendReset = document.getElementById('sendReset');

sendReset.addEventListener('click', function(){
    firebase.auth().sendPasswordResetEmail(emailReset.value).then(function(){
        alert('Enviamos um link para reset da senha');
        window.close();
    }).catch(function(){
        alert('Erro na solicitação de reset da senha!');
    })
})