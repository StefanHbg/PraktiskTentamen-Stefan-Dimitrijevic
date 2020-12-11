/* Skriv din kod här */

const URL = 'https://restcountries.eu/rest/v2/all';
// Fetchar API
fetch(URL).then(
        function(res){
            if(res.status === 404){
                throw 'Not found';
            }
            else{
                return res.json();
            }
        }
    ).then(
        function(data){
            let länder = [];
            // randomizar och pushar in i arr
            for (let i = 0; i < 3; i++) {
                let rand = Math.floor(Math.random()* data.length);
                länder.push(
                    new Land(data[rand].name, data[rand].timezones[0], data[rand].flag)
                );
            }
            // hämtar alla DOM element
            let h1 = document.querySelectorAll('h1');
            let tid = document.querySelectorAll('h3');
            let imgTagg = document.querySelectorAll('img');
            let section = document.querySelectorAll('section');

            for (let i = 0; i < 3; i++) {
                // kör displlay method
                länder[i].display(imgTagg[i], h1[i], tid[i], section[i]);
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
function Land(land, timezone, flagga){
    this.name = land;
    this.timezone = timezone;
    this.flag = flagga;
}
// proto method som renderar ut allt i DOMEN
Land.prototype.display = function(flagga, landNamn, elementTid, section){
    landNamn.textContent = this.name;
    flagga.src = this.flag;
    let tidzon = this.timezone.slice(3, 6);
    var date = new Date(`December 11, 2020, 10:00:00 GMT${tidzon}00`);
    let timme = date.getUTCHours();
    let min = date.getUTCMinutes();
    let tid = `${timme}:${min}0`;
    
    elementTid.textContent = tid;
    section.appendChild(flagga);
    section.appendChild(landNamn);
    section.appendChild(elementTid);
}
