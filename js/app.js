import countries from "./modules/countries.js";

window.printAllCountries = countries.printAllCountries.bind(countries);
window.filterByRegion = countries.filterByRegion.bind(countries);
window.filterByText = countries.filterByText.bind(countries);
window.country_event = countries.country_event.bind(countries);

var countries_panel = document.getElementById("countries");

const api = async () => {
  try {
    const res = await fetch("https://restcountries.com/v3.1/all");
    const data = await res.json();
    countries_panel.innerHTML = countries.printAllCountries(data);
    document.getElementById("region").addEventListener("change", (e) => {
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
    document.getElementById("btn-back").addEventListener("click", (e) => {
      document.getElementById("btn-back").style.display = "none";
      document.getElementById("txt").style.display = "block";
      document.getElementById("region").style.display = "block";
      countries_panel.innerHTML = countries.printAllCountries(data);
      if (countries.light) {
        modeLight();
      } else {
        modeDark();
      }
    });
  } catch (error) {
    console.log(error);
  }
};
api();

//var light = true;

document.getElementById("mode").addEventListener("click", () => {
  if (countries.light) {
    modeDark();
    countries.light = false;
  } else {
    modeLight();
    countries.light = true;
  }
});

function modeDark() {
  document.querySelector("nav").classList.add("dark-nav");
  document.querySelector("body").classList.add("dark-body");
  document.querySelector("input").classList.add("dark-controls");
  document.querySelector("select").classList.add("dark-controls");
  var btn = document.getElementById("btn-back");

  btn.style.background = "var(--DarkBlueElements)";
  btn.style.color = "white";
  btn.style.boxShadow = "0px 0px 1px black";
  var cards = document.getElementsByClassName("card");
  if (cards.length != 0) {
    for (var i = 0; i < cards.length; i++) {
      cards[i].style.background = "var(--DarkBlueElements)";
      cards[i].style.color = "white";
      cards[i].style.boxShadow = "0px 0px 1px black";
    }
  }
  var textDetail = document.getElementById("text-detail");
  if (textDetail != null) {
    textDetail.style.color = "white";
  }
}

function modeLight() {
  document.querySelector("nav").classList.remove("dark-nav");
  document.querySelector("body").classList.remove("dark-body");
  document.querySelector("select").classList.remove("dark-controls");
  document.querySelector("input").classList.remove("dark-controls");
  var btn = document.getElementById("btn-back");

  btn.style.background = "white";
  btn.style.color = "black";
  btn.style.boxShadow = "0px 0px 1px rgb(177, 174, 174)";

  var cards = document.getElementsByClassName("card");
  if (cards.length != 0) {
    for (var i = 0; i < 250; i++) {
      cards[i].style.background = "white";
      cards[i].style.color = "black";
      cards[i].style.boxShadow = "0px 0px 1px rgb(177, 174, 174)";
    }
  }
  var textDetail = document.getElementById("text-detail");
  if (textDetail != null) {
    textDetail.style.color = "black";
  }
}
