function pessoa(tipo){

    if(tipo == "fisica"){
        document.querySelector("#inputCPF").style.display = "block";
        document.querySelector("#inputCPFDiv").style.display = "block";
        document.querySelector("#inputCNPJ").style.display = "none";
        document.querySelector("#inputCNPJDiv").style.display = "none";
        document.querySelector("#idadeInput").style.display = "block";
        document.querySelector("#idadeInputDiv").style.display = "block";
    }
    else 
        if(tipo=="juridica"){
            document.querySelector("#inputCPF").style.display = "none";
            document.querySelector("#inputCPFDiv").style.display = "none";
            document.querySelector("#inputCNPJ").style.display = "block";
            document.querySelector("#inputCNPJDiv").style.display = "block";
            document.querySelector("#idadeInput").style.display = "none";
            document.querySelector("#idadeInputDiv").style.display = "none";
        }
  }