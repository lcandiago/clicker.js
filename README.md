# clicker.js
Transform your website into a "Clicker Game" like Cookie Clicker.

# Informations
For now, only on resolutions above 767px.

# Documentation
Just change "yourID" for the element ID you want to Click.

```sh
  function setConfigs(){
		turnClickable("yourID1");
		turnClickable("YourID2");
		turnClickable("YourID3");
		turnClickable("YourID...");

		var botao = document.getElementById("on_off_button");
		botao.getElementsByTagName("p")[0].innerHTML = "Stop the Clicks!!";
		botao.addEventListener("click", function() {location.reload()}, false);
	}
```

# Example
http://www.vagabeatles.com.br - Turn on the Clicker Mode at the top-right button "Let's Click".
