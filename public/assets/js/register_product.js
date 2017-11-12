document.addEventListener('DOMContentLoaded', function () {

    if (localStorage.getItem('token') === null) {
        window.location.assign('sub/log_in.html');
    }
    /*  document.querySelector('#image').addEventListener("change", function () {
         var reader = new FileReader();
         let file = document.querySelector('#image').files[0];
     
         reader.addEventListener("load", function () {
             document.querySelector('#preview').src = reader.result;
             localStorage.setItem("imgData", reader.result);
         }, false);
     
         if (file) {
             reader.readAsDataURL(file);
         }
     
         console.log(file);
     }) */

    
})