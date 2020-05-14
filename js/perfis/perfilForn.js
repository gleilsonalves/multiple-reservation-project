var btnCancelForn = document.querySelector('#btnCancelForn');
var btnSubmit = document.querySelector('#submit');

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('usuario logado');
      console.log(user.email);
      console.log('ID', user.uid);
      console.log('Verificado?', user.emailVerified);
    } else {
      console.log('usuario nao logado');
    }
  });

  btnCancelForn.addEventListener('click', function(){
    firebase.auth().signOut().then(function() {
      console.log('Deslogado.');
      alert('Deslogando Usuário!');
      window.location.assign("../index.html");
    }).catch(function(error) {
      console.log(error);
    });
  })

var nomeForn = document.getElementById('inputNameForn');
var tipoPessoa = document.getElementById('tipoPessoa');
var idade = document.getElementById('idadeInput');
var cpf = document.getElementById('inputCPF');
var cnpj = document.getElementById('inputCNPJ');
var pais = document.getElementById('country');
var estado = document.getElementById('states');
var cidade = document.getElementById('city');
var tipoServiço = document.getElementById('tipoServiço');
var telefone = document.getElementById('telefone');
var fotoPerfil = document.getElementById('inputImage');

var database = firebase.database();
var dataRef = database.ref('users');

var storage = firebase.storage();
var filePhoto;

// Evento de upload da foto do perfil para o storage
fotoPerfil.addEventListener('change', function(e){
  var file = e.target.files[0];
  var storageRef = storage.ref('images/' + file.name).put(file).then(function(result){
      filePhoto = file;
      alert('Foto anexada com sucesso!');
      console.log('Upload da imagem realizado!');
  }).catch(function(error){
      console.log(error);
      console.log('Erro no upload da imagem!');
  })
});

// Evento de inserção de dados no BD Firebase
btnSubmit.addEventListener('click', function(){
  const autoId = dataRef.push().key;
  
  if(tipoPessoa.value == 'fisica'){
    dataRef.child(autoId).set({
      tipo_user: 'fornecedor',
      nome: nomeForn.value,
      tipoPessoa: tipoPessoa.value,
      idade: idade.value,        
      cpf: cpf.value,
      tipoServiço: tipoServiço.value,
      telefone: telefone.value,     
      pais: pais.value,        
      estado: estado.value,        
      cidade: cidade.value,        
      imagem: storage.ref('images/') + '/' + filePhoto.name
    }).then(function(){
        alert('Dados Salvos!');
        window.location.assign('showForn.html');
    }).catch(function(){
        alert('Verifique os dados');
    })
  }else{
    dataRef.child(autoId).set({
      tipo_user: 'fornecedor',
      nome: nomeForn.value,
      tipoPessoa: tipoPessoa.value,       
      cnpj: cnpj.value,
      tipoServiço: tipoServiço.value,
      telefone: telefone.value,     
      pais: pais.value,        
      estado: estado.value,        
      cidade: cidade.value,        
      imagem: storage.ref('images/') + '/' + filePhoto.name
    }).then(function(){
        alert('Dados Salvos!');
        window.location.assign('showForn.html');
    }).catch(function(){
        alert('Verifique os dados');
    })
  }
})