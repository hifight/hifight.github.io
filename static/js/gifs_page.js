---
---
(function() {
   
		var gfyArray = {{ site.data.gifs | jsonify }};

		function shuffle(sourceArray) {
			for (var i = 0; i < sourceArray.length - 1; i++) {
				var j = i + Math.floor(Math.random() * (sourceArray.length - i));

				var temp = sourceArray[j];
				sourceArray[j] = sourceArray[i];
				sourceArray[i] = temp;
			}
			return sourceArray;
		}

		function addGfyData(parentDiv, gfyData)
		{
			var figure = document.createElement("FIGURE");
			figure.className = "entry-gfy";
			parentDiv.appendChild(figure);
			
			var gfy = document.createElement("div");
			gfy.className = "gfyitem";
			gfy.setAttribute('data-expand', "true");
			gfy.setAttribute('data-autoplay', "true");
			gfy.setAttribute('data-id', gfyData.gfyid);
			figure.appendChild(gfy);
			
			var gfyName = document.createElement("div");
			gfyName.className = "gfy-name";
			gfyName.innerHTML = gfyData.name;
			parentDiv.appendChild(gfyName);
			
			var br = document.createElement("br");
			parentDiv.appendChild(br);
		}

		var shuffledGfyArray = shuffle(gfyArray);
		var div = document.getElementById('gfy-list');
		var i;
		for(i = 0; i < 5; i++)
		{
			addGfyData(div, shuffledGfyArray[i]);
		}
		
})();