var btnOut = document.getElementById('btnSignOut');
var nome = document.getElementById('nome');
var email = document.getElementById('email');
var idade = document.getElementById('idade');
var cpf = document.getElementById('cpf');
var pais = document.getElementById('pais');
var estado = document.getElementById('estado');
var cidade = document.getElementById('cidade');
var telefone = document.getElementById('telefone');
var imagem = document.getElementById('img');

firebase.auth().onAuthStateChanged(function(user){    
    if (user) {
        console.log('usuario logado');
        firebase.database().ref('users/' + user.uid).on('value', function(snapshot){
            var storageRef = firebase.storage().ref('images/' + user.uid + '/perfil/' + snapshot.val().imagem)
            storageRef.getDownloadURL().then(function(url){
                imagem.src = url;
            })
            nome.value = snapshot.val().nome;
            idade.value = snapshot.val().idade;
            cpf.value = snapshot.val().cpf;
            pais.value = snapshot.val().pais;
            estado.value = snapshot.val().estado;
            cidade.value = snapshot.val().cidade;
            telefone.value = snapshot.val().telefone;
            email.value = user.email;            
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
})

btnFimEdit.addEventListener('click', function(){
    var nome = document.getElementById('nome').value;
    var idade = document.getElementById('idade').value;
    var telefone = document.getElementById('telefone').value;
    var estado = document.getElementById('states').value;
    var cidade = document.getElementById('city').value;

    data = {nome, idade, telefone, estado, cidade};

    firebase.database().ref().child('users/' + firebase.auth().currentUser.uid).update(data);

    btnFimEdit.style.display = "none";
    updatePhoto.style.display = "none";
    btnEdit.style.display = "inline";
    btnNaveg.style.display = "inline";
    btnPerfil.style.display = "inline";
    btnSignOut.style.display = "inline";
    document.getElementById('estado').style.display = "inline";
    document.getElementById('cidade').style.display = "inline";
    states.style.display = "none";
    city.style.display = "none";
    document.getElementById('idade').style.display = "inline";
    document.getElementById('age').style.display = "none";
    document.getElementById('info1').innerHTML = '*Se ainda não tem dados cadastrados, click em NOVOS DADOS.';

    location.reload();
})

function mTel(tel){
    var v = tel.value;
 
    if(isNaN(v[v.length-1])){ // impede entrar outro caractere que não seja número
       tel.value = v.substring(0, v.length-1);
       return;
    }
 
    tel.setAttribute("maxlenght", "14");
    if (v.length == 2) tel.value += " ";
    if (v.length == 8) tel.value += "-";
}