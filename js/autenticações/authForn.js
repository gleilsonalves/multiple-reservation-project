// Inputs da tela de login do fornecedor
var inputEmailForn = document.getElementById('emailInput');
var inputPassForn = document.getElementById('inputPass');

// Button Login
var btnSubmit = document.querySelector('#submit');

// Autenticar com e-mail e senha

btnSubmit.addEventListener('click', function(){
    var user = firebase.auth().currentUser;

    if(user){
        alert('Já existe usuário logado.');
        alert('Saia do usuário atual para poder fazer novo login!');
        window.location.reload();
    }else{
        firebase.auth().signInWithEmailAndPassword(inputEmailForn.value, inputPassForn.value).then(function(result){        
            firebase.auth().onAuthStateChanged(function(user){
                if(user.emailVerified == true){
                    console.log(result);
                    console.log('Autenticação realizada com sucesso.');
                    alert('Bem Vindo a plataforma Multiple Reservation!');
                    window.location.assign('html/showForn.html');
                }else{
                    console.log('e-mail não verificado.');
                    alert('Verifique o link de confirmação no e-mail cadastrado.');
                    window.location.reload();
                }
            })        
        }).catch(function(error){
            console.log('Erro no login.');
            alert('ERRO NO LOGIN!');
            alert('Verifique se seu e-mail e senhas estão corretos.');
            console.log(error);
        })
    }
    
})

//abrir o pop-up para reset de senha
function newPopup(){
    var Window = window.open (
        'popup.html',
        'pagina',
        "width=370, height=275, top=100, left=110, scrollbars=no " );
}
