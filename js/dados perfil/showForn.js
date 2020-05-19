var btnOut = document.getElementById('btnSignOut');

firebase.auth().onAuthStateChanged(function(user){    
    if (user) {
        console.log('usuario logado');
        console.log(user.uid);
        firebase.database().ref('users/' + user.uid).on('value', function(snapshot){
            console.log(snapshot.val());
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

