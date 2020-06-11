var emailReset = document.getElementById('infoEmail');
var sendReset = document.getElementById('sendReset');

sendReset.addEventListener('click', function(){
    firebase.auth().sendPasswordResetEmail(emailReset.value).then(function(){
        document.getElementById('msg').innerHTML = 'Enviamos um link para seu e-mail, feche essa janela';
    }).catch(function(){
        document.getElementById('msg').innerHTML = 'E-mail informando não está cadastrado';
    })
})