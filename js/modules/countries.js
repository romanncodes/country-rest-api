export default {
  light: true,
  printAllCountries: function (data) {
    var card = "";
    data.forEach((item) => {
      card += this.card_country(item);
    });
    return card;
  },

  filterByRegion: function (data, region) {
    var card = "";
    data
      .filter((country) => country.region === region)
      .forEach((item) => {
        card += this.card_country(item);
      });
    return card;
  },
  filterByText(data, text) {
    var card = "";
    data
      .filter((country) => country.name.toLowerCase().indexOf(text) != -1)
      .forEach((item) => {
        card += this.card_country(item);
      });
    return card;
  },
  card_country: function (country) {
    return `
      <div onclick="country_event('${country.name}')" class="card">
        <div class="img-container">
        <img  src="${country.flag}" alt="" />
        </div>
        <h4>${country.name}</h4>
        <p>
          Population:${country.population} <br/>
          Region: ${country.region}<br/>
          Capital: ${country.capital}
        </p>
      </div>    
    `;
  },
  country_event: async function (name) {
    document.getElementById("btn-back").style.display = "block";

    document.getElementById("txt").style.display = "none";
    document.getElementById("region").style.display = "none";
    const res = await fetch("https://restcountries.com/v3.1/all");
    const data = await res.json();
    var country_array = data.filter((country) => country.name === name);
    this.paint_detail(country_array[0]);
    console.log(country_array[0]);
  },

  paint_detail(country) {
    var panel = document.getElementById("countries");
    panel.innerHTML = `
      
        <div class="content-detail">
          <div class="img-detail">
            <img  src="${country.flag}" alt="" />
          </div>
          <div id="text-detail" class="text-detail">
            <div class="text-detail-left">
              <h3>${country.name}</h3>
              <p style="padding:0px">Native Name: ${country.nativeName}</p>
              <p style="padding:0px">Population: ${country.population}</p>
              <p style="padding:0px">Region: ${country.region}</p>
              <p style="padding:0px">Sub Region: ${country.subregion}</p>
              <p style="padding:0px">Capital: ${country.capital}</p>
            </div>
            <div class="text-detail-right">
              <h3>&nbsp;</h3>
              <p style="padding:0px">Top Level Domain: ${
                country.topLevelDomain
              }</p>
              <p style="padding:0px">Currencies: ${country.currencies.map(
                (xx) => xx.name
              )}</p>
              <p style="padding:0px">Languajes: ${country.languages.map(
                (xx, index) => xx.name
              )}</p>
              
            </div>

          </div>
        </div>
      
    `;
    if (this.light) {
      document.getElementById("text-detail").style.color = "black";
    } else {
      document.getElementById("text-detail").style.color = "white";
    }
  },
};
