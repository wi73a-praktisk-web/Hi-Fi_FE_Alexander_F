document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#form_div').innerHTML += `
    <form id="user_form" method="post" enctype="multipart/form-data">
        <h1>Add new User </h1>
        <p>
            <label for="name">Name: </label>
            <input name="name" type="text" id="name" placeholder="Name" minlength="5" maxlength="50" required autofocus/>
        </p>
        <p>
            <label for="username">Username: </label>
            <input name="username" type="text" id="username" placeholder="Username" minlength="5" maxlength="50" required/>
        </p>
        <p>
            <label for="password">Password: </label>
            <input name="password" type="password" id="password" placeholder="Password" minlength="5" maxlength="50" required/>
        </p>
    <p>
        <label for="rep_password">Repeat Password: </label>
        <input type="password" id="rep_password" placeholder="Repeat Password" minlength="5" maxlength="50" required/>
    </p>
    <p>
        <label for="email">E-mail Adress: </label>
        <input name="email" type="email" id="email" placeholder="E-mail adress" minlength="5" maxlength="50" required/>
    </p>
    <p>
        <label for="rep_email">Repeat E-mail Adress: </label>
        <input type="text" id="rep_email" placeholder="Repeat E-mail adress" minlength="5" maxlength="50" required/>
    </p>
    <p>
        <label for="adress">Adress: </label>
        <input name="adress" type="text" id="adress" placeholder="Adress"  minlength="5" maxlength="50" required/>
    </p>
    <p>
        <label for="phone_number">Phone number: </label>
        <input name="phone_number" type="text" id="phone_number" placeholder="Phone number"  min="5" max="11" required/>
    </p>
    <label>Upload Nyt Billede</label>
    <input type="file" name="userImage" id="userImage" value="empty">
    <img id="preview" width="200" height="75">
    <button type="submit" id="register_user_btn">Register</button>
</form>`;

    document.querySelector('#userImage').addEventListener('change', () => {
        var reader = new FileReader();
        let file = document.querySelector('#userImage').files[0];
        reader.addEventListener("load", function () {
            document.querySelector('#preview').src = reader.result;
            localStorage.setItem("imgData", reader.result);
        })
        if (file) {
            reader.readAsDataURL(file);
        }
    });
    var container, inputs;

    // container = document.querySelector('#user_form');
    // inputs = container.querySelectorAll('input');
    // console.log(inputs);
    // for (let index = 0; index < inputs.length; index++) {

    //     inputs[index].addEventListener("blur", event => {
    //         if (!event.target.checkValidity()) {
    //             event.target.setCustomValidity('Please fill out this field');
    //             /* event.target.focus(); */
    //             document.getElementById('register_user_btn').click();
    //         }
    //     })
    //     inputs[index].addEventListener("focus", event => {
    //         document.querySelector('#user_form').reportValidity();
    //     })
    // }
    // var lacking;

    // document.querySelector('#rep_password').addEventListener('keyup', (event) => {
    //     console.log("get's called onkeyup");
    //     if (document.querySelector('#rep_password').value == document.querySelector('#password').value) {
    //         document.querySelector('#rep_password').style.border = "3px solid green";
    //         document.querySelector('#password').style.border = "3px solid green";
    //         lacking = false;
    //     } else {
    //         document.querySelector('#rep_password').style.border = "3px solid red";
    //         document.querySelector('#password').style.border = "3px solid red";
    //         lacking = true;
    //     }
    // });

    // document.querySelector('#rep_email').addEventListener('keyup', (event) => {
    //     if (document.querySelector('#rep_email').value == document.querySelector('#email').value) {
    //         document.querySelector('#rep_email').style.border = "3px solid green";
    //         document.querySelector('#email').style.border = "3px solid green";
    //         lacking = false;
    //     } else {
    //         document.querySelector('#rep_email').style.border = "3px solid red";
    //         document.querySelector('#rep_email').style.border = "3px solid red";
    //         lacking = true;
    //     }
    // });

    // document.querySelector('#phone_number').addEventListener('keyup', (event) => {
    //     if (document.querySelector('#phone_number').value.length == 8) {
    //         if (!isNaN(document.querySelector('#phone_number').value)) {
    //             document.querySelector('#phone_number').style.border = "3px solid green";
    //             lacking = false;
    //         } else {
    //             document.querySelector('#phone_number').style.border = "3px solid red";
    //             lacking = true;
    //         }
    //     } else {
    //         document.querySelector('#phone_number').style.border = "3px solid red";
    //         lacking = true;
    //     }
    // });

    document.querySelector('#register_user_btn').addEventListener("click", (event) => {
        event.preventDefault();
        if (!document.querySelector("#user_form").reportValidity()) {
            document.querySelector("#user_form").reportValidity()
        } else {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            // grib formularen og håndter indholdet via FormData objektet
            let form = document.querySelector('#user_form');
            let data = new FormData(form);
            let init = {
                method: 'POST',
                body: data,
                cache: 'no-cache',
                mode: 'cors'
            };

            console.log(init.body);

            let request = new Request('http://localhost:8080/registerUser', init);

            fetch(request)
                .then(result => {
                    window.location.assign('http://localhost:3000/sub/manage_content.html');
                }).catch(err => {
                    console.log(err)
                });
        }
    })
})
// var container, inputs;

// container = document.querySelector('.registry_form');
// inputs = container.querySelectorAll('input');
// console.log(inputs);
// for (let index = 0; index < inputs.length; index++) {

//     inputs[index].addEventListener("blur", event => {
//         if (!event.target.checkValidity()) {
//             event.target.setCustomValidity('Please fill out this field');
//             /* event.target.focus(); */
//             document.getElementById('register_btn').click();
//         }
//     })
//     inputs[index].addEventListener("focus", event => {
//             document.querySelector('.registry_form').reportValidity();
//     })
// }
// var lacking;

// document.querySelector('#rep_password').addEventListener('keyup', (event) => {
//     console.log("get's called onkeyup");
//     if (document.querySelector('#rep_password').value == document.querySelector('#password').value) {
//         document.querySelector('#rep_password').style.border = "3px solid green";
//         document.querySelector('#password').style.border = "3px solid green";
//         lacking = false;
//     } else {
//         document.querySelector('#rep_password').style.border = "3px solid red";
//         document.querySelector('#password').style.border = "3px solid red";
//         lacking = true;
//     }
// });

// document.querySelector('#rep_email').addEventListener('keyup', (event) => {
//     if (document.querySelector('#rep_email').value == document.querySelector('#email').value) {
//         document.querySelector('#rep_email').style.border = "3px solid green";
//         document.querySelector('#email').style.border = "3px solid green";
//         lacking = false;
//     } else {
//         document.querySelector('#rep_email').style.border = "3px solid red";
//         document.querySelector('#rep_email').style.border = "3px solid red";
//         lacking = true;
//     }
// });

// document.querySelector('#phone_number').addEventListener('keyup', (event) => {
//     if (document.querySelector('#phone_number').value.length == 8) {
//         if (!isNaN(document.querySelector('#phone_number').value)) {
//             document.querySelector('#phone_number').style.border = "3px solid green";
//             lacking = false;
//         } else {
//             document.querySelector('#phone_number').style.border = "3px solid red";
//             lacking = true;
//         }
//     } else {
//         document.querySelector('#phone_number').style.border = "3px solid red";
//         lacking = true;
//     }
// });

// document.querySelector('#register_btn').addEventListener("click", (event) => {

//     // 1. get values 
//     // 2. validate values on client side
//     // 3. send values to server
//     // 4. server validation of values
//     // 5. server response
//     // 6. based on response, break and throw error or redirect to login page

//     event.preventDefault();
//     if (lacking || !document.querySelector(".registry_form").reportValidity()) {

//     } else {
//         let name = document.querySelector('#name').value.toString();
//         let username = document.querySelector('#username').value.toString();
//         let password = document.querySelector('#password').value.toString();
//         let email = document.querySelector('#email').value.toString();
//         let adress = document.querySelector('#adress').value.toString();
//         let phone_number = document.querySelector('#phone_number').value.toString();

//         let headers = new Headers();
//         headers.append('Content-Type', 'application/json');

//         let init = {
//             method: 'POST',
//             headers: headers,
//             body: `{"name":"${name}",
//                     "username":"${username}",
//                     "password":"${password}", 
//                     "email":"${email}", 
//                     "adress":"${adress}", 
//                     "phone_number":"${phone_number}"}`,
//             cache: 'no-cache',
//             mode: 'cors'
//         };

//         console.log(init.body);

//         let request = new Request('http://localhost:8080/registerUser', init);

//         fetch(request)
//             .then(response => {
//                 console.log(response);
//                 return response.json();
//             })
//             .then(result => {
//                 console.log("result = " + result[0]);
//                 console.log("rsult = " + result[0].id);
//                 window.location.replace("./profile_page.html?user=" + result[0].id);


//             }).catch(err => {
//                 console.log(err)
//             });
//     }
// })