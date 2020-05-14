function mascara(i){
   
   var v = i.value;
    
   if(isNaN(v[v.length-1])){ // impede entrar outro caractere que não seja número
      i.value = v.substring(0, v.length-1);
      return;
   }
    
   i.setAttribute("maxlength", "14");
   if (v.length == 3 || v.length == 7) i.value += ".";
   if (v.length == 11) i.value += "-"; 
}

function mCNPJ(cnpj){
   
   var v = cnpj.value;

   if(isNaN(v[v.length-1])){ // impede entrar outro caractere que não seja número
      cnpj.value = v.substring(0, v.length-1);
      return;
   }

   cnpj.setAttribute("maxlength", "18");
   if (v.length == 2 || v.length == 6) cnpj.value += ".";
   if (v.length == 10) cnpj.value += "/";
   if (v.length == 15) cnpj.value += "-";

}

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