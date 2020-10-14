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

var light = true;

document.getElementById("mode").addEventListener("click", () => {
  if (light) {
    document.querySelector("nav").classList.add("dark-nav");
    document.querySelector("body").classList.add("dark-body");
    document.querySelector("input").classList.add("dark-controls");
    document.querySelector("select").classList.add("dark-controls");
    var cards = document.getElementsByClassName("card");

    for (var i = 0; i < 250; i++) {
      cards[i].style.background = "var(--DarkBlueElements)";
      cards[i].style.color = "white";
      cards[i].style.boxShadow = "0px 0px 1px black";
    }
    light = false;
  } else {
    document.querySelector("nav").classList.remove("dark-nav");
    document.querySelector("body").classList.remove("dark-body");
    document.querySelector("select").classList.remove("dark-controls");
    document.querySelector("input").classList.remove("dark-controls");
    var cards = document.getElementsByClassName("card");
    for (var i = 0; i < 250; i++) {
      cards[i].style.background = "white";
      cards[i].style.color = "black";
      cards[i].style.boxShadow = "0px 0px 1px rgb(177, 174, 174)";
    }
    light = true;
  }
});
