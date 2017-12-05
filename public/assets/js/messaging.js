document.querySelector('#new_message_btn').addEventListener('click', (event) => {
    event.preventDefault();
    fetch('http://localhost:8080/user', {
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
                    <input type="text" name="subject" id="subject" value="">
                </p>
                <p>
                    <label for="message">Message</label>
                    <input type="message" name="message" id="message" value="">
                </p>
                <button id="send_btn">Send</button>
            </form>
            `;
            document.getElementById('send_btn').addEventListener('click', (event) => {
                event.preventDefault();
                let form = document.querySelector('#messaging_form');
                let data = new FormData(form);
                let init = {
                    method: 'POST',
                    body: data,
                    cache: 'no-cache',
                    mode: 'cors'
                };
            })
            fetch('http://localhost:8080/', init);
    }).catch(err => {
        console.log(err);
    });
    fetch('http://localhost:8080/allUsers', {
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
});
document.querySelector('#outbox_btn').addEventListener('click', (event) => {
    event.preventDefault();
});