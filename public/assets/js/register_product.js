document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#register_product_btn').addEventListener('click', (event) => {
        
                // 1. get values 
                // 2. validate values on client side
                // 3. send values to server
                // 4. server validation of values
                // 5. server response
                // 6. based on response, break and throw error or redirect to login page
        
                event.preventDefault();
                
                    let name = document.querySelector('#name').value.toString();
                    let username = document.querySelector('#description').value.toString();
                    let item_number = document.querySelector('#item_number').value.toString();
                    let price = document.querySelector('#price').value.toString();
                    let prod_name = document.querySelector('#producer').value.toString();
                    let cat_name = document.querySelector('#category').value.toString();
                    let image = document.querySelector('#image').files[0].name;
                    console.log(image);
                    /* let headers = new Headers();
                    headers.append('Content-Type', 'application/json');
        
                    let init = {
                        method: 'POST',
                        headers: headers,
                        body: `{"name":"${name}",
                                "description":"${description}",
                                "item_number":"${item_number}", 
                                "price":"${price}", 
                                "image":"${image}", 
                                "prod_name":"${prod_name}", 
                                "cat_name":"${cat_name}"`,
                        cache: 'no-cache',
                        mode: 'cors'
                    };
        
                    console.log(init.body);
        
                    let request = new Request('http://localhost:8080/registerProduct', init);
        
                    fetch(request)
                        .then(response => {
                            console.log(response);
                            return response.json();
                        })
                        .then(result => {
                            console.log("result = " + result[0]);
                            console.log("rsult = " + result[0].id);
                            window.location.replace("./profile_page.html?search="+ result[0].id);
        
        
                        }).catch(err => {
                            console.log(err)
                        }); */
        
        
        
            })
})