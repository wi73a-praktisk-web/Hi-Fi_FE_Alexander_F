document.addEventListener('DOMContentLoaded', function () {
    var container, inputs;

    container = document.querySelector('.registry_form');
    inputs = container.querySelectorAll('input');
    console.log(inputs);
    for (let index = 0; index < inputs.length; index++) {

        inputs[index].addEventListener("blur", event => {
            if (!event.target.checkValidity()) {
                event.target.setCustomValidity('Please fill out this field');
                /* event.target.focus(); */
                document.getElementById('register_btn').click();
            }
        })
        inputs[index].addEventListener("focus", event => {
                document.querySelector('.registry_form').reportValidity();
        })
    }
    var lacking;

    document.querySelector('#rep_password').addEventListener('keyup', (event) => {
        console.log("get's called onkeyup");
        if (document.querySelector('#rep_password').value == document.querySelector('#password').value) {
            document.querySelector('#rep_password').style.border = "3px solid green";
            document.querySelector('#password').style.border = "3px solid green";
            lacking = false;
        } else {
            document.querySelector('#rep_password').style.border = "3px solid red";
            document.querySelector('#password').style.border = "3px solid red";
            lacking = true;
        }
    });

    document.querySelector('#rep_email').addEventListener('keyup', (event) => {
        if (document.querySelector('#rep_email').value == document.querySelector('#email').value) {
            document.querySelector('#rep_email').style.border = "3px solid green";
            document.querySelector('#email').style.border = "3px solid green";
            lacking = false;
        } else {
            document.querySelector('#rep_email').style.border = "3px solid red";
            document.querySelector('#rep_email').style.border = "3px solid red";
            lacking = true;
        }
    });

    document.querySelector('#phone_number').addEventListener('keyup', (event) => {
        if (document.querySelector('#phone_number').value.length == 8) {
            if (!isNaN(document.querySelector('#phone_number').value)) {
                document.querySelector('#phone_number').style.border = "3px solid green";
                lacking = false;
            } else {
                document.querySelector('#phone_number').style.border = "3px solid red";
                lacking = true;
            }
        } else {
            document.querySelector('#phone_number').style.border = "3px solid red";
            lacking = true;
        }
    });

    document.querySelector('#register_btn').addEventListener("click", (event) => {

        // 1. get values 
        // 2. validate values on client side
        // 3. send values to server
        // 4. server validation of values
        // 5. server response
        // 6. based on response, break and throw error or redirect to login page

        event.preventDefault();
        if (lacking || !document.querySelector(".registry_form").reportValidity()) {

        } else {
            let name = document.querySelector('#name').value.toString();
            let username = document.querySelector('#username').value.toString();
            let password = document.querySelector('#password').value.toString();
            let email = document.querySelector('#email').value.toString();
            let adress = document.querySelector('#adress').value.toString();
            let phone_number = document.querySelector('#phone_number').value.toString();

            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            let init = {
                method: 'POST',
                headers: headers,
                body: `{"name":"${name}",
                        "username":"${username}",
                        "password":"${password}", 
                        "email":"${email}", 
                        "adress":"${adress}", 
                        "phone_number":"${phone_number}"}`,
                cache: 'no-cache',
                mode: 'cors'
            };

            console.log(init.body);

            let request = new Request('http://localhost:8080/registerUser', init);

            fetch(request)
                .then(response => {
                    console.log(response);
                    return response.json();
                })
                .then(result => {
                    console.log("result = " + result[0]);
                    console.log("rsult = " + result[0].id);
                    window.location.replace("./profile_page.html?user=" + result[0].id);


                }).catch(err => {
                    console.log(err)
                });
        }
    })
})