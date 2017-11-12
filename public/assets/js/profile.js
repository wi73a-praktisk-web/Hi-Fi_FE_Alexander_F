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
                //build profile page

                //create the elements
                /**
                 * profile picture
                 * name
                 * user name
                 * email adress
                 * adress
                 * phone
                 * created date
                 */

                /**
                 * also functionality for changing the password as well as 
                 * functionality to change user & personal data (password probably is categorized under user)
                 */

                //create the heading
                const h2 = document.createElement('H2');
                h2.setAttribute("class", 'col-xs-5')
                const username = document.createTextNode(response[0].username);
                h2.appendChild(username);

                // create the image
                const img = document.createElement('IMG');
                img.setAttribute('src', "../../img/profile_placeholder.png");
                img.setAttribute('alt', "profiil-billede");
                img.setAttribute('class', "col-xs-5 col-xs-offset-2 img-responsive");

                // create a file picker to update the profile picture


                //create the name
                const input_name = document.createElement('INPUT');
                input_name.setAttribute('readonly', true);
                // input_name.setAttribute('class', "col-xs-6 col-xs-offset-0 col-sm-8 col-sm-offset-2 col-md-10 col-md-offset-1");
                input_name.setAttribute('placeholder', response[0].name);
                input_name.style.margin = "5px";
                input_name.style.padding = "5px";
                input_name.style.border = "2px solid rgba(24, 136, 180, 1)";
                input_name.style.borderRadius = "5px";
                input_name.style.backgroundColor = "rgba(210, 230, 238, 1)";
                input_name.style.color = "black";

                //create the email adress
                const input_email = document.createElement('INPUT');
                input_email.setAttribute('readonly', true);
                // input_email.setAttribute('class', "col-xs-6 col-xs-offset-0 col-sm-8 col-sm-offset-2 col-md-10 col-md-offset-1");
                input_email.setAttribute('placeholder', response[0].email);
                input_email.style.margin = "5px";
                input_email.style.padding = "5px";
                input_email.style.border = "2px solid rgba(24, 136, 180, 1)";
                input_email.style.borderRadius = "5px";
                input_email.style.backgroundColor = "rgba(210, 230, 238, 1)";
                input_email.style.color = "black";

                //create the adress
                const input_adress = document.createElement('INPUT');
                input_adress.setAttribute('readonly', true);
                // input_adress.setAttribute('class', "col-xs-6 col-xs-offset-0 col-sm-8 col-sm-offset-2 col-md-10 col-md-offset-1");
                input_adress.setAttribute('placeholder', response[0].adress);
                input_adress.style.margin = "5px";
                input_adress.style.padding = "5px";
                input_adress.style.border = "2px solid rgba(24, 136, 180, 1)";
                input_adress.style.borderRadius = "5px";
                input_adress.style.backgroundColor = "rgba(210, 230, 238, 1)";
                input_adress.style.color = "black";
                //create the phone
                const input_phone = document.createElement('INPUT');
                input_phone.setAttribute('readonly', true);
                // input_phone.setAttribute('class', "col-xs-6 col-xs-offset-0 col-sm-8 col-sm-offset-2 col-md-10 col-md-offset-1");
                input_phone.setAttribute('placeholder', response[0].phone);
                input_phone.style.margin = "5px";
                input_phone.style.padding = "5px";
                input_phone.style.border = "2px solid rgba(24, 136, 180, 1)";
                input_phone.style.borderRadius = "5px";
                input_phone.style.backgroundColor = "rgba(210, 230, 238, 1)";
                input_phone.style.color = "black";

                //create the creation date
                const created = document.createElement('P');
                created.innerHTML = response[0].created;
                created.style.margin = "5px";
                created.style.padding = "5px";
                created.style.border = "2px solid rgba(24, 136, 180, 1)";
                created.style.borderRadius = "5px";
                created.style.width = "75%";
                created.style.backgroundColor = "rgba(210, 230, 238, 1)";
                created.style.color = "black";

                //create rows to hold divs
                const header_row = document.createElement('ROW');
                const name_row = document.createElement('ROW');
                const email_row = document.createElement('ROW');
                const adress_row = document.createElement('ROW');
                const phone_row = document.createElement('ROW');
                const creation_row = document.createElement('ROW');

                //create divs to hold elements
                const header_div = document.createElement('DIV');
                const name_div = document.createElement('DIV');
                const email_div = document.createElement('DIV');
                const adress_div = document.createElement('DIV');
                const phone_div = document.createElement('DIV');
                const creation_div = document.createElement('DIV');

                //append elements to divs
                header_div.appendChild(h2);
                header_div.appendChild(img);
                name_div.appendChild(input_name);
                email_div.appendChild(input_email);
                adress_div.appendChild(input_adress);
                phone_div.appendChild(input_phone);
                creation_div.appendChild(created);

                //prepare the div's
                header_div.setAttribute('class', "col-xs-10 col-xs-offset-1");
                name_div.setAttribute('class', "col-xs-10 col-xs-offset-1");
                email_div.setAttribute('class', "col-xs-10 col-xs-offset-1");
                adress_div.setAttribute('class', "col-xs-10 col-xs-offset-1");
                phone_div.setAttribute('class', "col-xs-10 col-xs-offset-1");
                creation_div.setAttribute('class', "col-xs-10 col-xs-offset-1");

                //append divs to rows
                header_row.appendChild(header_div);
                name_row.appendChild(name_div);
                email_row.appendChild(email_div);
                adress_row.appendChild(adress_div);
                phone_row.appendChild(phone_div);
                creation_row.appendChild(creation_div);

                //append everything to html page (myDiv)
                document.getElementById('profile_cont').appendChild(header_row);
                document.getElementById('profile_cont').appendChild(name_row);
                document.getElementById('profile_cont').appendChild(email_row);
                document.getElementById('profile_cont').appendChild(adress_row);
                document.getElementById('profile_cont').appendChild(phone_row);
                document.getElementById('profile_cont').appendChild(creation_row);

                //tada!
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