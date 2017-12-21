document.addEventListener('DOMContentLoaded', function () {
    if (localStorage.getItem('token') === null) {
        window.location.assign('./log_in.html');
    }
});

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

document.getElementById('products').addEventListener('click', (event) => {
    Array.from(document.getElementById('ctrl_panel_btn_div').getElementsByTagName('button')).forEach(element => {
        if (element.innerHTML == "Products") {
            element.className = element.className + " active";
        } else {
            element.className = "";
        }
    });
    document.getElementById('edit_div').innerHTML = '';
    console.log("something, happens!");
    document.getElementById('content_div').innerHTML = '';
    fetch('http://95.85.49.133:3000/products')
        .then(function (result) {
            return result.json();
        }).then(products => {
            document.getElementById('content_div').innerHTML += `
            <h1>Products</h1>
            <div class="col-xs-12">
                <button id="new_product" onclick="add_new_product()">Add New Product</button>
            </div>
            <table id="content_table">
                <tr>
                    <th>Options</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>vareNr</th>
                    <th>Beskrivelse</th>
                    <th>Pris</th>
                    <th>Producent</th>
                    <th>Kategori</th>
                </tr>
            </table>`;
            products.forEach(product => {
                document.getElementById('content_table').innerHTML += `
                <tr class="prod_tr">
                    <td>
                        <button id="${product.id}" onclick="edit_product(this.id)">
                            <span class="glyphicon glyphicon-pencil">

                            </span>
                        </button><br/>
                        <button id="${product.id}" onclick="delete_product(this.id)">
                            <span class="glyphicon glyphicon-trash">

                            </span>
                        </button>
                    </td>
                    <td>
                        <img src='http://95.85.49.133:3000/images/${product.billede}' height="75" width="200 "alt="henter billede">
                    </td>
                    <td>${product.Navn}
                    </td>
                    <td>${product.vareNr}
                    </td>
                    <td>${product.Beskrivelse} 
                    </td>
                    <td>${product.Pris}
                    </td>
                    <td>${product.prod_navn}
                    </td>
                    <td>${product.kat_navn}
                    </td>
                </tr>`;

            });
            fetch('http://95.85.49.133:3000/getAllCategories')
                .then(result => {
                    return result.json();
                }).then(categories => {
                    document.getElementById('check_div').innerHTML = `
                    <a>Producers: 
                        <ul id="producers_list">
                        </ul>
                    </a>
                    <a>Categories: 
                        <ul id="categories_list">
                        </ul>
                    </a>
                    `;
                    categories.forEach(category => {
                        document.getElementById('categories_list').innerHTML += `
                    <li>
                        <input type="checkbox" id="${category.id}" onclick="handleClick(this)" value="${category.navn}">
                        <label for="${category.id}">${category.navn}</label>
                    </li>`;
                    })
                }).catch(err => {
                    console.log(err);
                });
            fetch('http://95.85.49.133:3000/getAllProducers')
                .then(result => {
                    return result.json();
                }).then(producers => {
                    producers.forEach(producer => {
                        document.getElementById('producers_list').innerHTML += `
                    <li>
                        <input type="checkbox" id="${producer.id}" onclick="handleClick(this)" value="${producer.navn}">
                        <label for="${producer.id}">${producer.navn}</label>
                    </li>`;
                    })
                }).catch(err => {
                    console.log(err);
                })
        }).catch(err => {
            console.log(err);
        })
})

document.getElementById('categories_button').addEventListener('click', (event) => {
    document.getElementById('check_div').innerHTML = '';
    Array.from(document.getElementById('ctrl_panel_btn_div').getElementsByTagName('button')).forEach(element => {
        if (element.innerHTML == "Categories") {
            element.className = element.className + " active";
        } else {
            element.className = "";
        }
    });
    document.getElementById('check_div').innerHTML = '';
    document.getElementById('edit_div').innerHTML = '';
    console.log("something, happens!");
    document.getElementById('content_div').innerHTML = '';
    fetch('http://95.85.49.133:3000/getAllCategories')
        .then(function (result) {
            return result.json();
        }).then(categories => {
            document.getElementById('content_div').innerHTML +=
                `<h1>Categories</h1>
                <div class="col-xs-12">
                <button id="new_category" onclick="add_new_category()">Add New Category</button>
            </div>
            
            <table id="content_table">
                <tr>
                    <th>Options</th>
                    <th>Navn
                    </th>
                </tr>
            </table>`;
            categories.forEach(category => {
                document.getElementById('content_table').innerHTML += `
                <tr>
                    <td>
                        <button id="${category.id}" onclick="edit_category(this.id)">edit</button>
                        <button id="${category.id}" onclick="delete_category(this.id)">delete</button>
                    </td>
                    <td>
                        ${category.navn}
                    </td>
                </tr>`;
            })
        }).catch(err => {
            console.log(err);
        })
})

document.getElementById('producers_button').addEventListener('click', (event) => {
    Array.from(document.getElementById('ctrl_panel_btn_div').getElementsByTagName('button')).forEach(element => {
        if (element.innerHTML == "Producers") {
            element.className = element.className + " active";
        } else {
            element.className = "";
        }
    });
    document.getElementById('check_div').innerHTML = '';
    document.getElementById('edit_div').innerHTML = '';
    console.log("something, happens!");
    document.getElementById('content_div').innerHTML = '';
    fetch('http://95.85.49.133:3000/getAllProducers')
        .then(function (result) {
            return result.json();
        }).then(producers => {
            document.getElementById('content_div').innerHTML +=
                `<h1>Producers</h1>
                <div class="col-xs-12">
                <button id="new_producer" onclick="add_new_producer()">Add New Producer</button>
            </div>
            <table id="content_table">
                <tr>
                    <th>Options</th>
                    <th>Navn
                    </th>
                </tr>
            </table>`;
            producers.forEach(producer => {
                document.getElementById('content_table').innerHTML += `
                <tr>
                    <td>
                        <button id="${producer.id}" onclick="edit_producer(this.id)">edit</button>
                        <button id="${producer.id}" onclick="delete_producer(this.id)">delete</button>
                    </td>
                    <td>${producer.navn}</td>
                </tr>`;
            })
        }).catch(err => {
            console.log(err);
        })
})

document.getElementById('users').addEventListener('click', (event) => {
    Array.from(document.getElementById('ctrl_panel_btn_div').getElementsByTagName('button')).forEach(element => {
        if (element.innerHTML == "Users") {
            element.className = element.className + " active";
        } else {
            element.className = "";
        }
    });
    document.getElementById('check_div').innerHTML = '';
    document.getElementById('edit_div').innerHTML = '';
    document.getElementById('content_div').innerHTML = '';
    fetch('http://95.85.49.133:3000/allUsers', {
        'method': 'post',
        'headers': {
            'Authorization': localStorage.getItem('token'),
            'userID': localStorage.getItem('userid'),
            'Content-Type': 'application/json'
        },
        'mode': 'cors',
        'cache': 'default'
    }).then(function (result) {
        return result.json();
    }).then(users => {
        document.getElementById('content_div').innerHTML += `
        <h1>Users</h1>
        <div class="col-xs-12">
            <button id="new_user" onclick="add_new_user()">Add New User</button>
        </div>
        <table id="content_table">
            <tr>
                <th>Options</th>
                <th>Billede
                </th>
                <th>Navn</th>
                <th>Brugernavn</th>
                <th>E-mail</th>
                <th>Created</th>
            </tr>
        </table>`;
        users.forEach(user => {
            document.getElementById('content_table').innerHTML += `
            <tr>
                <td>
                    <button id="${user.id}" onclick="edit_user(this.id)">edit</button>
                    <button id="${user.id}" onclick="delete_user(this.id)">delete</button>
                </td>
                <td>
                    <img src='http://95.85.49.133:3000/images/${user.url}' height="75" width="200 "alt="henter billede">
                </td>
                <td>${user.name}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.created}</td>
            </tr>`;
        })
    }).catch(err => {
        console.log(err);
    })
})

//user
function delete_user(target_id) {
    fetch('http://95.85.49.133:3000/deleteUser/' + target_id, {
        'method': 'post',
        'headers': {
            'Authorization': localStorage.getItem('token'),
            'userID': localStorage.getItem('userid'),
            'Content-Type': 'application/json'
        },
        'mode': 'cors',
        'cache': 'default'
    }).then(result => {
        console.log(result);
        window.location.assign('http://95.85.49.133:3000/sub/manage_content.html');
    }).catch(err => {
        console.log(err);
    })
}

function edit_user(target_id) {
    document.getElementById('edit_div').innerHTML = '';
    fetch('http://95.85.49.133:3000/user', {
        'method': 'post',
        'headers': {
            'Authorization': localStorage.getItem('token'),
            'userID': localStorage.getItem('userid'),
            'Content-Type': 'application/json'
        },
        'body': `{
            "param" : "${target_id}"}`,
        'mode': 'cors',
        'cache': 'default'
    }).then(result => {
        console.log(result);
        return result.json();
    }).then(users => {
        document.getElementById('edit_div').innerHTML += `
            <form id="user_form" method="post" enctype="multipart/form-data">
            <h1>Edit User </h1>
            <p>
                <label for="name">Name: </label>
                <input name="name" type="text" id="name" value="${users[0].name}" minlength="5" maxlength="50" required autofocus>
            </p>
            <p>
                <label for="username">Username: </label>
                <input name="username" type="text" id="username" value="${users[0].username}" minlength="5" maxlength="50" required>
            </p>
            <p>
                <label for="email">E-mail Adress: </label>
                <input name="email" type="text" id="email" value="${users[0].email}" required>
            </p>
            <p>
                <label for="adress">Adress: </label>
                <input name="adress" type="text" id="adress" value="${users[0].adress}" minlength="5" maxlength="50">
            </p>
            <p>
                <label for="phone">Phone number: </label>
                <input name="phone" type="text" id="phone" value="${users[0].phone}" min="5" max="11">
            </p>
                
                <label>Gammelt Billede</label>
                <img src="http://95.85.49.133:3000/images/${users[0].url}" id="old_pic" alt="billede hentes" width="200" height="75">
                <label>Upload Nyt Billede</label>
                <input type="hidden" name="oldUserImage" id="olduserImage" value="${users[0].url}">
                <input type="file" name="userImage" id="userImage" value="empty">
                <img id="preview" width="200" height="75">
                <button type="submit" id="register_user_btn">Update</button>
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
        document.querySelector('#register_user_btn').addEventListener("click", (event) => {

            event.preventDefault();
            if (!document.querySelector("#user_form").reportValidity()) {
                document.querySelector("#user_form").reportValidity()
                } else {
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

            let request = new Request(`http://95.85.49.133:3000/updateUser/${target_id}`, init);

            fetch(request)
                .then(result => {
                    window.location.assign('http://95.85.49.133:3000/sub/manage_content.html');
                }).catch(err => {
                    console.log(err)
                });
            }
        })
    }).catch(err => {
        console.log(err);
    })
}
//enc-type => encryption type
function add_new_user() {
    document.getElementById('edit_div').innerHTML = '';
    document.getElementById('edit_div').innerHTML += `
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

    container = document.querySelector('#user_form');
    inputs = container.querySelectorAll('input');
    console.log(inputs);
    for (let index = 0; index < inputs.length; index++) {

        inputs[index].addEventListener("blur", event => {
            if (!event.target.checkValidity()) {
                event.target.setCustomValidity('Please fill out this field');
                /* event.target.focus(); */
                document.getElementById('register_user_btn').click();
            }
        })
        inputs[index].addEventListener("focus", event => {
            document.querySelector('#user_form').reportValidity();
        })
    }
    var lacking;

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

        let request = new Request('http://95.85.49.133:3000/registerUser', init);

        fetch(request)
            .then(result => {
                window.location.assign('http://95.85.49.133:3000/sub/manage_content.html');
            }).catch(err => {
                console.log(err)
            });
        }
    })
}

//product
function delete_product(target_id) {
    fetch('http://95.85.49.133:3000/deleteProduct/' + target_id, {
        'method': 'post',
        'headers': {
            'Authorization': localStorage.getItem('token'),
            'userID': localStorage.getItem('userid'),
            'Content-Type': 'application/json'
        },
        'mode': 'cors',
        'cache': 'default'
    }).then(result => {
        console.log(result);
        window.location.assign('http://95.85.49.133:3000/sub/manage_content.html');
    }).catch(err => {
        console.log(err);
    })
}

function edit_product(target_id) {

    console.log(target_id);
    document.getElementById('edit_div').innerHTML = '';
    fetch('http://95.85.49.133:3000/product/' + target_id, {
        'method': 'get',
        'headers': {
            'Authorization': localStorage.getItem('token'),
            'userID': localStorage.getItem('userid'),
            'Content-Type': 'application/json'
        },
        'mode': 'cors',
        'cache': 'default'
    }).then(result => {
        console.log(result);
        return result.json();
    }).then(products => {
        console.log("products" + products.toString());
        kategorinavn = products[0].kat_navn;
        producentnavn = products[0].prod_navn;
        console.log("product ID = " + products[0].id);
        document.getElementById('edit_div').innerHTML += `
            <form id="product_form" method="post" enctype="multipart/form-data">
                <h1>Edit Product </h1>
                <p>
                    <label for="produktnavn">Navn</label>
                    <input type="text" name="Navn" id="produktnavn" value="${products[0].Navn}" minlength="5" maxlength="50" required>
                </p>
                <p>
                    <label for="vareNr">vareNr</label>
                    <input type="number" name="vareNr" id="vareNr" value="${products[0].vareNr}" minlength="5" maxlength="50" required>
                </p>
                <p>
                    <label for="Pris">Pris</label>
                    <input type="number" name="Pris" id="Pris" value="${products[0].Pris}" min="1" max="9999999999" value="0" required>
                </p>
                <p>
                    <label for="beskrivelse">Beskrivelse</label>
                    <input type="text" name="Beskrivelse" id="beskrivelse" value="${products[0].Beskrivelse}" minlength="5" maxlength="50" required>
                </p>
                
                <p>
                    <label for="producers">Producenter
                    <input type="text" name="producers_input" id="producers_input" list="producers" minlength="5" maxlength="50" required></label>
                    <datalist name="producers" id="producers"></datalist>
                </p>
                <p>
                    <label for="categories">Kategorier
                    <input type="text" name="categories_input" id="categories_input" list="categories" minlength="5" maxlength="50" required></label>
                    <datalist name="categories" id="categories"></datalist>
                </p>
                <label>Gammelt Billede</label>
                <img src="http://95.85.49.133:3000/images/${products[0].billede}" id="old_pic" alt="billede hentes" width="200" height="75">
                <label>Upload Nyt Billede</label>
                <input type="hidden" name="oldProductImage" id="oldProductImage" value="${products[0].billede}">
                <input type="file" name="productImage" id="productImage" value="empty">
                <img id="preview" width="200" height="75">
                <button type="submit" id="update_button">Update</button>
            </form>`;
        // Array.from(document.querySelector('#product_form').querySelectorAll('input')).forEach(input => {
        //     console.log(input);

        //     input.addEventListener("input", event => {
        //         if (!input.reportValidity()) {
        //             console.log("do something!");
        //             input.setCustomValidity('Please fill out this field');
        //             input.reportValidity();
        //         }
        //         else {
        //             input.style.boxShadow = "0 0 10px green";   
        //         }
        //     });

        //     input.addEventListener("change", event => {
        //         if (!input.reportValidity()) {
        //             console.log("do something!");
        //             input.setCustomValidity('Please fill out this field');
        //             input.reportValidity();
        //         }
        //         else {
        //             input.style.boxShadow = "0 0 10px green";   
        //         }
        //     });

        //     input.addEventListener("focus", event => {
        //         if (!input.reportValidity()) {
        //             input.setCustomValidity('Please fill out this field');
        //             input.reportValidity();
        //         }
        //         else {
        //             input.style.boxShadow = "0 0 10px green";   
        //         }
        //     });

        //     // input.addEventListener("valid", event => {
        //     //     if (!input.checkValidity()) {
        //     //         console.log("do something!");
        //     //         // input.setCustomValidity('Please fill out this field');
        //     //         input.style.boxShadow = "0 0 10px green";
        //     //     }
        //     // });
        // })
        document.querySelector('#update_button').addEventListener('click', event => {
            event.preventDefault();
            if (!document.querySelector("#product_form").reportValidity()) {
                document.querySelector("#user_form").reportValidity()
            } else {
                let form = document.getElementById('product_form');
                let data = new FormData(form);

                console.log("undefined? = " + target_id);
                fetch('http://95.85.49.133:3000/updateProduct/' + target_id, {
                    "method": 'put',
                    "body": data,
                    'cache': 'no-cache'
                }).then(result => {
                    console.log(result);
                    return result.json();
                }).then(result => {
                    window.location.assign('http://95.85.49.133:3000/sub/manage_content.html');
                }).catch(err => {
                    console.log(err);
                })
            }
        });
        document.querySelector('#productImage').addEventListener('change', () => {
            var reader = new FileReader();
            let file = document.querySelector('#productImage').files[0];
            reader.addEventListener("load", function () {
                document.querySelector('#preview').src = reader.result;
                localStorage.setItem("imgData", reader.result);
            })
            if (file) {
                reader.readAsDataURL(file);
            }
        });
    }).then(() => {
        fetch('http://95.85.49.133:3000/getAllCategories', {
            'method': 'get',
            'headers': {
                'Authorization': localStorage.getItem('token'),
                'userID': localStorage.getItem('userid'),
                'Content-Type': 'application/json'
            },
            'mode': 'cors',
            'cache': 'default'
        }).then(result => {
            return result.json();
        }).then(categories => {
            categories.forEach(category => {
                document.getElementById('categories').innerHTML += `<option class="cat_option"> ${category.navn}</option>`;
            })
        }).then(next => {
            var cat_options = Array.from(document.getElementsByClassName('cat_option'));
            console.log(cat_options);
            cat_options.forEach(option => {
                console.log("kategorinavn" + kategorinavn);
                console.log("innerHTML" + option.innerHTML);
                if (option.innerHTML.trim() == kategorinavn.trim()) {
                    document.getElementById('categories_input').value = option.innerHTML;
                }
            })
        }).then(() => {
            fetch('http://95.85.49.133:3000/getAllProducers', {
                'method': 'get',
                'headers': {
                    'Authorization': localStorage.getItem('token'),
                    'userID': localStorage.getItem('userid'),
                    'Content-Type': 'application/json'
                },
                'mode': 'cors',
                'cache': 'default'
            }).then(result => {
                return result.json();
            }).then(producers => {
                producers.forEach(producer => {
                    document.getElementById('producers').innerHTML += `<option class="prod_option"> ${producer.navn}</option>`;
                })
            }).then(next => {
                var prod_options = Array.from(document.getElementsByClassName('prod_option'));
                console.log(prod_options);
                prod_options.forEach(option => {
                    console.log("producentnavn" + producentnavn);
                    console.log("innerHTML" + option.innerHTML);
                    if (option.innerHTML.trim() == producentnavn.trim()) {
                        document.getElementById('producers_input').value = option.innerHTML;
                    }
                })
            }).catch(err => {
                console.log(err);
            })
        }).catch(err => {
            console.log(err);
        })
    }).catch(err => {
        console.log(err);
    })
}

function add_new_product() {
    document.getElementById('edit_div').innerHTML = '';
    document.getElementById('edit_div').innerHTML += `
    <form id="product_form" method="post" enctype="multipart/form-data">
        <h1>Add new Product </h1>
        <p>
            <label for="produktnavn">Navn</label>
            <input type="text" name="Navn" id="produktnavn" placeholder="Navn" minlength="5" maxlength="50" required>
        </p>
        <p>
            <label for="vareNr">vareNr</label>
            <input type="number" name="vareNr" id="vareNr" placeholder="vareNr" min="1" max="99999" value="0" step="5" required>
        </p>
        <p>
            <label for="Pris">Pris</label>
            <input type="number" name="Pris" id="Pris" min="1" max="99999" value="0" step="5" required>
        </p>
        <p>
            <label for="beskrivelse">Beskrivelse</label>
            <input type="text" name="Beskrivelse" id="beskrivelse" placeholder="Beskrivelse" minlength="5" maxlength="50" required>
        </p>
        <p>
            <label for="producers">Producenter
            <input type="text" name="producers_input" id="producers_input" list="producers" minlength="5" maxlength="50" required></label>
            <datalist name="producers" id="producers"></datalist>
        </p>
        <p>
            <label for="categories">Kategorier
            <input type="text" name="categories_input" id="categories_input" list="categories" minlength="5" maxlength="50"  required></label>
            <datalist name="categories" id="categories"></datalist>
        </p>
        <label>Upload Nyt Billede</label>
        <input type="file" name="productImage" id="productImage" value="empty">
        <img id="preview" width="200" height="75">
        <button type="submit" id="register_product_btn">Register</button>
    </form>
    `;
    document.querySelector('#productImage').addEventListener('change', () => {
        var reader = new FileReader();
        let file = document.querySelector('#productImage').files[0];
        reader.addEventListener("load", function () {
            document.querySelector('#preview').src = reader.result;
            localStorage.setItem("imgData", reader.result);
        })
        if (file) {
            reader.readAsDataURL(file);
        }
    });
    fetch('http://95.85.49.133:3000/getAllCategories', {
        'method': 'get',
        'headers': {
            'Authorization': localStorage.getItem('token'),
            'userID': localStorage.getItem('userid'),
            'Content-Type': 'application/json'
        },
        'mode': 'cors',
        'cache': 'default'
    }).then(result => {
        return result.json();
    }).then(categories => {
        categories.forEach(category => {
            document.getElementById('categories').innerHTML += `<option class="cat_option"> ${category.navn}</option>`;
        })
    }).then(() => {
        fetch('http://95.85.49.133:3000/getAllProducers', {
            'method': 'get',
            'headers': {
                'Authorization': localStorage.getItem('token'),
                'userID': localStorage.getItem('userid'),
                'Content-Type': 'application/json'
            },
            'mode': 'cors',
            'cache': 'default'
        }).then(result => {
            return result.json();
        }).then(producers => {
            producers.forEach(producer => {
                document.getElementById('producers').innerHTML += `<option class="prod_option"> ${producer.navn}</option>`;
            })
        }).catch(err => {
            console.log(err);
        })
    }).then(() => {
        document.querySelector('#register_product_btn').addEventListener('click', (event) => {
            event.preventDefault();
            if (!document.querySelector("#product_form").reportValidity()) {
                document.querySelector("#user_form").reportValidity()
            } else {
                // 1. get values 
                // 2. validate values on client side
                // 3. send values to server
                // 4. server validation of values
                // 5. server response
                // 6. based on response, break and throw error or redirect to profile page

                let headers = new Headers();
                headers.append('Content-Type', 'application/json');

                // grib formularen og håndter indholdet via FormData objektet
                let form = document.getElementById('product_form');
                let data = new FormData(form);
                let init = {
                    method: 'POST',
                    body: data,
                    cache: 'no-cache',
                    mode: 'cors'
                };

                console.log(init.body);

                let request = new Request('http://95.85.49.133:3000/registerProduct', init);

                fetch(request)
                    .then(result => {
                        window.location.assign('http://95.85.49.133:3000/sub/manage_content.html');


                    }).catch(err => {
                        console.log(err)
                    });
            }
        })
    }).catch(err => {
        console.log(err);
    });
    // Array.from(document.querySelector('#product_form').querySelectorAll('input')).forEach(input => {
    //     console.log(input);
    //     input.addEventListener("blur", event => {
    //         if (!input.checkValidity()) {
    //             console.log("do something!");
    //             input.setCustomValidity('Please fill out this field');
    //             input.reportValidity();
    //         }
    //     });

    //     input.addEventListener("change", event => {
    //         if (!input.checkValidity()) {
    //             console.log("do something!");
    //             input.setCustomValidity('Please fill out this field');
    //             input.reportValidity();
    //         }
    //     });

    //     // input.addEventListener("focus", event => {
    //     //     if (!input.checkValidity()) {
    //     //         input.setCustomValidity('Please fill out this field');
    //     //         input.reportValidity();
    //     //     }
    //     // });

    //     input.addEventListener("valid", event => {
    //         if (!input.checkValidity()) {
    //             console.log("do something!");
    //             // input.setCustomValidity('Please fill out this field');
    //             input.style.boxShadow = "0 0 10px green";
    //         }
    //     });
    // })
}

//producer
function delete_producer(target_id) {
    fetch('http://95.85.49.133:3000/deleteProducer/' + target_id, {
        'method': 'post',
        'headers': {
            'Authorization': localStorage.getItem('token'),
            'userID': localStorage.getItem('userid'),
            'Content-Type': 'application/json'
        },
        'mode': 'cors',
        'cache': 'default'
    }).then(result => {
        console.log(result);
        window.location.assign('http://95.85.49.133:3000/sub/manage_content.html');
    }).catch(err => {
        console.log(err);
    })
}

function edit_producer(target_id) {
    var kategorinavn, producentnavn;
    document.getElementById('edit_div').innerHTML = '';
    fetch('http://95.85.49.133:3000/producer/' + target_id, {
        'method': 'get',
        'headers': {
            'Authorization': localStorage.getItem('token'),
            'userID': localStorage.getItem('userid'),
            'Content-Type': 'application/json'
        },
        'mode': 'cors',
        'cache': 'default'
    }).then(result => {
        console.log(result);
        return result.json();
    }).then(producers => {
        console.log("producers" + producers.toString());
        document.getElementById('edit_div').innerHTML += `
            <h1>Edit Producer </h1>
            <input type="text" id="producentnavn" value="${producers[0].navn}"><br/>
            <button id="${producers[0].id}" onclick="update_producer(this.id)">Update</button>
            `;
    }).catch(err => {
        console.log(err);
    })
}

function update_producer(target_id) {
    fetch('http://95.85.49.133:3000/updateProducer/' + target_id, {
        'method': 'post',
        'headers': {
            'Authorization': localStorage.getItem('token'),
            'userID': localStorage.getItem('userid'),
            'Content-Type': 'application/json'
        },
        'body': `{
            "param" : "${target_id}",
            "name" : "${document.querySelector('#producentnavn').value.toString()}"}`,
        'mode': 'cors',
        'cache': 'default'
    }).then(result => {
        console.log(result);
    }).then(result => {
        window.location.assign('http://95.85.49.133:3000/sub/manage_content.html');
    }).catch(err => {
        console.log(err);
    })
}

function add_new_producer() {
    document.getElementById('edit_div').innerHTML = '';
    document.getElementById('edit_div').innerHTML += `
    <h1>Add new Producer </h1>
    <form class="registry_form" action='submit'>
        <input type="text" id="name" placeholder="Name" required autofocus/><br/>
        <button type="submit" id="register_producer_btn">Register</button>
    </form>
    `;
    document.querySelector('#register_producer_btn').addEventListener('click', (event) => {

        // 1. get values 
        // 2. validate values on client side
        // 3. send values to server
        // 4. server validation of values
        // 5. server response
        // 6. based on response, break and throw error or redirect to profile page

        event.preventDefault();
        let name = document.querySelector('#name').value.toString();

        let init = {
            method: 'POST',
            headers: {
                'Authorization': localStorage.getItem('token'),
                'userID': localStorage.getItem('userid'),
                'Content-Type': 'application/json'
            },
            body: `{"name":"${name}"}`,
            cache: 'no-cache',
            mode: 'cors'
        };

        console.log(init.body);

        let request = new Request('http://95.85.49.133:3000/registerProducer', init);

        fetch(request)
            .then(result => {
                window.location.assign('http://95.85.49.133:3000/sub/manage_content.html');


            }).catch(err => {
                console.log(err)
            });
    })
}


//category
function delete_category(target_id) {
    fetch('http://95.85.49.133:3000/deleteCategory/' + target_id, {
        'method': 'post',
        'headers': {
            'Authorization': localStorage.getItem('token'),
            'userID': localStorage.getItem('userid'),
            'Content-Type': 'application/json'
        },
        'mode': 'cors',
        'cache': 'default'
    }).then(result => {
        console.log(result);
        window.location.assign('http://95.85.49.133:3000/sub/manage_content.html');
    }).catch(err => {
        console.log(err);
    })
}

function edit_category(target_id) {
    document.getElementById('edit_div').innerHTML = '';
    fetch('http://95.85.49.133:3000/category/' + target_id, {
        'method': 'get',
        'headers': {
            'Authorization': localStorage.getItem('token'),
            'userID': localStorage.getItem('userid'),
            'Content-Type': 'application/json'
        },
        'mode': 'cors',
        'cache': 'default'
    }).then(result => {
        console.log(result);
        return result.json();
    }).then(categories => {
        document.getElementById('edit_div').innerHTML += `
            <h1>Edit Category </h1>
            <input type="text" id="kategorinavn" value="${categories[0].navn}"><br/>
            <button id="${categories[0].id}" onclick="update_category(this.id)">Update</button>
            `;
    }).catch(err => {
        console.log(err);
    })
}

function update_category(target_id) {
    fetch('http://95.85.49.133:3000/updateCategory/' + target_id, {
        'method': 'post',
        'headers': {
            'Authorization': localStorage.getItem('token'),
            'userID': localStorage.getItem('userid'),
            'Content-Type': 'application/json'
        },
        'body': `{
            "param" : "${target_id}",
            "name" : "${document.querySelector('#kategorinavn').value.toString()}"}`,
        'mode': 'cors',
        'cache': 'default'
    }).then(result => {
        console.log(result);
    }).then(result => {
        window.location.assign('http://95.85.49.133:3000/sub/manage_content.html');
    }).catch(err => {
        console.log(err);
    })
}

function add_new_category() {
    document.getElementById('edit_div').innerHTML = '';
    document.getElementById('edit_div').innerHTML += `
    <h1>Add new Category </h1>
    <form class="registry_form" action='submit'>
        <input type="text" id="name" placeholder="Name" required autofocus/><br/>
        <button type="submit" id="register_category_btn">Register</button>
    </form>
    `;
    document.querySelector('#register_category_btn').addEventListener('click', (event) => {
        event.preventDefault();
        let name = document.querySelector('#name').value.toString();

        let init = {
            method: 'POST',
            headers: {
                'Authorization': localStorage.getItem('token'),
                'userID': localStorage.getItem('userid'),
                'Content-Type': 'application/json'
            },
            body: `{"name":"${name}"}`,
            cache: 'no-cache',
            mode: 'cors'
        };

        console.log(init.body);

        let request = new Request('http://95.85.49.133:3000/registerCategory', init);

        fetch(request)
            .then(result => {
                window.location.assign('http://95.85.49.133:3000/sub/manage_content.html');


            }).catch(err => {
                console.log(err)
            });
    })
}

function handleClick(sender) {
    document.getElementById('content_div').innerHTML = '';
    var prod_boxes = document.getElementById('producers_list').getElementsByTagName('input');
    console.log(prod_boxes.length);
    var prod_checkedBoxes = [];
    for (var i = 0; i < prod_boxes.length; i++) {
        if (prod_boxes[i].checked) {
            prod_checkedBoxes.push(prod_boxes[i].id);
        }
    }
    prod_checkedBoxes.forEach(id => {
        console.log(id);
    });

    var cat_boxes = document.getElementById('categories_list').getElementsByTagName('input');
    console.log(cat_boxes.length);
    var cat_checkedBoxes = [];
    for (var i = 0; i < cat_boxes.length; i++) {
        if (cat_boxes[i].checked) {
            cat_checkedBoxes.push(cat_boxes[i].id);
        }
    }
    cat_checkedBoxes.forEach(id => {
        console.log(id);
    });

    let init = {
        method: 'POST',
        headers: {
            'Authorization': localStorage.getItem('token'),
            'userID': localStorage.getItem('userid'),
            'Content-Type': 'application/json'
        },
        body: `{"producer_ids":"${prod_checkedBoxes}",
                "category_ids":"${cat_checkedBoxes}" }`,
        cache: 'no-cache',
        mode: 'cors'
    };

    console.log("body" + init.body);

    let request = new Request('http://95.85.49.133:3000/getFilteredProducts', init);

    fetch(request)
        .then(function (result) {
            return result.json();
        }).then(products => {
            document.getElementById('content_div').innerHTML += `
                <div class="col-xs-12">
                    <button id="new_product" onclick="add_new_product()">Add New Product</button>
                </div>
                <table id="content_table">
                    <tr>
                        <th>Options</th>
                        <th>Name</th>
                        <th>vareNr</th>
                        <th>Beskrivelse</th>
                        <th>Pris</th>
                        <th>Producent</th>
                        <th>Kategori</th>
                    </tr>
                </table>`;
            products.forEach(product => {
                document.getElementById('content_table').innerHTML += `
                    <tr>
                        <td>
                            <button id="${product.id}" onclick="edit_product(this.id)">edit</button>
                            <button id="${product.id}" onclick="delete_product(this.id)">delete</button>
                        </td>
                        <td>${product.Navn}
                        </td>
                        <td>${product.vareNr}
                        </td>
                        <td>${product.Beskrivelse} 
                        </td>
                        <td>${product.Pris}
                        </td>
                        <td>${product.prod_navn}
                        </td>
                        <td>${product.kat_navn}
                        </td>
                    </tr>`;

            });
            // window.location.assign('http://95.85.49.133:3000/sub/manage_content.html');
        }).catch(err => {
            console.log(err)
        });
}