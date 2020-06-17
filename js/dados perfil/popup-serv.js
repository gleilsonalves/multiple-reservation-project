var titulo = document.getElementById('titulo');
var desc = document.getElementById('desc');
var contato = document.getElementById('contato');
var valor = document.getElementById('valor');
var imagem = document.getElementById('imagem');
var filePhoto;

var saveServ = document.getElementById('saveServ');

firebase.auth().onAuthStateChanged(function(user){
    if(user){
        console.log('Usuário logado');
        var database = firebase.database().ref().child('service/'+ user.uid);
        var storage = firebase.storage();

        imagem.addEventListener('change', function(e){
            var file = e.target.files[0];
            firebase.auth().onAuthStateChanged(function(user){
              if(user){
                var storageRef = storage.ref('images/' + user.uid + '/servico/' + file.name).put(file).then(function(result){
                    filePhoto = file;
                    console.log('Upload OK!');
                    console.log(result);
                }).catch(function(error){
                    console.log(error);
                    console.log('Erro no upload da imagem!');
                })
              }else{
                console.log('Usuário nao autenticado, upload de foto fail!');
              }
            });
        });

        saveServ.addEventListener('click', function(){
            //var id = database.push().key;            
            database.set({
                titulo: titulo.value,
                descricao: desc.value,
                contato: contato.value,
                valor: valor.value,
                imagemURL: storage.ref('images/' + user.uid) + '/imagemServ/' + filePhoto.name,
                imagem: filePhoto.name
            });       
            window.close();
        });        
    }else{
        console.log('Usuário não logado');
    }
});