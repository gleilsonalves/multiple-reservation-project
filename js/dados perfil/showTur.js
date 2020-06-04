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
            idade.value = snapshot.val().idade + ' anos';
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
var editarNome = document.getElementById('editarNome');
var editarIdade = document.getElementById('editarIdade');
var editarTelefone = document.getElementById('editarTelefone');
var editarEstado = document.getElementById('editarEstado');
var saveNome =  document.getElementById('saveNome');
var saveIdade = document.getElementById('saveIdade');
var saveTelefone = document.getElementById('saveTelefone');
var saveEstado = document.getElementById('saveEstado');

var btnEdit = document.getElementById('btnEdit');
var btnFimEdit = document.getElementById('btnFimEdit');
var btnNaveg = document.getElementById('btnNaveg');
var btnPerfil = document.getElementById('btnPerfil');
var btnSignOut = document.getElementById('btnSignOut');
var updatePhoto = document.getElementById('updatePhoto');


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
    editarNome.style.display = "inline";
    editarIdade.style.display = "inline";
    editarTelefone.style.display = "inline";
    editarEstado.style.display = "inline";
    btnFimEdit.style.display = "inline";
    updatePhoto.style.display = "inline";
    btnEdit.style.display = "none";
    btnNaveg.style.display = "none";
    btnPerfil.style.display = "none";
    btnSignOut.style.display = "none";
    document.getElementById('info1').innerHTML = '*Edição para dados já cadastrados.';
})

btnFimEdit.addEventListener('click', function(){
    editarNome.style.display = "none";
    editarIdade.style.display = "none";
    editarTelefone.style.display = "none";
    editarEstado.style.display = "none";
    btnFimEdit.style.display = "none";
    updatePhoto.style.display = "none";
    btnEdit.style.display = "inline";
    btnNaveg.style.display = "inline";
    btnPerfil.style.display = "inline";
    btnSignOut.style.display = "inline";
    document.getElementById('info1').innerHTML = '*Se ainda não tem dados cadastrados, click em NOVOS DADOS.';
    location.reload();
})

editarNome.addEventListener('click', function(){
    nome.removeAttribute('disabled');
    nome.setAttribute('required', true);
    editarNome.style.display = "none";
    saveNome.style.display = "inline";
})

saveNome.addEventListener('click', function(){
    var dataRef = firebase.database().ref();
    var nome = document.getElementById('nome').value;
    data = {nome};
    dataRef.child('users/' + firebase.auth().currentUser.uid).update(data);

    document.getElementById('nome').setAttribute('disabled', true);
    editarNome.style.display = "inline";
    saveNome.style.display = "none";
})

editarIdade.addEventListener('click', function(){
    idade.removeAttribute('disabled');
    editarIdade.style.display = "none";
    saveIdade.style.display = "inline";
})

saveIdade.addEventListener('click', function(){
    var dataRef = firebase.database().ref();
    var idade = document.getElementById('idade').value;
    data = {idade};
    dataRef.child('users/' + firebase.auth().currentUser.uid).update(data);

    document.getElementById('idade').setAttribute('disabled', true);
    editarIdade.style.display = "inline";
    saveIdade.style.display = "none";    
})

editarTelefone.addEventListener('click', function(){
    telefone.removeAttribute('disabled');
    editarTelefone.style.display = "none";
    saveTelefone.style.display = "inline";
})

saveTelefone.addEventListener('click', function(){
    var dataRef = firebase.database().ref();
    var telefone = document.getElementById('telefone').value;
    data = {telefone};
    dataRef.child('users/' + firebase.auth().currentUser.uid).update(data);

    document.getElementById('telefone').setAttribute('disabled', true);
    editarTelefone.style.display = "inline";
    saveTelefone.style.display = "none";    
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

editarEstado.addEventListener('click', function(){
    document.getElementById('estado').style.display = "none";
    document.getElementById('cidade').style.display = "none";
    document.getElementById('city').style.display = "inline";
    document.getElementById('states').style.display = "inline";
    editarEstado.style.display = "none";
    saveEstado.style.display = "inline";
})

saveEstado.addEventListener('click', function(){
    var dataRef = firebase.database().ref();
    var cidade = document.querySelector('#city').value;
    var estado = document.querySelector('#states').value;

    data = {estado, cidade};
    dataRef.child('users/' + firebase.auth().currentUser.uid).update(data);

    document.getElementById('estado').style.display = "inline";
    document.getElementById('cidade').style.display = "inline";
    document.getElementById('city').style.display = "none";
    document.getElementById('states').style.display = "none";
    editarEstado.style.display = "inline";
    saveEstado.style.display = "none";
})