var btnCancel = document.getElementById('btnCancel');
var btnSubmit = document.getElementById('btnSubmit');

// Verificar se o usuário está logado
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log('usuario logado');
  } else {
    console.log('usuario nao logado');
  }
});

// ação de deslogar do botao SAIR
btnCancel.addEventListener('click', function(){
  firebase.auth().signOut().then(function() {
    console.log('Deslogando Usuário');
    alert('Deslogando Usuário!');
    window.location.assign("../index.html");
  }).catch(function(error) {
    console.log(error);
  });
})


// inserir dados no Firebase
var nomeTur = document.getElementById('inputNameTur');
var idade = document.getElementById('idadeInput');
var cpf = document.getElementById('inputCPF');
var pais = document.getElementById('country');
var estado = document.getElementById('states');
var cidade = document.getElementById('city');
var telefone = document.getElementById('telefone');
var fotoPerfil = document.getElementById('inputImage');

var database = firebase.database();
var dataRef = database.ref('users');

var storage = firebase.storage();
var filePhoto;

// Evento de upload da foto do perfil para o storage
fotoPerfil.addEventListener('change', function(e){
  var file = e.target.files[0];
  firebase.auth().onAuthStateChanged(function(user){
    if(user){
      var storageRef = storage.ref('images/' + user.uid + '/perfil/' + file.name).put(file).then(function(result){
          filePhoto = file;
          alert('Foto anexada com sucesso!');
          console.log('Upload Foto OK!');
      }).catch(function(error){
          console.log(error);
          console.log('Erro no upload da imagem!');
      })
    }else{
      console.log('Usuário nao autenticado, upload de foto fail!');
    }
  })
});

// Evento de inserção de dados no BD Firebase
btnSubmit.addEventListener('click', function(){
  dataRef.child(firebase.auth().currentUser.uid).set({
    tipo_user: 'turista',
    nome: nomeTur.value,
    email: firebase.auth().currentUser.email,
    idade: idade.value,        
    cpf: cpf.value,        
    pais: pais.value,
    estado: estado.value,        
    cidade: cidade.value,
    telefone: telefone.value,        
    imagem_URL: storage.ref('images/' + firebase.auth().currentUser.uid) + '/perfil/' + filePhoto.name,
    imagem: filePhoto.name
  }).then(function(){
      alert('Dados Salvos!');
      window.location.assign('showTur.html');
  }).catch(function(){
      alert('Verifique os dados');
  })
})