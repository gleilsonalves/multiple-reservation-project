var divPai = document.getElementsByClassName('container')[0];

firebase.auth().onAuthStateChanged(function(user){
    if(user){
        var database = firebase.database().ref('service');

        document.getElementById('informe').style.display = "none";

        database.once('value').then(function(snapshot){
            if(snapshot.exists()){
                snapshot.forEach(function(childSnapshot){
                    var data = childSnapshot.val();
                    montarCard(data.titulo, data.descricao, data.contato, data.valor, data.imagem);
                })
            } 
        })
    }
})

function montarCard(titulo, desc, contato, valor, imagem){
    let row = document.createElement('div');
    let col = document.createElement('div')
    let h5 = document.createElement('h5');
    let col1 = document.createElement('div');
    let col2 = document.createElement('div');
    let img = document.createElement('img');
    let p_label1 = document.createElement('p');
    let p_label2 = document.createElement('p');
    let p_label3 = document.createElement('p');
    let p_desc = document.createElement('p');
    let p_contato = document.createElement('p');
    let p_valor = document.createElement('p');

    divPai.appendChild(row);
    row.appendChild(col);
    col.appendChild(h5);
    col.appendChild(col1);
    col.appendChild(col2);
    col1.appendChild(img);
    col2.appendChild(p_label1);
    col2.appendChild(p_desc);
    col2.appendChild(p_label2);
    col2.appendChild( p_contato);
    col2.appendChild(p_label3);
    col2.appendChild(p_valor);

    row.classList.add('row');
    col.classList.add('col-sm', 'conteudo');
    h5.classList.add('title');
    col1.classList.add('col-sm');
    col2.classList.add('col-sm', 'data-contents');
    img.classList.add('imagemURL');
    p_label1.classList.add('h5', 'indicadores');
    p_label2.classList.add('h5', 'indicadores');
    p_label3.classList.add('h5', 'indicadores');
    p_desc.classList.add('h6', 'valores');
    p_contato.classList.add('h6', 'valores');
    p_valor.classList.add('h6', 'valores');

    p_label1.innerHTML = 'Descrição';
    p_label2.innerHTML = 'Contato';
    p_label3.innerHTML = 'Valor';

    h5.innerText = titulo;
    p_desc.innerText = desc;
    p_contato.innerText = contato;
    p_valor.innerText = 'R$ ' + valor;

    var database = firebase.database().ref('service');
    database.once('value').then(function(snapshot){
        snapshot.forEach(function(childSnapshot){
            var id = childSnapshot.key;
            var storageRef = firebase.storage().ref('images/' + id + '/servico/' + imagem);
            storageRef.getDownloadURL().then(function(url){ 
                img.src = url;
            });
        });        
    });
};

