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
var servico = document.getElementById('servico');
var imagem = document.getElementById('img');
var pessoa = document.getElementById('pessoa');


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
                cpf.style.marginLeft = '2rem'
                email.value = user.email;                
                document.getElementById('pessoa').value = snapshot.val().tipoPessoa;
                nome.value = snapshot.val().nome;
                idade.value = snapshot.val().idade;
                cpf.value = snapshot.val().cpf;
                telefone.value = snapshot.val().telefone;
                pais.value = snapshot.val().pais;
                estado.value = snapshot.val().estado;
                cidade.value = snapshot.val().cidade;
                servico.value = snapshot.val().tipoServiço;
            }else{
                idade.style.display = "none";
                document.getElementById('cont-idade').style.display = "none";
                document.getElementById('cont-cpf').innerHTML = 'CNPJ';
                document.getElementById('pessoa').value = snapshot.val().tipoPessoa;
                nome.value = snapshot.val().nome;
                cpf.value = snapshot.val().cnpj;
                telefone.value = snapshot.val().telefone;
                pais.value = snapshot.val().pais;
                estado.value = snapshot.val().estado;
                cidade.value = snapshot.val().cidade;
                email.value = user.email;
                servico.value = snapshot.val().tipoServiço;
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

//evento de editar dados
var btnEdit = document.getElementById('btnEdit');
var btnFimEdit = document.getElementById('btnFimEdit');
var btnNaveg = document.getElementById('btnNaveg');
var btnPerfil = document.getElementById('btnPerfil');
var btnSignOut = document.getElementById('btnSignOut');
var updatePhoto = document.getElementById('updatePhoto');

//upload de nova foto de perfil
updatePhoto.addEventListener('change', function(e){
    var storage = firebase.storage();
    var dataRef = firebase.database().ref();

    var file = e.target.files[0];
    storage.ref('images/' + firebase.auth().currentUser.uid + '/perfil/' + file.name).put(file)
    .then(function(result){
        console.log(result);
        alert('Foto ok!');        
    }).catch(function(error){
        console.log(error);
        alert('Erro ao anexar foto!');
    });

    var imagem = file.name;
    var imagem_URL = storage.ref('images/' + firebase.auth().currentUser.uid) + '/perfil/' + file.name;

    data = {imagem, imagem_URL};
    dataRef.child('users/' + firebase.auth().currentUser.uid).update(data);

    var storageRef = firebase.storage().ref('images/' + firebase.auth().currentUser.uid + '/perfil/' + file.name)
        storageRef.getDownloadURL().then(function(url){
            document.getElementById('logo').src = url;
        })
})

btnEdit.addEventListener('click', function(){
    var user = firebase.auth().currentUser;
    
    firebase.database().ref().child('users/' + user.uid).on('value', function(snapshot){
        var tipo = snapshot.val().tipoPessoa;

        if(tipo == 'fisica'){
            btnFimEdit.style.display = "inline";
            updatePhoto.style.display = "inline";
            btnEdit.style.display = "none";
            btnNaveg.style.display = "none";
            btnPerfil.style.display = "none";
            btnSignOut.style.display = "none";
            document.getElementById('info1').innerHTML = '*Edição para dados já cadastrados.';
            nome.removeAttribute('disabled');
            idade.style.display = "none";
            telefone.removeAttribute('disabled');
            estado.style.display = "none";
            cidade.style.display = "none";
            states.style.display = "inline";
            city.style.display = "inline";
            document.getElementById('age').style.display = "inline";
            document.getElementById('tipoServiço').style.display = "inline";
            document.getElementById('servico').style.display = "none";
        }else{
            btnFimEdit.style.display = "inline";
            updatePhoto.style.display = "inline";
            btnEdit.style.display = "none";
            btnNaveg.style.display = "none";
            btnPerfil.style.display = "none";
            btnSignOut.style.display = "none";
            document.getElementById('info1').innerHTML = '*Edição para dados já cadastrados.';
            nome.removeAttribute('disabled');
            idade.style.display = "none";
            telefone.removeAttribute('disabled');
            estado.style.display = "none";
            cidade.style.display = "none";
            states.style.display = "inline";
            city.style.display = "inline";
            document.getElementById('age').style.display = "inline";
            document.getElementById('tipoServiço').style.display = "inline";
            document.getElementById('servico').style.display = "none";
        }
    })    
})

btnFimEdit.addEventListener('click', function(){
    var nome = document.getElementById('nome').value;
    var idade = document.getElementById('idade').value;
    var telefone = document.getElementById('telefone').value;
    var estado = document.getElementById('states').value;
    var cidade = document.getElementById('city').value;
    var tipoServiço = document.getElementById('tipoServiço').value;

    data = {nome, idade, telefone, estado, cidade, tipoServiço};

    firebase.database().ref().child('users/' + firebase.auth().currentUser.uid).update(data);

    firebase.database().ref().child('users/' + firebase.auth().currentUser.uid).on('value', function(snapshot){
        var tipo = snapshot.val().tipoPessoa;

        if(tipo == 'fisica'){
            btnFimEdit.style.display = "none";
            updatePhoto.style.display = "none";
            btnEdit.style.display = "inline";
            btnNaveg.style.display = "inline";
            btnPerfil.style.display = "inline";
            btnSignOut.style.display = "inline";
            document.getElementById('info1').innerHTML = '*Se ainda não tem dados cadastrados, click em NOVOS DADOS.';
            nome.setAttribute('disabled', false);
            idade.style.display = "inline";
            telefone.setAttribute('disabled', false);
            estado.style.display = "inline";
            cidade.style.display = "inline";
            states.style.display = "none";
            city.style.display = "none";
            document.getElementById('age').style.display = "none";
            document.getElementById('tipoServiço').style.display = "none";
            document.getElementById('servico').style.display = "inline";
        }else{
            btnFimEdit.style.display = "none";
            updatePhoto.style.display = "none";
            btnEdit.style.display = "inline";
            btnNaveg.style.display = "inline";
            btnPerfil.style.display = "inline";
            btnSignOut.style.display = "inline";
            document.getElementById('info1').innerHTML = '*Se ainda não tem dados cadastrados, click em NOVOS DADOS.';
            document.getElementById('nome').getAttribute('disabled', true);
            document.getElementById('idade').style.display = "inline";
            document.getElementById('telefone').getAttribute('disabled', true);
            document.getElementById('estado').style.display = "inline";
            document.getElementById('cidade').style.display = "inline";
            states.style.display = "none";
            city.style.display = "none";
            document.getElementById('age').style.display = "none";
            document.getElementById('tipoServiço').style.display = "none";
            document.getElementById('servico').style.display = "inline";
        }
    })
    location.reload();
})