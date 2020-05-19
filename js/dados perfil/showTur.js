var btnOut = document.getElementById('btnSignOut');
var nome = document.getElementById('nome');
var email = document.getElementById('email');
var idade = document.getElementById('idade');
var cpf = document.getElementById('cpf');
var pais = document.getElementById('pais');
var estado = document.getElementById('estado');
var cidade = document.getElementById('cidade');
var imagem = document.getElementById('img');

firebase.auth().onAuthStateChanged(function(user){    
    if (user) {
        console.log('usuario logado');
        var img;
        
        firebase.database().ref('users/' + user.uid).on('value', function(snapshot){
            img = snapshot.val().imagem;
            console.log(img);            
        });
        

        firebase.database().ref('users/' + user.uid).on('value', function(snapshot){
            nome.innerHTML = 'USUÁRIO: ' + snapshot.val().nome;
            idade.innerHTML = 'IDADE: ' + snapshot.val().idade + ' anos';
            cpf.innerHTML = 'CPF: ' + snapshot.val().cpf;
            pais.innerHTML = 'PAÍS: ' + snapshot.val().pais;
            estado.innerHTML = 'ESTADO: ' + snapshot.val().estado;
            cidade.innerHTML = 'CIDADE: ' + snapshot.val().cidade;
            email.innerHTML = 'E-MAIL: ' + user.email;
        })
    } else {
        console.log('usuario não logado');
    }
});

// Evento de deslogar, sair da autenticação
btnOut.addEventListener('click', function(){
    firebase.auth().signOut().then(function(){
        console.log('Deslogando Usuário');
        alert('Deslogando Usuário!');
        window.location.assign("../index.html");
    }).catch(function(error) {
        console.log(error);
    });
})

