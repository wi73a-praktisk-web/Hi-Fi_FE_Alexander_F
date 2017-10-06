# Hi-Fi_FE_Alexander_F
frontend-delen, alexander faisst

# First off, let me say..

#### 1. Jeg fik ikke lavet så meget som jeg håbede. 
* For det første skyldtes dette, at jeg i starten af anden uge næsten var færdig med første del af opgaven..så jeg gik videre med at begynde at bygge et bruger-system. Dog blev jeg bremset lidt af, at jeg ikke på egen hånd kunne finde ud af at implementere et acces-token baseret log-in system, så jeg nåede et punkt hvor jeg ikke rigtigt kunne fortsætte. 
* Pga. kaos og fyringer på arbejde har jeg været lidt ekstra træt, plus ramt af både sygdom og madforgiftelser. 
* Og til sidst, i de sidste få dage, sad jeg først fast i client-side validering, hvilket endda kun endte med at fungere delvist. 
* Så jeg endte med bare at dokumentere hvad havde nået og hvad jeg ikke havde, og så planlægger jeg at kigge på det i løbet af efterårsferien (må se hvor langt jeg kommer med log-in system, men der skulle være rigeligt med andre ting at gå i sving med.)
#### 2. I've made some decisions..
* For det første er min side, i hvert fald som den ser ud lige nu, mindre dynamisk end den ellers kunne have været. Jeg har rent faktisk omkring 10 undersider, som har en statisk header og footer. Selve indholdet fyldes godt nok ud på dynamisk vis, men det kunne stadig gøres meget bedre. 
* Udover det så ser mine fetches og routes ikke helt ud som jeg havde fået det vist (hvilket i nogen grad hænger sammen med at jeg har statiske undersider, og det faktum at jeg har en 1500 linjers JS fil).
* Jeg er godt klar over at dette kunne gøres både anderledes og bedre, og jeg har tænkt mig at gøre noget ved det snarest
* Grunden til at jeg valgte denne opsætning i første omgang er, at jeg i starten af forløbet ikke var helt sikker på hvordan det skulle sættes op, og bare gik med noget der fungerede - omend ikke særlig godt, især ift maintainebility. Så bliver jeg til gengæld nødt til at ændre på det nu. 
* I den færdige løsning ender jeg forhåbentligt med kun nogle meget få fetches og routes, som er meget mere generiske end hvad jeg har nu. Dette kommer muligvis til at inkluderer en række nestede switches, cases og if-else-statements. Dette glæder jeg mig faktisk til, men det bliver en stor bid arbejde, så jeg venter til jeg har tiden og energien til at sætte mig ned længe nok ad gangen til at kunne afslutte arbejdet og ikke ende halvvejs. 

# Features included so far

1. Front page data is filled out dynamically (elements exist, but values are set to database values)
2. Sub-pages contain header and footer, but are otherwise filled out dynamically
3. The search-bar supports instant search results, however this requires for the user to correctly spell the search input paying attention to upper and lower case
4. User can search either for the input directly, or can click on one of the items from the list
5. Items contained in categories and sub-categories are displayed dynamically based on which page on is on
6. I have begun working on user-stuff, amongst others there is a log-in page, which currently serves no other function than redirecting to the registration page though. Log-in is not implemented yet. 
7. The registration page is fully functioning as far as inserting user data goes, however client-side validation only partly works and server-side validation lacks completely. 
8. After having registered, one is being redirected to the profile page, which is then dynamically filled out with the data from the user just created. 
9. Everything is responsive, of cause. However, it currently relies greatly on bootstrap (and an internet connection)

# To Be Done: 

1. Refactoring of css files (naming, structuring, sorting, making everything look nice). Currently there are too many files, which are badly named and none of their content is in any way structured and/or organized. 
    * Structure into styling (colors, fonts etc) and layout (margins, paddings, orientations)
    * Structure into overridings of bootstrap css and my own css
    * Let slider keep it's own, but possibly create some dedicated files for individual parts of the page, like the slider
2. Basically the same goes for the client-side javascript files, especially "products.js" which contains 1500 lines of code, about half of which could probably somehow be summed up in a single helper function
    * Generally refactor client-side fetching -and server-side routing code to make the site more dynamic. 
    * In relation to my search-bar and possibly other functions, the code currently checks for whether or not the search input is even contained in the results. Instead i want to use 'LIKE' on the server-side in my SQL, and then just display whatever input, instead of returning everything and then filtering through it on client-side, which causes a huge performance gap, as well as being bad coding style
    * Refactor and structure JS files. 
        1. Currently i have no page-specific files, i just have a few chaotic ones. 
        2. Also, all pages don't need to point to all files, as they do right now. It would suffice to point to one or two dedicated ones. This would also make things more manageable and provide a better overview. 
4. Add a side-menu to any product-page to make navigation easier
5. Server-side validation for user- and product registry
6. Fiddleing around with saving images locally, but SO close to a solution
8. Thorough documentation of how the fetching and routing works
9. A lot of user stuff, both client -and server side. Amongst others implementing the log-in process and using access tokens to switch between showing the log-in button/link and instead showing buttons/links to ones profile and for logging out again. 
10. So in other words, i know perfectly well what remains to be done, i really just have to get started ...