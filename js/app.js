import countries from "./modules/countries.js";

window.printAllCountries = countries.printAllCountries.bind(countries);
window.filterByRegion = countries.filterByRegion.bind(countries);
window.filterByText = countries.filterByText.bind(countries);

var countries_panel = document.getElementById("countries");

const api = async () => {
  try {
    const res = await fetch("https://restcountries.eu/rest/v2/all");
    const data = await res.json();
    countries_panel.innerHTML = countries.printAllCountries(data);
    document.getElementById("region").addEventListener("change", (e) => {
      console.log(e.target.value);
      if (e.target.value != "") {
        countries_panel.innerHTML = countries.filterByRegion(
          data,
          e.target.value
        );
      } else {
        api();
      }
    });
    document.getElementById("txt").addEventListener("keyup", (e) => {
      countries_panel.innerHTML = countries.filterByText(data, e.target.value);
    });
  } catch (error) {
    console.log(error);
  }
};
api();
