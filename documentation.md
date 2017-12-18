# Client-Server Application - Project Hi-Fi

## Opgavebeskrivelse

Du skal fremstille en webapplikation til en HI-FI webbutik, som præsenterer butikkens produkter inddelt efter kategori. Brugeren af sitet skal nemt og overskueligt kunne finde rundt i de forskellige produkter og kunne fremsøge produkter vha. søgeord.
Du skal fremstille et administrationsmodul til din HI-FI webbutik. Modulet skal være beskyttet af et login-system, så kun butikkens administrator(er) har adgang til modulet.
Du bestemmer og designer selv brugergrænsefladen til systemet.
Alle funktioner skal analyseres og beskrives i en kravspecifikation, som du skal udvikle efter.

### Systemets primære funktioner:

* Oprettelse af nye produkter
* Redigering af eksisterende produkter, herunder priser
* Fjernelse af produkter i systemet

### Systemets sekundære funktioner:

* Profilside, herunder skift password
* Brugeradministration - oprettelse og administration af brugere - evt. roller
* Tilpasning af indhold på forside og kontaktside
* Tilpasning af menu
* Administration af kontakthenvendelser

## Tekniske Krav

### Front-End

Henter data igennem et API fra Back-end delen vha. ```fetch().then().catch()``` og præsenterer så det hentede data igennem user interfacet. 

1. Anvendte Teknologier
    * HTML
    * CSS
    * JavaScript
    * Node.js
    * BootsTrap

### Back-End 

Manipulerer den dynamiske data som ligger i den bagvedliggende database ved en række SQL udtræk. De forskellige operationer gøres tilgængelige i form af en række routes, som kan kaldes efter behov. 

1. Anvendte Teknologier
    * JavaScript
    * Node.js
    * SQL

## Sider og indhold
Det følgende afsnit beskriver hvilke sider systemet skal indeholde, samt sidernes formål, dvs. krav til hvad de enkelte sider skal indeholde. 

* Forside 
* Produktside
* Kontaktside 
 
#### Forsiden 
* Forsidetekst og billeder af produkter
* Visning af ét eller flere udvalgte produkter (kan være de senest oprettede, et tilfældigt produkt eller andet du finder relevant)
 
#### Produktsiden
* Visning af alle produkter inden for en bestemt kategori
* Visning af ét produkt ved klik på et produkt fra listen
* Visning af produkter efter søgning

Alle produkter hentes via et API og udskrives med fetch. Over listen af produkter vises kategoriens titel.
 
#### Kontaktsiden 
* Kontaktsiden indeholder informationer om HI-FI butikken samt en kontaktformular.
* Formulardata indsættes i databasen via et API
* Formularfelter valideres som minimum vha. HTML5 validering
* Besked til brugeren om at formularen er sendt og modtaget
 
#### Alle sider 
* Menu 
* Fritekst-søgefunktion til produkter og producenter (visning på produktsiden) 
* Footer med kontaktinfo 

# Workflow TaskList

### Det følgende afsnit beskriver, hvilke opgaver der er planlagte, hvilke der er påbegyndte og hvilke der er færdigt afsluttede. 

Her betyder et kryds, at opgaven er påbagyndt, og to at den er afsluttet. 

## CRUD
### Products [validation and documentation remains]
	view 		                                    [x][x]
	edit 		                                    [x][x]
    validate input to be updated (client-side) - edit          [x][x] (polishing remains to be done)
    validate input to be updated (server-side) - edit         [x][x] (polishing remains to be done)
	edit update 	                                    [x][x]
	delete 		                                    [x][x]
	add new view 	                                    [x][x]
    validate input to be inserted (client-side) - add new        [x][x] (polishing remains to be done)
    validate input to be inserted (server-side) - add new        [x][x] (polishing remains to be done)
	add new insert 	                                    [x][x]
### Users
	view 		                            [x][x]
	edit 		                            [x][x]
    validate input to be updated (client-side)  [x][]
    validate input to be updated (server-side)  [x][]
	edit update 	                            [x][x]
	delete 		                            [x][]
    validate input to be inserted (client-side) [x][]
    validate input to be inserted (server-side) [x][]
	add new view 	                            [x][x]
	add new insert 	                            [x][x]
### Producers
	view 	                                    [x][x]
	edit 		                            [x][x]
    validate input to be updated (client-side)  [x][]
    validate input to be updated (server-side)  [][]
	edit update 	                            [x][x]
	delete 		                            [x][x]
    validate input to be updated (client-side)  [x][]
    validate input to be updated (server-side)  [][]
	add new view 	                            [x][x]
	add new insert 	                            [x][x]
### Categories
	view 		                            [x][x]
	edit 		                            [x][x]
    validate input to be updated (client-side)  [x][]
    validate input to be updated (server-side)  [][]
	edit update                                 [x][x]
	delete 		                            [x][x]
    validate input to be updated (client-side)  [x][]
    validate input to be updated (server-side)  [][]
	add new view 	                            [x][x]
	add new insert 	                            [x][x]

## Integrate Image Solution [documentation remains]
### Products
    view 		[x][x]
    edit 		[x][x]
    edit update 	[x][x]
    delete 		[x][x]
    add new view 	[x][x]
    add new insert 	[x][x]
### Users
    view 		[x][x]
    edit 		[x][x]
    edit update 	[x][x]
    delete 		[x][x]
    add new view 	[x][x]
    add new insert 	[x][x]
### Producers
    view 		[][]
    edit 		[][]
    edit update 	[][]
    delete 		[][]
    add new view 	[][]
    add new insert 	[][]
### Categories
    view 		[][]
    edit 		[][]
    edit update 	[][]
    delete 		[][]
    add new view 	[][]
    add new insert 	[][]
### Profile Page
    view old        [x][x]
    view old edit   [x][x]
    view new        [x][x]
    update new      [x][x]

### State_div
    implement view image            [x][x]
    implement log_out button        [x][x]
    implement profile_page anchor   [x][x]
    implement control panel anchor  [x][x]

### Site Pages
    Front Page [][]
    Product Page(s) [][]
    Contact Page [][]
    Other Page(s) [][]
## Roles:
    DataBase    [x][]
	Everything  [][]

## Other
    Documentation 	                                                [x][]
    Splitting routes and client-side code into seperate files 	[x][]
    Polishing 	                                                [x][]