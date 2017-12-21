(function () {
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

    // https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    const go_fetch = function (param) {
        console.log("gofetch = " + param);
        fetch('http://95.85.49.133:3000/products/' + param)
            .then(function (result) {
                return result.json();
            })
            .then(function (products) {
                products.forEach(function (product) {
                    console.log(product.kat_navn);
                    if (param == product.Navn || param == product.vareNr || param == product.prod_navn || param == product.kat_navn) {

                        console.log(product);
                        //create the image
                        const img = document.createElement('IMG');
                        if (product.billede) {
                            img.setAttribute('src', "../../img/" + product.billede);
                        }
                        img.setAttribute('alt', "produkt billede");
                        img.setAttribute('class', "col-xs-12");

                        //create the producer
                        const prod = document.createElement('P');
                        const prodName = document.createTextNode(product.prod_navn);
                        prod.appendChild(prodName);
                        prod.setAttribute('class', "col-xs-12");

                        //create the header
                        const h2 = document.createElement('H2');
                        const navn = document.createTextNode(product.Navn);
                        h2.appendChild(navn);

                        //create the description
                        const descP = document.createElement('P');
                        const descNode = document.createTextNode(product.Beskrivelse);
                        descP.appendChild(descNode);

                        //create the vareNr
                        const vareNr = document.createElement('p');
                        const vareNrTxt = document.createTextNode(product.vareNr);
                        vareNr.appendChild(vareNrTxt);

                        //create the lagerstatus
                        const lagerStatus = document.createElement('P');
                        lagerStatus.innerHTML = product.Navn + "er på lager.";

                        //create the price
                        const price = document.createElement('P');
                        const priceTag = document.createTextNode(product.Pris);
                        price.appendChild(priceTag);

                        //create the shoppingCart button
                        const cart = document.createElement('A');
                        cart.innerHTML = "Læg i kurv";
                        cart.setAttribute('href', "#");
                        cart.style.padding = "5px";
                        cart.style.backgroundColor = "orange";
                        cart.style.color = "white";
                        cart.style.border = "2px solid rgba(34,34,34,1)";
                        cart.style.borderRadius = "5px";

                        //putting it all together

                        //create inner div's
                        const div2 = document.createElement('DIV');
                        const div3 = document.createElement('DIV');
                        const div1 = document.createElement('DIV');

                        //prepare inner div's
                        div2.setAttribute('class', "col-xs-12 col-xs-offset-0 col-sm-4 col-sm-offset-4");
                        div3.setAttribute('class', "col-xs-12 col-xs-offset-0 col-sm-4 col-sm-offset-4");
                        div1.setAttribute('class', "col-xs-12 col-xs-offset-0 col-sm-4 col-sm-offset-4");
                        div1.style.padding = "10px";
                        div2.style.padding = "10px";
                        div3.style.padding = "10px";

                        //append inner div's
                        div1.appendChild(img);
                        div1.appendChild(prodName);;
                        div2.appendChild(h2);
                        div2.appendChild(vareNr);
                        div2.appendChild(descP);
                        div3.appendChild(lagerStatus);
                        div3.appendChild(price);
                        div3.appendChild(cart);

                        //create a row
                        const row_row_row_your_boat = document.createElement('ROW');

                        //create a wrapper_div
                        const wrapperDiv = document.createElement('DIV');
                        wrapperDiv.style.outline = "2px solid black";
                        wrapperDiv.setAttribute('class', "col-xs-12");
                        wrapperDiv.style.backgroundColor = "rgba(34,34,34,.5)";
                        wrapperDiv.style.padding = "10px";
                        wrapperDiv.style.margin = "10px";

                        //create a wrapperRow
                        const wrapRow = document.createElement('ROW');

                        //document.getElementById('myDiv').innerHTML += product.Navn + " " + product.Pris + " " + product.vareNr + " " + product.Beskrivelse + " " + product.Lagerstatus + " " + product.billede +  "<br/>";

                        //attach 3 divs to inner row
                        row_row_row_your_boat.appendChild(div1);
                        row_row_row_your_boat.appendChild(div2);
                        row_row_row_your_boat.appendChild(div3);

                        //append inner row to wrapper div
                        wrapperDiv.appendChild(row_row_row_your_boat);

                        //append wrapper div to wrapper row
                        wrapRow.appendChild(wrapperDiv);

                        // make the product click-able by putting it into an anchor
                        const a = document.createElement('A');
                        a.setAttribute('href', "../products.html?search=" + product.vareNr);
                        a.appendChild(wrapRow);

                        //append wrapper row to actual div
                        document.getElementById('myDiv').appendChild(a);
                        document.getElementById('myDiv').innerHTML += "<br/>";
                    }
                })
            }).catch(function (error) {
                console.log(error);
            });
    }

    const go_fetch_queries = function (param) {
        console.log("param = " + param);


        var ul = document.getElementById('search_list');
        ul.innerHTML = "";
        ul.style.border = "2px solid rgba(84,84,84,1)";
        ul.style.borderRadius = "5px";
        ul.style.marginTop = "35px";
        ul.style.padding = "10px";
        ul.style.zIndex = "999";
        ul.style.position = "absolute";
        ul.style.listStyleType = "none";
        ul.style.color = "white";
        ul.style.backgroundColor = "rgba(34,34,34,0.7)";
        fetch('http://95.85.49.133:3000/products')
            .then(function (result) {
                return result.json();
            })
            .then(function (products) {
                products.forEach(function (product) {

                    if (product.Navn.toString().includes(param) || product.vareNr.toString().includes(param) || product.prod_navn.toString().includes(param) || product.kat_navn.toString().includes(param)) {

                        /* if (product.vareNr.toString().includes(param)) {

                        }
                        if (product.prod_navn.toString().includes(param)) {

                        }
                        if (product.kat_navn.toString().includes(param)) {
                            var reg = new RegExp(param, 'gi');
                            // The str parameter references the matched string
                            //    --------------------------------------v
                            var final_str = product.Navn.replace(reg, str => {
                                return '<b>' + str + '</b>'
                            })
                            product.kat_navn.innerHTML = response;
                        } */


                        var li = document.createElement('LI');
                        li.style.margin = "10px";
                        console.log(product);
                        //create the list item
                        //create the image
                        const img = document.createElement('IMG');
                        img.setAttribute('src', "../../img/" + product.billede);
                        img.setAttribute('class', "img-responsive");
                        img.setAttribute('alt', "produkt billede");

                        //create the producer
                        const prod = document.createElement('P');
                        const prodName = document.createTextNode(product.prod_navn);
                        prod.appendChild(prodName);
                        prod.setAttribute('class', "col-xs-12");

                        //create the header
                        const h2 = document.createElement('H2');
                        const navn = document.createTextNode(product.Navn);
                        h2.appendChild(navn);
                        h2.setAttribute('class', "col-xs-12");

                        //create the description
                        const descP = document.createElement('P');
                        const descNode = document.createTextNode(product.Beskrivelse);
                        descP.appendChild(descNode);
                        descP.setAttribute('class', "col-xs-12");

                        //create the vareNr
                        const vareNr = document.createElement('p');
                        const vareNrTxt = document.createTextNode(product.vareNr);
                        vareNr.appendChild(vareNrTxt);
                        vareNr.setAttribute('class', "col-xs-12");

                        //create the lagerstatus
                        const lagerStatus = document.createElement('P');
                        lagerStatus.innerHTML = product.Navn + "er på lager.";
                        lagerStatus.setAttribute('class', "col-xs-12");

                        //create inner div's
                        const div1 = document.createElement('DIV');
                        const div2 = document.createElement('DIV');
                        const div3 = document.createElement('DIV');

                        //prepare inner div's
                        div1.setAttribute('class', "col-xs-12 col-xs-offset-0 col-sm-4 ");
                        div2.setAttribute('class', "col-xs-12 col-xs-offset-0 col-sm-4 ");
                        div3.setAttribute('class', "col-xs-12 col-xs-offset-0 col-sm-4 ");
                        div1.style.padding = "10px";
                        div2.style.padding = "10px";
                        div3.style.padding = "10px";

                        //append inner div's
                        div1.appendChild(img);
                        div1.appendChild(prodName);;
                        div2.appendChild(h2);
                        div2.appendChild(vareNr);
                        div2.appendChild(descP);
                        div3.appendChild(lagerStatus);

                        const innerRow = document.createElement('ROW');
                        const innerDiv = document.createElement('DIV');
                        const wrapA = document.createElement('A');
                        wrapA.setAttribute('href', "sub/products.html?search=" + product.Navn);
                        wrapA.style.padding = "5px";
                        innerDiv.style.backgroundColor = "rgba(34,34,34,1)";
                        innerDiv.style.border = "2px solid orange";
                        innerDiv.style.borderRadius = "5px";
                        innerDiv.style.margin = "10px";
                        innerDiv.setAttribute('class', "col-xs-11");

                        wrapA.appendChild(div1);
                        wrapA.appendChild(div2);
                        wrapA.appendChild(div3);
                        const extraDiv = document.createElement('DIV');
                        extraDiv.setAttribute('class', "col-xs-12");
                        extraDiv.appendChild(wrapA);
                        innerRow.appendChild(extraDiv);
                        innerDiv.appendChild(innerRow);

                        const outerRow = document.createElement('ROW');
                        outerRow.appendChild(innerDiv);

                        // make the product click-able by putting it into an anchor
                        const a = document.createElement('A');
                        a.setAttribute('href', "../products.html?search=" + product.vareNr);
                        a.appendChild(outerRow);

                        //append wrapper row to actual div
                        li.appendChild(a);
                        ul.appendChild(li);
                        ul.innerHTML += "<br/>";
                        // console.log(ul);
                        $('#search_list').show();
                    }
                })
            }).catch(function (error) {
                console.log(error);
            });
    }

    const fyldForside = function () {
        console.log("hello forside!");
        fetch('http://95.85.49.133:3000/index')
            .then(function (result) {
                return result.json();
            })
            .then(function (products) {
                // get slider images
                const firstSlide = document.getElementsByClassName("first-slide")[0];
                const secondSlide = document.getElementsByClassName('second-slide')[0];
                const thirdSlide = document.getElementsByClassName('third-slide')[0];

                //get slider headings
                const firstHeading = document.getElementById('firstH');
                const secondHeading = document.getElementById('secondH');
                const thirdHeading = document.getElementById('thirdH');

                //get slider paragraphs
                const firstP = document.getElementById('firstP');
                const secondP = document.getElementById('secondP');
                const thirdP = document.getElementById('thirdP');

                // get popular items images
                const one = document.getElementById('one');
                const two = document.getElementById('two');
                const three = document.getElementById('three');
                const four = document.getElementById('four');

                //get popular items h4's
                const pop_h1_4 = document.getElementById('firstH4');
                const pop_h2_4 = document.getElementById('secondH4');
                const pop_h3_4 = document.getElementById('thirdH4');
                const pop_h4_4 = document.getElementById('fourthH4');

                //get popular items h6's
                const pop_h1_6 = document.getElementById('firstH6');
                const pop_h2_6 = document.getElementById('secondH6');
                const pop_h3_6 = document.getElementById('thirdH6');
                const pop_h4_6 = document.getElementById('fourthH6');

                //get popular items p's
                const popu1 = document.getElementById('popP1');
                const popu2 = document.getElementById('popP2');
                const popu3 = document.getElementById('popP3');
                const popu4 = document.getElementById('popP4');

                //get special offer image, h2 and h4
                const specialIMG = document.getElementById('offer');
                const specialh2 = document.getElementById('specialh2');
                const specialh4 = document.getElementById('specialh4');

                //SET NEW VALUES

                //slider
                console.log("type of firstSlide = " + typeof firstSlide);
                firstSlide.setAttribute('src', "./../img/" + products[0].billede);
                secondSlide.setAttribute('src', "./img/" + products[1].billede);
                thirdSlide.setAttribute('src', "./img/" + products[2].billede);
                firstHeading.innerHTML = products[0].Navn;
                secondHeading.innerHTML = products[1].Navn;
                thirdHeading.innerHTML = products[2].Navn;
                firstP.innerHTML = products[0].Beskrivelse;
                secondP.innerHTML = products[0].Beskrivelse;
                thirdP.innerHTML = products[0].Beskrivelse;

                //popular items
                one.setAttribute('src', "./img/" + products[3].billede);
                two.setAttribute('src', "./img/" + products[4].billede);
                three.setAttribute('src', "./img/" + products[5].billede);
                four.setAttribute('src', "./img/" + products[6].billede);
                pop_h1_4.innerHTML = products[3].Navn;
                pop_h2_4.innerHTML = products[4].Navn;
                pop_h3_4.innerHTML = products[5].Navn;
                pop_h4_4.innerHTML = products[6].Navn;
                pop_h1_4.innerHTML = products[3].Beskrivelse;
                pop_h2_4.innerHTML = products[4].Beskrivelse;
                pop_h3_4.innerHTML = products[5].Beskrivelse;
                pop_h4_4.innerHTML = products[6].Beskrivelse;
                popu1.innerHTML = products[3].Pris;
                popu2.innerHTML = products[4].Pris;
                popu3.innerHTML = products[5].Pris;
                popu4.innerHTML = products[6].Pris;

                //special offer
                specialIMG.setAttribute('src', "./img/" + products[7].billede);

                specialh2.innerHTML = products[7].Navn;
                specialh4.innerHTML = products[7].Beskrivelse;

            }).catch(function (error) {
                console.log(error);
            });
    }

    const getCategory = function (param) {
        console.log("hello this is finally working getCateory by id!");
        fetch('http://95.85.49.133:3000/getProductsByCategory/' + param)
            .then(function (result) {
                return result.json();
            })
            .then(function (products) {
                products.forEach(function (product) {
                    console.log(product);
                    //create the image
                    const img = document.createElement('IMG');
                    img.setAttribute('src', "../../img/" + product.billede);
                    img.setAttribute('alt', "produkt billede");
                    img.setAttribute('class', "col-xs-12");

                    //create the producer
                    const prod = document.createElement('P');
                    const prodName = document.createTextNode(product.prod_navn);
                    prod.appendChild(prodName);
                    prod.setAttribute('class', "col-xs-12");

                    //create the header
                    const h2 = document.createElement('H2');
                    const navn = document.createTextNode(product.Navn);
                    h2.appendChild(navn);

                    //create the description
                    const descP = document.createElement('P');
                    const descNode = document.createTextNode(product.Beskrivelse);
                    descP.appendChild(descNode);

                    //create the vareNr
                    const vareNr = document.createElement('p');
                    const vareNrTxt = document.createTextNode(product.vareNr);
                    vareNr.appendChild(vareNrTxt);

                    //create the lagerstatus
                    const lagerStatus = document.createElement('P');
                    lagerStatus.innerHTML = product.Navn + "er på lager.";

                    //create the price
                    const price = document.createElement('P');
                    const priceTag = document.createTextNode(product.Pris);
                    price.appendChild(priceTag);

                    //create the shoppingCart button
                    const cart = document.createElement('A');
                    cart.innerHTML = "Læg i kurv";
                    cart.setAttribute('href', "#");
                    cart.style.padding = "5px";
                    cart.style.backgroundColor = "orange";
                    cart.style.color = "white";
                    cart.style.border = "2px solid rgba(34,34,34,1)";
                    cart.style.borderRadius = "5px";

                    //putting it all together

                    //create inner div's
                    const div2 = document.createElement('DIV');
                    const div3 = document.createElement('DIV');
                    const div1 = document.createElement('DIV');

                    //prepare inner div's
                    div2.setAttribute('class', "col-xs-12 col-xs-offset-0 col-sm-4 col-sm-offset-4");
                    div3.setAttribute('class', "col-xs-12 col-xs-offset-0 col-sm-4 col-sm-offset-4");
                    div1.setAttribute('class', "col-xs-12 col-xs-offset-0 col-sm-4 col-sm-offset-4");
                    div1.style.padding = "10px";
                    div2.style.padding = "10px";
                    div3.style.padding = "10px";

                    //append inner div's
                    div1.appendChild(img);
                    div1.appendChild(prodName);;
                    div2.appendChild(h2);
                    div2.appendChild(vareNr);
                    div2.appendChild(descP);
                    div3.appendChild(lagerStatus);
                    div3.appendChild(price);
                    div3.appendChild(cart);

                    //create a row
                    const row_row_row_your_boat = document.createElement('ROW');

                    //create a wrapper_div
                    const wrapperDiv = document.createElement('DIV');
                    wrapperDiv.style.border = "2px solid orange";
                    wrapperDiv.style.borderRadius = "5px";
                    wrapperDiv.setAttribute('class', "col-xs-12");
                    wrapperDiv.style.backgroundColor = "rgba(34,34,34,1)";
                    wrapperDiv.style.padding = "10px";
                    wrapperDiv.style.margin = "10px";

                    //create a wrapperRow
                    const wrapRow = document.createElement('ROW');

                    //document.getElementById('myDiv').innerHTML += product.Navn + " " + product.Pris + " " + product.vareNr + " " + product.Beskrivelse + " " + product.Lagerstatus + " " + product.billede +  "<br/>";

                    //attach 3 divs to inner row
                    row_row_row_your_boat.appendChild(div1);
                    row_row_row_your_boat.appendChild(div2);
                    row_row_row_your_boat.appendChild(div3);

                    //append inner row to wrapper div
                    wrapperDiv.appendChild(row_row_row_your_boat);

                    //append wrapper div to wrapper row
                    wrapRow.appendChild(wrapperDiv);

                    // make the product click-able by putting it into an anchor
                    const a = document.createElement('A');
                    a.setAttribute('href', "../products.html?search=" + product.vareNr);
                    a.appendChild(wrapRow);

                    //append wrapper row to actual div
                    document.getElementById('myDiv').appendChild(a);
                    document.getElementById('myDiv').innerHTML += "<br/>";

                    //pray it works like this now
                })
            }).catch(function (error) {
                console.log(error);
            });
    }

    const visAlleProdukter = function () {
        fetch('http://95.85.49.133:3000/products')
            .then(function (result) {
                return result.json();
            })
            .then(function (products) {
                products.forEach(function (product) {
                    console.log(product);
                    //create the image
                    const img = document.createElement('IMG');
                    img.setAttribute('src', "../img/" + product.billede);
                    img.setAttribute('alt', "produkt billede");
                    img.setAttribute('class', "col-xs-12");

                    //create the producer
                    const prod = document.createElement('P');
                    const prodName = document.createTextNode(product.prod_navn);
                    prod.appendChild(prodName);
                    prod.setAttribute('class', "col-xs-12");

                    //create the header
                    const h2 = document.createElement('H2');
                    const navn = document.createTextNode(product.Navn);
                    h2.appendChild(navn);

                    //create the description
                    const descP = document.createElement('P');
                    const descNode = document.createTextNode(product.Beskrivelse);
                    descP.appendChild(descNode);

                    //create the vareNr
                    const vareNr = document.createElement('p');
                    const vareNrTxt = document.createTextNode(product.vareNr);
                    vareNr.appendChild(vareNrTxt);

                    //create the lagerstatus
                    const lagerStatus = document.createElement('P');
                    lagerStatus.innerHTML = product.Navn + "er på lager.";

                    //create the price
                    const price = document.createElement('P');
                    const priceTag = document.createTextNode(product.Pris);
                    price.appendChild(priceTag);

                    //create the shoppingCart button
                    const cart = document.createElement('A');
                    cart.innerHTML = "Læg i kurv";
                    cart.setAttribute('href', "#");
                    cart.style.padding = "5px";
                    cart.style.backgroundColor = "orange";
                    cart.style.color = "white";
                    cart.style.border = "2px solid rgba(34,34,34,1)";
                    cart.style.borderRadius = "5px";

                    //putting it all together

                    //create inner div's
                    const div2 = document.createElement('DIV');
                    const div3 = document.createElement('DIV');
                    const div1 = document.createElement('DIV');

                    //prepare inner div's
                    div2.setAttribute('class', "col-xs-12 col-xs-offset-0 col-sm-4 col-sm-offset-4");
                    div3.setAttribute('class', "col-xs-12 col-xs-offset-0 col-sm-6 col-sm-offset-3");
                    div1.setAttribute('class', "col-xs-12 col-xs-offset-0 col-sm-2 col-sm-offset-5");
                    div1.style.padding = "10px";
                    div2.style.padding = "10px";
                    div3.style.padding = "10px";

                    //append inner div's
                    div1.appendChild(img);
                    div1.appendChild(prodName);;
                    div2.appendChild(h2);
                    div2.appendChild(vareNr);
                    div2.appendChild(descP);
                    div3.appendChild(lagerStatus);
                    div3.appendChild(price);
                    div3.appendChild(cart);

                    //create a row
                    const row_row_row_your_boat = document.createElement('ROW');

                    //create a wrapper_div
                    const wrapperDiv = document.createElement('DIV');
                    wrapperDiv.style.outline = "2px solid black";
                    wrapperDiv.setAttribute('class', "col-xs-12");
                    wrapperDiv.style.backgroundColor = "rgba(34,34,34,.5)";
                    wrapperDiv.style.padding = "10px";
                    wrapperDiv.style.margin = "10px";

                    //create a wrapperRow
                    const wrapRow = document.createElement('ROW');

                    //document.getElementById('myDiv').innerHTML += product.Navn + " " + product.Pris + " " + product.vareNr + " " + product.Beskrivelse + " " + product.Lagerstatus + " " + product.billede +  "<br/>";

                    //attach 3 divs to inner row
                    row_row_row_your_boat.appendChild(div1);
                    row_row_row_your_boat.appendChild(div2);
                    row_row_row_your_boat.appendChild(div3);

                    //append inner row to wrapper div
                    wrapperDiv.appendChild(row_row_row_your_boat);

                    //append wrapper div to wrapper row
                    wrapRow.appendChild(wrapperDiv);

                    // make the product click-able by putting it into an anchor
                    const a = document.createElement('A');
                    a.setAttribute('href', "../sub/products.html?search=" + product.vareNr);
                    a.appendChild(wrapRow);

                    //append wrapper row to actual div
                    document.getElementById('myDiv').appendChild(a);
                    document.getElementById('myDiv').innerHTML += "<br/>";

                    //pray it works like this now
                })
            }).catch(function (error) {
                console.log(error);
            });
    }

    document.addEventListener('DOMContentLoaded', function () {

        $("input#name").removeAttr('readonly');
        if (window.location.href == "http://localhost:3000/index.html") {
            fyldForside();
        }
        if (window.location.href == "http://localhost:3000/sub/forstaerkere/effekt_forstaerkere.html") {
            getCategory(3);
        }
        if (window.location.href == "http://localhost:3000/sub/forstaerkere/for_forstaerkere.html") {
            getCategory(4);
        }
        if (window.location.href == "http://localhost:3000/sub/forstaerkere/interne_forstaerkere.html") {
            getCategory(6);
        }
        if (window.location.href == "http://localhost:3000/sub/forstaerkere/roer_forstaerkere.html") {
            getCategory(8);
        }
        if (window.location.href == "http://localhost:3000/sub/afspillere/cd_afspillere.html") {
            getCategory(1);
        }
        if (window.location.href == "http://localhost:3000/sub/afspillere/dvd_afspillere.html") {
            getCategory(2);
        }
        if (window.location.href == "http://localhost:3000/sub/afspillere/plade_afspillere.html") {
            getCategory(7);
        }
        if (window.location.href == "http://localhost:3000/sub/hoejtalere/hoejtalere.html") {
            getCategory(5);
        }
        if (getUrlParameter('search')) {
            go_fetch(getUrlParameter('search'));
        } else if (window.location.href == "http://localhost:3000/sub/products.html") {
            visAlleProdukter();
        }
        document.getElementById('search_bar').addEventListener("keyup", function (event) {
            event.preventDefault();
            var txt = document.getElementById('search_bar').value;
            go_fetch_queries(txt);
        });
        document.getElementById('search_bar').addEventListener("input", function (event) {
            event.preventDefault();
            var txt = document.getElementById('search_bar').value;
            go_fetch_queries(txt);
        });


    })
})();

$('body').on('click', function () {
    console.log("function called");
    $('#search_list').hide();
});

$("#contact_button").click(function () {
    if ($("#contact_form").is(":visible")) {
        $("#contact_form").hide();
    } else {
        $("#contact_form").show();
    }
});

document.querySelector('#send').addEventListener('click', (event) => {
    console.log('event ok');
    event.preventDefault();
    for (let i = 0; i < document.querySelector('name').value.length; i++) {
        if (/^[A-Za-z\s]+$/.test(document.querySelector('name').value)) {
            let name = document.querySelector('#name').value.toString();
        } else {
            alert("Input contains illegal characters, please try again");
        }
    }
    let subject = document.querySelector('#subject').value.toString();
    let email = document.querySelector('#email').value.toString();
    if (document.querySelector('#message').value.length <= 1000) {
        let message = document.querySelector('#message').value.toString();
    } else {
        alert("message is too long, maximum of thousand characters");
    }


    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let init = {
        method: 'POST',
        headers: headers,
        body: `{"name":"${name}","subject":"${subject}","email":"${email}","message":"${message}" }`,
        cache: 'no-cache',
        mode: 'cors'
    };

    let request = new Request('http://95.85.49.133:3000/create', init);

    fetch(request)
        .then(response => {
            console.log(response)
        }).catch(err => {
            console.log(err)
        });

});