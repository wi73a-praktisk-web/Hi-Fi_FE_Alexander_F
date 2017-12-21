document.addEventListener('DOMContentLoaded', function () {
    if (localStorage.getItem('token') === null) {
        window.location.assign('./log_in.html');
    }

    fetch('http://95.85.49.133:3000/checkFlags/' + localStorage.getItem('userid'), {
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
        })
        .then((results) => {
            console.log(results.length);
            if (results.length != 0) {
                document.querySelector('.glyphicon-flag').style.color = "red";
            } else {
                document.querySelector('.glyphicon-flag').style.color = "green";
            }
            document.querySelector('.glyphicon-flag').innerHTML = '(' + results.length + ')';
        }).catch(err => {
            console.log(err);
        });
});

document.querySelector('#new_message_btn').addEventListener('click', (event) => {
    event.preventDefault();
    document.querySelector('#content_div').innerHTML = '';
    fetch('http://95.85.49.133:3000/user', {
        'method': 'post',
        'headers': {
            'Authorization': localStorage.getItem('token'),
            'userID': localStorage.getItem('userid'),
            'Content-Type': 'application/json'
        },
        'body': `{
            "param" : "${localStorage.getItem('userid')}"}`,
        'mode': 'cors',
        'cache': 'default'
    }).then(result => {
        console.log(result);
        return result.json();
    }).then(users => {
        document.querySelector('#content_div').innerHTML += `
            <h1>
                <span class="glyphicon glyphicon-pencil">
                </span>
                Send Message
            </h1>
            <form id="messaging_form" method="post" enctype="multipart/form-data">
                <p>
                    <label for="name">Name</label>
                    <input type="text" name="name" id="name" value="${users[0].name}">
                </p>
                <p>
                    <label for="recipient">Recipient</label>
                    <select name="recipient" id="recipient" value="Recipient"></select>
                </p>
                <p>
                    <label for="subject">Subject</label>
                    <input type="text" name="subject" id="subject" value="">
                </p>
                <p>
                    <label for="message">Message</label>
                    <input type="message" name="message" id="message" value="">
                </p>
                <button id="send_btn">Send</button>
            </form>
            `;
        document.getElementById('send_btn').addEventListener('click', event => {
            event.preventDefault();
            console.log("anything?!");
            let form = document.querySelector('#messaging_form');
            let data = new FormData(form);
            let init = {
                method: 'POST',
                body: data,
                cache: 'no-cache',
                mode: 'cors'
            };
            fetch('http://95.85.49.133:3000/sendMessage/' + localStorage.getItem('userid'), init)
                .then(() => {
                    window.location.assign('http://95.85.49.133:3000/sub/messaging.html');
                }).catch(err => {
                    console.log(err);
                });
        });
    }).catch(err => {
        console.log(err);
    });
    fetch('http://95.85.49.133:3000/allUsers', {
        'method': 'post',
        'headers': {
            'Authorization': localStorage.getItem('token'),
            'userID': localStorage.getItem('userid'),
            'Content-Type': 'application/json'
        },
        'body': `{
            "param" : "${localStorage.getItem('userid')}"}`,
        'mode': 'cors',
        'cache': 'default'
    }).then(result => {
        console.log(result);
        return result.json();
    }).then(users => {
        users.forEach(user => {
            document.getElementById('recipient').innerHTML += `<option class="recipient_option"> ${user.name} < ${user.email} ></option>`;
        });
    }).catch(err => {
        console.log(err);
    });
});

document.querySelector('#inbox_btn').addEventListener('click', (event) => {
    event.preventDefault();
    document.querySelector('#content_div').innerHTML = '';
    fetch('http://95.85.49.133:3000/allInboxMessages/' + localStorage.getItem('userid'), {
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
    }).then(messages => {
        document.querySelector('#content_div').innerHTML += `
        <h1>
            <span class="glyphicon glyphicon-download"></span>
            InBox
        </h1>
        <row>
            <div class="col-xs-12 col-xs-offset-1">
                <row>
                    <div id="message_list" class="col-xs-3">
                        
                    </div>
                    <div class="col-xs-9">  
                        <row>  
                        <div id="view_message" class="col-xs-12">
                        <p>
                            No Message Selected
                        </p>
                        </div>
                        <div id="respond_message" class="col-xs-12">
                        </div>
                        </row>
                    </div>
                </row>
            </div>
        </row>`;
        console.log("messages" + messages.length);
        messages.forEach(message => {
            let send_url;
            fetch('http://95.85.49.133:3000/getUserImage/' + message.sender, {
                    'method': 'get',
                    'headers': {
                        'Authorization': localStorage.getItem('token'),
                        'userID': localStorage.getItem('userid'),
                        'Content-Type': 'application/json'
                    },
                    'mode': 'cors',
                    'cache': 'default'
                })
                .then(response => {
                    return response.json();
                })
                .then(result => {
                    console.log('result[0].url = ' + result[0].url);
                    send_url = result[0].url;
                    console.log('send_url = ' + send_url);
                })
                .then(() => {
                    console.log("message = " + message.name);
                    console.log("message" + message.id);
                    document.querySelector('#message_list').innerHTML += `
                <div>
                    <row>   
                        <div id="div${message.id}" class="annoyingTheShitOutOfMe col-xs-12">
                            <a id="${message.id}" class="del_class" onclick="deleteMessage(this.id)" href="">
                                <span class="glyphicon glyphicon-trash"></span>
                            </a>
                            <a id="${message.id}" onclick="viewSingleInboxMessage(this.id)" href="#">
                                <row>
                                    <div>
                                        <label>From:</label> <img src='http://95.85.49.133:3000/images/${send_url}' height="20" alt="henter billede"> <strong>${message.name}</strong> <br/>
                                        <label>Subject: </label> <strong> ${message.subject}</strong>
                                    </div>
                                </row>
                                <row>
                                    <div>
                                        <label>Sent: </label> <strong> ${message.created}</strong>
                                    </div>
                                </row>
                            </a>
                        </div>
                    </row>
                </div>`;
                    if (message.viewed == 'unread') {
                        var something = Array.from(document.querySelector('#div' + message.id).getElementsByTagName('a'));
                        something.forEach(element => {
                            element.style.backgroundColor = 'rgba(124,124,124,1)';
                        })
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        })
    }).catch(err => {
        console.log(err);
    });
});

document.querySelector('#outbox_btn').addEventListener('click', (event) => {
    event.preventDefault();
    document.querySelector('#content_div').innerHTML = '';
    fetch('http://95.85.49.133:3000/allOutboxMessages/' + localStorage.getItem('userid'), {
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
    }).then(messages => {
        document.querySelector('#content_div').innerHTML += `
        <h1>
            <span class="glyphicon glyphicon-upload">    
            </span>
            OutBox
        </h1>
        <row>
            <div class="col-xs-12 col-xs-offset-1">
                <row>
                    <div id="message_list" class="col-xs-3">
                        
                    </div>
                    <div class="col-xs-9">  
                        <row>  
                            <div id="view_message" class="col-xs-12">
                            <p>
                                No Message Selected
                            </p>
                            </div>
                            <div id="respond_message" class="col-xs-12">
                            </div>
                        </row>
                    </div>
                </row>
            </div>
        </row>`;
        console.log("messages" + messages.length);
        messages.forEach(message => {
            let send_url;
            fetch('http://95.85.49.133:3000/getUserImage/' + message.sender, {
                    'method': 'get',
                    'headers': {
                        'Authorization': localStorage.getItem('token'),
                        'userID': localStorage.getItem('userid'),
                        'Content-Type': 'application/json'
                    },
                    'mode': 'cors',
                    'cache': 'default'
                })
                .then(response => {
                    return response.json();
                })
                .then(result => {
                    console.log('result[0].url = ' + result[0].url);
                    send_url = result[0].url;
                    console.log('send_url = ' + send_url);
                })
                .then(() => {
                    console.log("message" + message.id);
                    document.querySelector('#message_list').innerHTML += `
                <div>
                    <row>    
                        <div class="annoyingTheShitOutOfMe col-xs-12">
                            <a id="${message.id}" class="del_class onclick="deleteMessage(this.id)" href="#">
                                <span class="glyphicon glyphicon-trash"></span>
                            </a>
                            <a id="${message.id}" onclick="viewSingleOutboxMessage(this.id)" href="#">
                                <row>
                                    <div>
                                        <label>From:</label> <img src='http://95.85.49.133:3000/images/${send_url}' height="20" alt="henter billede"> <strong>${message.name}</strong> <br/>
                                        <label>Sent: </label> <strong> ${message.created}</strong>
                                    </div>
                                </row>
                                <row>
                                    <div>
                                        <label>Subject: </label> <strong> ${message.subject}</strong>
                                    </div>
                                </row>
                            </a>
                        </div>
                    </row>
                </div>`;
                })
                .catch(err => {
                    console.log(err);
                });
        })
    }).catch(err => {
        console.log(err);
    });
});

function viewSingleInboxMessage(target_id) {
    var rec_url, send_url;
    var something = Array.from(document.querySelector('#div' + target_id).getElementsByTagName('a'));
    something.forEach(element => {
        element.style.backgroundColor = 'rgba(34,34,34,1)';
    })
    document.getElementById('div' + target_id).style.backgroundColor = "none";
    document.getElementById('view_message').innerHTML = '';
    //fetch that single message
    fetch('http://95.85.49.133:3000/singleInboxMessage/' + target_id, {
            'method': 'get',
            'headers': {
                'Authorization': localStorage.getItem('token'),
                'userID': localStorage.getItem('userid'),
                'Content-Type': 'application/json'
            },
            'mode': 'cors',
            'cache': 'default'
        }).then(result => {
            return result.json()
        })
        .then(message => {
            //////////////////////////////////////////
            console.log("message[0].receiver = " + message[0].receiver);
            console.log("message[0].sender = " + message[0].sender);

            fetch('http://95.85.49.133:3000/getUserImage/ ' + message[0].receiver, {
                'method': 'get',
                'headers': {
                    'Authorization': localStorage.getItem('token'),
                    'userID': localStorage.getItem('userid'),
                    'Content-Type': 'application/json'
                },
                'mode': 'cors',
                'cache': 'default'
            }).then(response => {
                return response.json();
            }).then(result => {
                rec_url = result[0].url;
                console.log("rec_url = " + rec_url);
            }).catch(err => {
                console.log(err);
            });
            fetch('http://95.85.49.133:3000/getUserImage/' + message[0].sender, {
                'method': 'get',
                'headers': {
                    'Authorization': localStorage.getItem('token'),
                    'userID': localStorage.getItem('userid'),
                    'Content-Type': 'application/json'
                },
                'mode': 'cors',
                'cache': 'default'
            }).then(response => {
                return response.json();
            }).then(result => {
                send_url = result[0].url;
                console.log("send_url = " + send_url);
            }).then(() => {
                //this is where the message is being appended to the #view_message
                document.getElementById('view_message').innerHTML += `
                    <button id="respond_btn">
                        <span  class="glyphicon glyphicon-repeat"></span>
                        Respond
                    </button>
                    <button id="forward_btn">
                        <span class="glyphicon glyphicon-share-alt"></span>
                        Forward
                    </button>
                        <a id="${message[0].id}" onclick="deleteMessage(this.id)" href="#">
                            <span class="glyphicon glyphicon-trash"></span> Delete
                        </a><br/>
                    <div class="wrapper_div">
                        <div class="label_div">
                            <label>Subject: </label> <span>${message[0].subject}</span> <br/>
                            <label>From: <img src='http://95.85.49.133:3000/images/${send_url}' height="20" alt="henter billede"> </label> <span>${message[0].send}</span> <br/>
                            <label>To: <img src='http://95.85.49.133:3000/images/${rec_url}' height="20" alt="henter billede"> </label> <span>${message[0].rec}</span> <br/>
                        </div>
                        <p>
                            ${message[0].message}
                        </p>
                    </div>
                   `;
                fetch('http://95.85.49.133:3000/user', {
                        'method': 'post',
                        'headers': {
                            'Authorization': localStorage.getItem('token'),
                            'userID': localStorage.getItem('userid'),
                            'Content-Type': 'application/json'
                        },
                        'body': `{"param" : "${localStorage.getItem('userid')}"}`,
                        'mode': 'cors',
                        'cache': 'default'
                    }).then(result => {
                        console.log(result);
                        return result.json();
                    }).then(users => {
                        document.querySelector('#forward_btn').addEventListener('click', (event) => {
                            event.preventDefault();
                            document.querySelector('#respond_message').innerHTML = `
                        <h1>Send Message</h1>
                        <form id="messaging_form" method="post" enctype="multipart/form-data">
                            <p>
                                <label for="name">Name</label>
                                <input type="text" name="name" id="name" value="${users[0].name}">
                            </p>
                            <p>
                                <label for="recipient">Recipient</label>
                                <select name="recipient" id="recipient" value="Recipient"></select>
                            </p>
                            <p>
                                <label for="subject">Subject</label>
                                <input type="text" name="subject" id="subject" value="FW: ${message[0].subject}">
                            </p>
                            <p>
                                <label for="message">Message</label>
                                <input type="message" name="message" id="message" value="${message[0].message}">
                            </p>
                            <button id="send_btn">Send</button>
                        </form>
                        `;
                        document.querySelector('#respond_message').style.border = "2px solid white";
                        document.querySelector('#respond_message').style.backgroundColor = "rgba(44,44,44,1)";
                            fetch('http://95.85.49.133:3000/allUsers', {
                                'method': 'post',
                                'headers': {
                                    'Authorization': localStorage.getItem('token'),
                                    'userID': localStorage.getItem('userid'),
                                    'Content-Type': 'application/json'
                                },
                                'body': `{
                                "param" : "${localStorage.getItem('userid')}"}`,
                                'mode': 'cors',
                                'cache': 'default'
                            }).then(result => {
                                console.log(result);
                                return result.json();
                            }).then(users => {
                                users.forEach(user => {
                                    document.getElementById('recipient').innerHTML += `<option class="recipient_option"> ${user.name} < ${user.email} ></option>`;
                                    var recipient_option = Array.from(document.getElementsByClassName('recipient_option'));
                                    recipient_option.forEach(option => {
                                        console.log("option = " + option.innerHTML);
                                        option_text = (option.innerHTML).replace(/\s/g, '');
                                        option_text = option_text.substring(0, option_text.indexOf('&'));
                                        console.log("option_text" + option_text);
                                        console.log('message[0].send = ' + message[0].send);
                                        if (option_text == message[0].name) {
                                            option.selected = true;
                                        }
                                    })
                                });
                            }).catch(err => {
                                console.log(err);
                            });
                            document.querySelector('#respond_message').scrollIntoView();
                            document.getElementById('send_btn').addEventListener('click', event => {
                                event.preventDefault();
                                console.log("anything?!");
                                let form = document.querySelector('#messaging_form');
                                let data = new FormData(form);
                                let init = {
                                    method: 'POST',
                                    body: data,
                                    cache: 'no-cache',
                                    mode: 'cors'
                                };
                                fetch('http://95.85.49.133:3000/sendMessage/' + localStorage.getItem('userid'), init)
                                    .then(() => {
                                        window.location.assign('http://95.85.49.133:3000/sub/messaging.html');
                                    }).catch(err => {
                                        console.log(err);
                                    });
                            });
                        })
                        document.querySelector('#respond_btn').addEventListener('click', (event) => {
                            event.preventDefault();
                            document.querySelector('#respond_message').innerHTML = `
                        <h1>REspond to Message</h1>
                        <form id="messaging_form" method="post" enctype="multipart/form-data">
                            <p>
                                <label for="name">Name</label>
                                <input type="text" name="name" id="name" value="${users[0].name}">
                            </p>
                            <p>
                                <label for="recipient">Recipient</label>
                                <select name="recipient" id="recipient" value="Recipient"></select>
                            </p>
                            <p>
                                <label for="subject">Subject</label>
                                <input type="text" name="subject" id="subject" value="RE: ${message[0].subject}">
                            </p>
                            <p>
                                <label for="message">Message</label>
                                <input type="message" name="message" id="message" value="">
                            </p>
                            <button id="send_btn">Send</button>
                        </form>
                        `;
                        document.querySelector('#respond_message').style.border = "2px solid white";
                        document.querySelector('#respond_message').style.backgroundColor = "rgba(44,44,44,1)";
                            fetch('http://95.85.49.133:3000/allUsers', {
                                'method': 'post',
                                'headers': {
                                    'Authorization': localStorage.getItem('token'),
                                    'userID': localStorage.getItem('userid'),
                                    'Content-Type': 'application/json'
                                },
                                'body': `{
                        "param" : "${localStorage.getItem('userid')}"}`,
                                'mode': 'cors',
                                'cache': 'default'
                            }).then(result => {
                                console.log(result);
                                return result.json();
                            }).then(users => {
                                users.forEach(user => {
                                    document.getElementById('recipient').innerHTML += `<option class="recipient_option"> ${user.name} < ${user.email} ></option>`;
                                    var recipient_option = Array.from(document.getElementsByClassName('recipient_option'));
                                    recipient_option.forEach(option => {
                                        console.log("option = " + option.innerHTML);
                                        option_text = (option.innerHTML).replace(/\s/g, '');
                                        option_text = option_text.substring(0, option_text.indexOf('&'));
                                        console.log("option_text" + option_text);
                                        console.log('message[0].send = ' + message[0].send);
                                        if (option_text == message[0].name) {
                                            option.selected = true;
                                        }
                                    })
                                });
                            }).catch(err => {
                                console.log(err);
                            });
                            document.querySelector('#respond_message').scrollIntoView();
                            document.getElementById('send_btn').addEventListener('click', event => {
                                event.preventDefault();
                                console.log("anything?!");
                                let form = document.querySelector('#messaging_form');
                                let data = new FormData(form);
                                let init = {
                                    method: 'POST',
                                    body: data,
                                    cache: 'no-cache',
                                    mode: 'cors'
                                };
                                fetch('http://95.85.49.133:3000/sendMessage/' + localStorage.getItem('userid'), init)
                                    .then(() => {
                                        window.location.assign('http://95.85.49.133:3000/sub/messaging.html');
                                    }).catch(err => {
                                        console.log(err);
                                    });
                            });
                        })
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }).catch(err => {
                console.log(err);
            });
            //////////////////////////////////////////

        }).then(() => {
            fetch('http://95.85.49.133:3000/checkFlags/' + localStorage.getItem('userid'), {
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
                })
                .then((results) => {
                    console.log(results.length);
                    if (results.length != 0) {
                        document.querySelector('.glyphicon-flag').style.color = "red";
                    } else {
                        document.querySelector('.glyphicon-flag').style.color = "green";
                    }
                    document.querySelector('.glyphicon-flag').innerHTML = '(' + results.length + ')';
                }).catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });
}

function viewSingleOutboxMessage(target_id) {
    var rec_url, send_url;
    document.getElementById('respond_message').innerHTML = '';
    document.getElementById('view_message').innerHTML = '';
    //fetch that single message
    fetch('http://95.85.49.133:3000/singleOutboxMessage/' + target_id, {
            'method': 'get',
            'headers': {
                'Authorization': localStorage.getItem('token'),
                'userID': localStorage.getItem('userid'),
                'Content-Type': 'application/json'
            },
            'mode': 'cors',
            'cache': 'default'
        }).then(result => {
            return result.json()
        })
        .then(message => {
            //////////////////////////////////////////
            console.log("message[0].receiver = " + message[0].receiver);
            console.log("message[0].sender = " + message[0].sender);

            fetch('http://95.85.49.133:3000/getUserImage/ ' + message[0].receiver, {
                'method': 'get',
                'headers': {
                    'Authorization': localStorage.getItem('token'),
                    'userID': localStorage.getItem('userid'),
                    'Content-Type': 'application/json'
                },
                'mode': 'cors',
                'cache': 'default'
            }).then(response => {
                return response.json();
            }).then(result => {
                rec_url = result[0].url;
                console.log("rec_url = " + rec_url);
            }).catch(err => {
                console.log(err);
            });
            fetch('http://95.85.49.133:3000/getUserImage/' + message[0].sender, {
                    'method': 'get',
                    'headers': {
                        'Authorization': localStorage.getItem('token'),
                        'userID': localStorage.getItem('userid'),
                        'Content-Type': 'application/json'
                    },
                    'mode': 'cors',
                    'cache': 'default'
                }).then(response => {
                    return response.json();
                }).then(result => {
                    send_url = result[0].url;
                    console.log("send_url = " + send_url);
                })
                .then(() => {
                    //this is where the message is being appended to the #view_message
                    document.getElementById('view_message').innerHTML += `
                    <button id="forward_btn">
                        <span class="glyphicon glyphicon-share-alt"></span>
                        Forward
                    </button>
                    <a id="${message[0].id}" onclick="deleteMessage(this.id)" href="#">
                        <span class="glyphicon glyphicon-trash"></span> Delete
                    </a><br/>
                    <div class="wrapper_div">
                        <div class="label_div">
                            <label>Subject: </label> <span>${message[0].subject}</span>  <br/>
                            <label>From: <img src='http://95.85.49.133:3000/images/${send_url}' height="20" alt="henter billede"> </label> <span>${message[0].send}</span> <br/>
                            <label>To: <img src='http://95.85.49.133:3000/images/${rec_url}' height="20" alt="henter billede"> </label>  <span>${message[0].rec}</span> <br/>
                        </div>
                        <p>
                            ${message[0].message}
                        </p>
                    </div>`;
                }).then(() => {
                    fetch('http://95.85.49.133:3000/user', {
                            'method': 'post',
                            'headers': {
                                'Authorization': localStorage.getItem('token'),
                                'userID': localStorage.getItem('userid'),
                                'Content-Type': 'application/json'
                            },
                            'body': `{"param" : "${localStorage.getItem('userid')}"}`,
                            'mode': 'cors',
                            'cache': 'default'
                        }).then(result => {
                            console.log(result);
                            return result.json();
                        })
                        .then(users => {
                            var myFOrWardButton = document.getElementById('forward_btn');
                            console.log(myFOrWardButton);

                            document.getElementById('forward_btn').addEventListener('click', event => {
                                event.preventDefault();
                                document.querySelector('#respond_message').innerHTML = `
                                    <h1>Forward Message</h1>
                                    <form id="messaging_form" method="post" enctype="multipart/form-data">
                                        <p>
                                            <label for="name">Name</label>
                                            <input type="text" name="name" id="name" value="${users[0].name}">
                                        </p>
                                        <p>
                                            <label for="recipient">Recipient</label>
                                            <select name="recipient" id="recipient" value="Recipient"></select>
                                        </p>
                                        <p>
                                            <label for="subject">Subject</label>
                                            <input type="text" name="subject" id="subject" value="FW: ${message[0].subject}">
                                        </p>
                                        <p>
                                            <label for="message">Message</label>
                                            <input type="message" name="message" id="message" value="${message[0].message}">
                                        </p>
                                        <button id="send_btn">Send</button>
                                    </form>`;
                                    document.querySelector('#respond_message').style.border = "2px solid white";
                                    document.querySelector('#respond_message').style.backgroundColor = "rgba(44,44,44,1)";
                                    
                                fetch('http://95.85.49.133:3000/allUsers', {
                                    'method': 'post',
                                    'headers': {
                                        'Authorization': localStorage.getItem('token'),
                                        'userID': localStorage.getItem('userid'),
                                        'Content-Type': 'application/json'
                                    },
                                    'body': `{
                                            "param" : "${localStorage.getItem('userid')}"}`,
                                    'mode': 'cors',
                                    'cache': 'default'
                                }).then(result => {
                                    console.log(result);
                                    return result.json();
                                }).then(users => {
                                    users.forEach(user => {
                                        document.getElementById('recipient').innerHTML += `<option class="recipient_option"> ${user.name} < ${user.email} ></option>`;
                                        var recipient_option = Array.from(document.getElementsByClassName('recipient_option'));
                                        recipient_option.forEach(option => {
                                            console.log("option = " + option.innerHTML);
                                            option_text = (option.innerHTML).replace(/\s/g, '');
                                            option_text = option_text.substring(0, option_text.indexOf('&'));
                                            console.log("option_text" + option_text);
                                            console.log('message[0].send = ' + message[0].send);
                                            if (option_text == message[0].name) {
                                                option.selected = true;
                                            }
                                        })
                                    });
                                }).catch(err => {
                                    console.log(err);
                                });
                                document.querySelector('#respond_message').scrollIntoView();
                                document.getElementById('send_btn').addEventListener('click', event => {
                                    event.preventDefault();
                                    console.log("anything?!");
                                    let form = document.querySelector('#messaging_form');
                                    let data = new FormData(form);
                                    let init = {
                                        method: 'POST',
                                        body: data,
                                        cache: 'no-cache',
                                        mode: 'cors'
                                    };
                                    fetch('http://95.85.49.133:3000/sendMessage/' + localStorage.getItem('userid'), init)
                                        .then(result => {
                                            console.log("sunovabitch");
                                            window.location.assign('http://95.85.49.133:3000/sub/messaging.html');
                                        }).catch(err => {
                                            console.log(err);
                                        });
                                });
                            })
                        })
                        .catch(err => {
                            console.log(err);
                        });
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });


}

function deleteMessage(target_id) {
    console.log("target_id" + target_id);
    fetch('http://95.85.49.133:3000/deleteMessage/' + target_id, {
            'method': 'post',
            'headers': {
                'Authorization': localStorage.getItem('token'),
                'userID': localStorage.getItem('userid'),
                'Content-Type': 'application/json'
            },
            'mode': 'cors',
            'cache': 'default'
        })
        .then(response => {
            window.location.assign('http://95.85.49.133:3000/sub/messaging.html');
        })
        .catch(err => {
            console.log(err);
        });
}