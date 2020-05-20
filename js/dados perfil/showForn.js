var btnOut = document.getElementById('btnSignOut');
var nome = document.getElementById('nome');
var email = document.getElementById('email');
var telefone = document.getElementById('telefone');
var idade = document.getElementById('idade');
var cpf = document.getElementById('cpf');
var cnpj = document.getElementById('cnpj');
var pais = document.getElementById('pais');
var estado = document.getElementById('estado');
var cidade = document.getElementById('cidade');
var servico = document.getElementById('serviço');
var imagem = document.getElementById('img');


firebase.auth().onAuthStateChanged(function(user){    
    if (user) {
        console.log('usuario logado');
        firebase.database().ref('users/' + user.uid).on('value', function(snapshot){
          var storageRef = firebase.storage().ref('images/' + user.uid + '/perfil/' + snapshot.val().imagem)
          storageRef.getDownloadURL().then(function(url){
              imagem.src = url;
          })
          
          var tipoPessoa = snapshot.val().tipoPessoa;
          
          if (tipoPessoa == 'fisica'){
            nome.innerHTML = 'USUÁRIO: ' + snapshot.val().nome;
            idade.innerHTML = 'IDADE: ' + snapshot.val().idade + ' anos';
            cpf.innerHTML = 'CPF: ' + snapshot.val().cpf;
            telefone.innerHTML = 'TELEFONE: ' + snapshot.val().telefone;
            pais.innerHTML = 'PAÍS: ' + snapshot.val().pais;
            estado.innerHTML = 'ESTADO: ' + snapshot.val().estado;
            cidade.innerHTML = 'CIDADE: ' + snapshot.val().cidade;
            servico.innerHTML = 'TIPO SERVIÇO: ' + snapshot.val().tipoServiço;
            email.innerHTML = 'E-MAIL: ' + user.email;

            cnpj.style.display = 'none';
          }else{
            nome.innerHTML = 'USUÁRIO: ' + snapshot.val().nome;
            idade.style.display = 'none';
            cnpj.innerHTML = 'CNPJ: ' + snapshot.val().cnpj;
            telefone.innerHTML = 'TELEFONE: ' + snapshot.val().telefone;
            pais.innerHTML = 'PAÍS: ' + snapshot.val().pais;
            estado.innerHTML = 'ESTADO: ' + snapshot.val().estado;
            cidade.innerHTML = 'CIDADE: ' + snapshot.val().cidade;
            email.innerHTML = 'E-MAIL: ' + user.email;
            servico.innerHTML = 'TIPO SERVIÇO: ' + snapshot.val().tipoServiço;
            cpf.style.display = 'none';
          }
                      
      })
    } else {
        console.log('usuario não logado');
    }
});

// Evento de deslogar, sair da autenticação
btnOut.addEventListener('click', function(){
    firebase.auth().signOut().then(function() {
        console.log('Deslogando Usuário');
        alert('Deslogando Usuário!');
        window.location.assign("../index.html");
      }).catch(function(error) {
        console.log(error);
      });
})

