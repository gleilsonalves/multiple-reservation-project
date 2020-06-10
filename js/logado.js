var logado = document.getElementById('logado');
var btnLogado = document.getElementById('btnLogado');
var btnPerfil = document.getElementById('btnPerfil');

firebase.auth().onAuthStateChanged(function(user){
    if(user){
        console.log('Usuario logado');
        firebase.database().ref('users/' + user.uid).on('value', function(snapshot){
            logado.innerHTML = 'Olá ' + snapshot.val().nome;
        })
        logado.style.display = "inline";
        btnLogado.style.display = "inline";
        btnPerfil.style.display = "inline";
    }else{
        console.log('Usuario nao logado');
        logado.style.display = "none";
        btnLogado.style.display = "none";
        btnPerfil.style.display = "none";
    }
})

btnLogado.addEventListener('click', function(){
    firebase.auth().signOut().then(function() {
        console.log('LogOut');
        alert('Deslogando');
        window.location.reload();
      }).catch(function(error) {
        console.log('Logout Error')
        console.log(error);
      });
})