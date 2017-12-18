(() => {
    document.addEventListener('DOMContentLoaded', () => {
        const form = document.querySelector('.loginForm');

        form.onsubmit = () => {
            const data = JSON.stringify({
                'username': form.username.value,
                'password': form.password.value
            });

            fetch('http://localhost:8080/login', {
                'method': 'POST',
                'headers': {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Content-Length': data.length
                },
                'mode': 'cors',
                'cache': 'default',
                'body': data
            })
                .then((result) => result.json())
                .then((data) => {
                    localStorage.setItem('token', data.AccessToken);
                    localStorage.setItem('userid', data.ID);
                    console.log('data.AToken = ' + data.AccessToken)
                    console.log("data.ID = " + data.ID);
                    window.location.replace("./profile_page.html?user=" + data.ID);
                    document.querySelector('#log_in').style.display = "none";
                })
                .catch((err) => {
                    console.log(err);
                });

            return false;
        };
    });
})();