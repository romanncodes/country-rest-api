export default {
  printAllCountries: function (data) {
    var card = "";
    console.log(data);
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
      <div class="card">
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
};
