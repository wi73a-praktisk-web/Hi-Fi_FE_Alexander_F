const getUrlParameter = function (sParam) {
    const sPageURL = decodeURIComponent(window.location.search.substring(1));
    const sURLVariables = sPageURL.split('&');
    let sParameterName;
    for (let int = 0; int < sURLVariables.length; int = int + 1) {
        sParameterName = sURLVariables[int].split('=');
        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

const getUserByID = (param) => {
    document.getElementById('profile_page_a').setAttribute('href', "profile_page.html?user=" + param);
    console.log("param client side = " + param);
    let param2 = param.toString();

    console.log(param);

    let request = new Request('http://localhost:8080/user', {
        'method': 'POST',
        'headers': {
            'Authorization': localStorage.getItem('token'),
            'userID': localStorage.getItem('userid'),
            'Content-Type': 'application/json'
        },
        'body': `{
            "param" : "${param2}"}`,
        'mode': 'cors',
        'cache': 'default'
    });

    fetch(request)
        .then(response => {
            console.log(response);
            return response.json();
        })
        .then(response => {
            document.getElementById('profile_cont').innerHTML += `
            <row>
                <div class="col-xs-12">
                    <row>
                        <form id="user_form" method="post" enctype="multipart/form-data">
                            <div class="col-xs-8">
                                <h1>${response[0].name}</h1>
                            </div>
                            <div id="profile_img_div" class="col-xs-4">
                                <img src="http://localhost:8080/images/${response[0].url}" class="img-responsive">
                            </div>
                            <div class="col-xs-12">
                            <button id="edit_btn" class="glyphicon glyphicon-edit"></button><br/>
                            <p>
                                <label for="name">Name: </label>
                                <input type="text" name="name" id="name" value="${response[0].name}" minlength="5" maxlength="50" required autofocus readonly><br/>
                            </p>
                            <p>
                                <label for="username">Username: </label>
                                <input name="username" type="text" id="username" value="${response[0].username}" minlength="5" maxlength="50" required readonly><br/>
                            </p>
                            <p>
                                <label for="email">E-mail Adress: </label>
                                <input name="email" type="text" id="email" value="${response[0].email}" minlength="5" maxlength="50" required required readonly><br/>
                            </p>
                            <p>
                                <label for="adress">Adress: </label>
                                <input name="adress" type="text" id="adress" value="${response[0].adress}" minlength="5" maxlength="50" readonly><br/>
                            </p>
                            <p>
                                <label for="phone">Phone number: </label>
                                <input name="phone" type="text" id="phone" value="${response[0].phone}" minlength="5" maxlength="50" readonly><br/>
                            </p>
                            <p>
                                <label for="created">Created: </label>
                                <input name="created" type="text" id="created" value="${response[0].created}" readonly>
                            </p>
                            <button type="submit" id="update_user_btn">Update</button>
                            </div>
                        </form>
                    </row>
                </div>
            </row>
            `;
            document.querySelector('#edit_btn').addEventListener('click', (event) => {
                event.preventDefault();
                document.getElementById("update_user_btn").style.display = "block";
                let inputs = document.getElementById('user_form').getElementsByTagName("input");
                Array.from(inputs).forEach(input => {
                    input.readOnly = false;
                });
                document.getElementById('name').focus();
                document.getElementById('profile_img_div').innerHTML += `
                <label>Upload Nyt Billede</label>
                <input type="hidden" name="oldUserImage" id="olduserImage" value="${response[0].url}">
                <input type="file" name="userImage" id="userImage" value="${response[0].url}">
                <img id="preview" class="img-responsive">
                `;
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
            });
            document.getElementById("update_user_btn").style.display = "none";

            document.querySelector('#update_user_btn').addEventListener("click", (event) => {

                event.preventDefault();


                // grib formularen og håndter indholdet via FormData objektet
                let form = document.querySelector('#user_form');
                let data = new FormData(form);
                let init = {
                    method: 'PUT',
                    body: data,
                    cache: 'no-cache',
                    mode: 'cors'
                };

                console.log(init.body);

                let request = new Request(`http://localhost:8080/updateUser/${response[0].id}`, init);

                fetch(request)
                    .then(result => {
                        window.location.assign('http://localhost:3000/sub/profile_page.html?user=' + response[0].id);
                    }).catch(err => {
                        console.log(err)
                    });
                // }
            })
        })
        .catch(err => {
            console.log(err)
        });
}

document.addEventListener('DOMContentLoaded', function () {

    if (localStorage.getItem('token') === null) {
        window.location.assign('./log_in.html');
    }
    if (getUrlParameter('user')) {
        getUserByID(getUrlParameter('user'));
    }
});