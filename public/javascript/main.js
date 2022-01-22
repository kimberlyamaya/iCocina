function recipeLookup(event) {
  event.preventDefault();

  var selectCategory = document.querySelector('select[name="cuisine"]').value;
  var selectDifficulty = document.querySelector(
    'select[name="difficulty"]'
  ).value;

  window.location.href = "/recipe/" + selectCategory + "/" + selectDifficulty;

  //   fetch("/recipe/" + selectCategory + "/" + selectDifficulty);
  //return response.json()
  /*}).then (data => {
        //document.location.replace("/api/recipes/"+selectCategory+"/"+selectDifficulty);
        console.log(data)
    })*/
}

document.querySelector(".searchField").addEventListener("submit", recipeLookup);

// document
//   .querySelector("#submit-recipe")
//   .addEventListener("click", recipeLookup);
