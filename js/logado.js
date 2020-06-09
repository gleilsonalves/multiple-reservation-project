var logado = document.getElementById('logado');
var btnLogado = document.getElementById('btnLogado');

firebase.auth().onAuthStateChanged(function(user){
    if(user){
        console.log('Usuario logado');
        firebase.database().ref('users/' + user.uid).on('value', function(snapshot){
            logado.innerHTML = 'Olá ' + snapshot.val().nome;
        })
        logado.style.display = "inline";
        btnLogado.style.display = "inline";
    }else{
        console.log('Usuario nao logado');
        logado.style.display = "none";
        btnLogado.style.display = "none";
    }
})

btnLogado.addEventListener('click', function(){
    firebase.auth().signOut().then(function() {
        console.log('LogOut User');
      }).catch(function(error) {
        console.log('LogOut Error')
        console.log(error);
      });
})