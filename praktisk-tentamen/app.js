/* Skriv din kod här */

const URL = 'https://restcountries.eu/rest/v2/all';

// Fetchar API
fetch(URL).then(
    function(res){
        if(res.status === 404){ // om jag får status kod 404 från API:et så slänger jag ett fel
            throw 'Not found';
        }
        else{
            return res.json(); // Om jag inte får något fel så formatera jag den data jag behöver 
        }
    }
    ).then(
        function(data){
            let länder = []; // land array där jag lägger in alla instanser 
            // randomizar och pushar in i länder arrayn
            for (let i = 0; i < 3; i++) {
                let rand = Math.floor(Math.random()* data.length);
                länder.push(
                    new Land(data[rand].name, data[rand].timezones[0], data[rand].flag) // jag skapar en instance av Land konstruktorn 
                );
            }
            // hämtar alla DOM element
            let flagElem = document.querySelectorAll('img');
            let flagNameElem = document.querySelectorAll('h1');
            let flagTime = document.querySelectorAll('h3');

            // loopar igenom länder arrayn
            for (let i = 0; i < länder.length; i++) {
                länder[i].display(flagElem[i], flagNameElem[i], flagTime[i]); // kör display method
            }
        }
    //felhantering
    ).catch(
        function(err){
            if(err === 'Not found'){
                console.log('Det hittades inte');
            }      
        }
    )

// Land konstruktorn
function Land(land, timezone, flag){
    this.name = land;
    this.timezone = timezone;
    this.flag = flag;
}

// Skapar en prototype method som renderar ut allt i DOMEN & kalkylerar rätt tid för varje land
Land.prototype.display = function(flagElem, nameElem, timeElem){
    flagElem.src = this.flag; // flagga 
    nameElem.textContent = this.name; // land 

    // hämtar ut min locala tid
    let date = new Date();
    let hourSwe = date.getUTCHours();
    let minutesSwe = date.getMinutes();
    
    // Jag "slicar" ut den delen av tidzonen jag behöver för att göra min kalkyl längre ner
    let hoursUTC = Number((this.timezone).substr(3, 3));
    let finalTimeHour; 

    // Om tiden överstiger 24 så startar jag om "dygnet" så det blir rätt 
    if ((hoursUTC + hourSwe) >= 24) {
        finalTimeHour =  Math.abs(((hoursUTC + hourSwe) - 24));
    } else {
        finalTimeHour = (hoursUTC + hourSwe);
    }

    // om något land får tid i timmar t.ex. 1:30 så lägger jag en nolla framför -> 01:30
    if (String(finalTimeHour).length <= 1) {
        finalTimeHour = `0${String(finalTimeHour)}`;
    }
    
    let countryTime = `${finalTimeHour}:${minutesSwe}`; // formatera tid
    timeElem.textContent = countryTime; // tid
}
