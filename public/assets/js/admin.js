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
    document.getElementById('categories_list').innerHTML = '';
    document.getElementById('producers_list').innerHTML = '';
    document.getElementById('edit_div').innerHTML = '';
    console.log("something, happens!");
    document.getElementById('content_div').innerHTML = '';
    fetch('http://localhost:8080/products')
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
                <tr>
                    <td>
                        <button id="${product.id}" onclick="edit_product(this.id)">edit</button>
                        <button id="${product.id}" onclick="delete_product(this.id)">delete</button>
                    </td>
                    <td>
                        <img src='http://localhost:8080/images/${product.billede}' height="75" width="200 "alt="henter billede">
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
            fetch('http://localhost:8080/getAllCategories')
                .then(result => {
                    return result.json();
                }).then(categories => {
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
            fetch('http://localhost:8080/getAllProducers')
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
    document.getElementById('categories_list').innerHTML = '';
    document.getElementById('producers_list').innerHTML = '';
    document.getElementById('edit_div').innerHTML = '';
    console.log("something, happens!");
    document.getElementById('content_div').innerHTML = '';
    fetch('http://localhost:8080/getAllCategories')
        .then(function (result) {
            return result.json();
        }).then(categories => {
            document.getElementById('content_div').innerHTML +=
                `<div class="col-xs-12">
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
    document.getElementById('categories_list').innerHTML = '';
    document.getElementById('producers_list').innerHTML = '';
    document.getElementById('edit_div').innerHTML = '';
    console.log("something, happens!");
    document.getElementById('content_div').innerHTML = '';
    fetch('http://localhost:8080/getAllProducers')
        .then(function (result) {
            return result.json();
        }).then(producers => {
            document.getElementById('content_div').innerHTML +=
                `<div class="col-xs-12">
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
    document.getElementById('categories_list').innerHTML = '';
    document.getElementById('producers_list').innerHTML = '';
    document.getElementById('edit_div').innerHTML = '';
    document.getElementById('content_div').innerHTML = '';
    fetch('http://localhost:8080/allUsers', {
        'method': 'get',
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
        <div class="col-xs-12">
            <button id="new_user" onclick="add_new_user()">Add New User</button>
        </div>
        <table id="content_table">
            <tr>
                <th>Options</th>
                <th>Navn
                </th>
                <th>Billede</th>
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
                    <img src='http://localhost:8080/images/${user.billede}' height="75" width="200 "alt="henter billede">
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
    fetch('http://localhost:8080/deleteUser/' + target_id, {
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
        window.location.assign('http://localhost:3000/sub/manage_content.html');
    }).catch(err => {
        console.log(err);
    })
}

function edit_user(target_id) {
    document.getElementById('edit_div').innerHTML = '';
    fetch('http://localhost:8080/user', {
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
            <h1>Edit User </h1>
            <form id="user_form" method="post" enctype="multipart/form-data">
                <input name="name" type="text" id="name" value="${users[0].name}"><br/>
                <input name="username" type="text" id="username" value="${users[0].username}"><br/>
                <input name="email" type="text" id="email" value="${users[0].email}"><br/>
                <input name="created" type="text" id="created" value="${users[0].created}"><br/>
                <input name="adress" type="text" id="adress" value="${users[0].adress}"><br/>
                <input name="phone" type="text" id="phone" value="${users[0].phone}">
                
                <label>Gammelt Billede</label>
                <img src="http://localhost:8080/images/${users[0].url}" id="old_pic" alt="billede hentes" width="200" height="75">
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

            let request = new Request(`http://localhost:8080/updateUser/${target_id}`, init);

            fetch(request)
                .then(result => {
                    window.location.assign('http://localhost:3000/sub/manage_content.html');
                }).catch(err => {
                    console.log(err)
                });
            // }
        })
    }).catch(err => {
        console.log(err);
    })
}

function add_new_user() {
    document.getElementById('edit_div').innerHTML += `
    <h1>Add new User </h1>
    <form id="user_form" method="post" enctype="multipart/form-data">
        <input name="name" type="text" id="name" placeholder="Name" required autofocus/><br/>
        <input name="username" type="text" id="username" placeholder="Username" required/><br/>
        <input name="password" type="password" id="password" placeholder="Password" required/><br/>
        <input type="password" id="rep_password" placeholder="Repeat Password" required/><br/>
        <input name="email" type="text" id="email" placeholder="E-mail adress" required/><br/>
        <input type="text" id="rep_email" placeholder="Repeat E-mail adress" required/><br/>
        <input name="adress" type="text" id="adress" placeholder="Adress" /><br/>
        <input name="phone_number" type="text" id="phone_number" placeholder="Phone number" /><br/>
        <label>Upload Nyt Billede</label>
        <input type="hidden" name="oldUserImage" id="oldUserImage" value="">
        <input type="file" name="userImage" id="userImage" value="empty">
        <button type="submit" id="register_user_btn">Register</button>
    </form>`;
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

    document.querySelector('#register_user_btn').addEventListener("click", (event) => {
        event.preventDefault();

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
        // }
    })
}

//product
function delete_product(target_id) {
    fetch('http://localhost:8080/deleteProduct/' + target_id, {
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
        window.location.assign('http://localhost:3000/sub/manage_content.html');
    }).catch(err => {
        console.log(err);
    })
}

function edit_product(target_id) {
    console.log(target_id);
    document.getElementById('edit_div').innerHTML = '';
    fetch('http://localhost:8080/products/' + target_id, {
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
            <h1>Edit Product </h1>
            <form id="product_form" method="post" enctype="multipart/form-data">
                <input type="text" name="Navn" id="produktnavn" value="${products[0].Navn}"><br/>
                <input type="text" name="vareNr" id="vareNr" value="${products[0].vareNr}"><br/>
                <input type="text" name="Pris" id="Pris" value="${products[0].Pris}"><br/>
                <input type="text" name="Beskrivelse" id="beskrivelse" value="${products[0].Beskrivelse}"><br/>
                <select name="producers" id="producers"></select>
                <select name="categories" id="categories"></select>
                <label>Gammelt Billede</label>
                <img src="http://localhost:8080/images/${products[0].billede}" id="old_pic" alt="billede hentes" width="200" height="75">
                <label>Upload Nyt Billede</label>
                <input type="hidden" name="oldProductImage" id="oldProductImage" value="${products[0].billede}">
                <input type="file" name="productImage" id="productImage" value="empty">
                <img id="preview" width="200" height="75">
                <button id="${target_id}">Update</button>
            </form>`;
        document.querySelector('#product_form button').addEventListener('click', event => {
            event.preventDefault();
            update_product(target_id);
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
        fetch('http://localhost:8080/getAllCategories', {
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
                if (option.innerHTML == kategorinavn) {
                    option.selected = true;
                }
            })
        }).then(() => {
            fetch('http://localhost:8080/getAllProducers', {
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
                    if (option.innerHTML == producentnavn) {
                        option.selected = true;
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

function update_product(target_id) {
    // grib formularen og håndter indholdet via FormData objektet
    let form = document.getElementById('product_form');
    let data = new FormData(form);

    console.log("undefined? = " + target_id);
    fetch('http://localhost:8080/updateProduct/' + target_id, {
        "method": 'put',
        "body": data,
        'cache': 'no-cache'
    }).then(result => {
        console.log(result);
        return result.json();
    }).then(result => {
        window.location.assign('http://localhost:3000/sub/manage_content.html');
    }).catch(err => {
        console.log(err);
    })
}

function add_new_product() {
    document.getElementById('edit_div').innerHTML += `
    <h1>Add new Product </h1>
    <form id="product_form" method="post" enctype="multipart/form-data">
        <input type="text" name="Navn" id="produktnavn"><br/>
        <input type="text" name="vareNr" id="vareNr" ><br/>
        <input type="text" name="Pris" id="Pris"><br/>
        <input type="text" name="Beskrivelse" id="beskrivelse" ><br/>
        <select name="producers" id="producers"></select>
        <select name="categories" id="categories"></select>
        <label>Upload Nyt Billede</label>
        <input type="hidden" name="oldProductImage" id="oldProductImage" >
        <input type="file" name="productImage" id="productImage" value="empty">
        <button type="submit" id="register_product_btn">Register</button>
    </form>
    `;
    fetch('http://localhost:8080/getAllCategories', {
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
        fetch('http://localhost:8080/getAllProducers', {
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
    }).catch(err => {
        console.log(err);
    });
    document.querySelector('#register_product_btn').addEventListener('click', (event) => {

        // 1. get values 
        // 2. validate values on client side
        // 3. send values to server
        // 4. server validation of values
        // 5. server response
        // 6. based on response, break and throw error or redirect to profile page

        event.preventDefault();

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

        let request = new Request('http://localhost:8080/registerProduct', init);

        fetch(request)
            .then(result => {
                window.location.assign('http://localhost:3000/sub/manage_content.html');


            }).catch(err => {
                console.log(err)
            });
    })
}

//producer
function delete_producer(target_id) {
    fetch('http://localhost:8080/deleteProducer/' + target_id, {
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
        window.location.assign('http://localhost:3000/sub/manage_content.html');
    }).catch(err => {
        console.log(err);
    })
}

function edit_producer(target_id) {
    var kategorinavn, producentnavn;
    document.getElementById('edit_div').innerHTML = '';
    fetch('http://localhost:8080/producer/' + target_id, {
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
    fetch('http://localhost:8080/updateProducer/' + target_id, {
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
        window.location.assign('http://localhost:3000/sub/manage_content.html');
    }).catch(err => {
        console.log(err);
    })
}

function add_new_producer() {
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

        let request = new Request('http://localhost:8080/registerProducer', init);

        fetch(request)
            .then(result => {
                window.location.assign('http://localhost:3000/sub/manage_content.html');


            }).catch(err => {
                console.log(err)
            });
    })
}


//category
function delete_category(target_id) {
    fetch('http://localhost:8080/deleteCategory/' + target_id, {
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
        window.location.assign('http://localhost:3000/sub/manage_content.html');
    }).catch(err => {
        console.log(err);
    })
}

function edit_category(target_id) {
    document.getElementById('edit_div').innerHTML = '';
    fetch('http://localhost:8080/category/' + target_id, {
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
    fetch('http://localhost:8080/updateCategory/' + target_id, {
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
        window.location.assign('http://localhost:3000/sub/manage_content.html');
    }).catch(err => {
        console.log(err);
    })
}

function add_new_category() {
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

        let request = new Request('http://localhost:8080/registerCategory', init);

        fetch(request)
            .then(result => {
                window.location.assign('http://localhost:3000/sub/manage_content.html');


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

    let request = new Request('http://localhost:8080/getFilteredProducts', init);

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
            // window.location.assign('http://localhost:3000/sub/manage_content.html');
        }).catch(err => {
            console.log(err)
        });
}