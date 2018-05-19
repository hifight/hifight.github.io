---
---
// get gif data and shuffle the array
var gfyArray = {{ site.data.gifs | jsonify }};
var shuffledGfyArray = shuffle(gfyArray);
var index = 0;
var max = 5;

// add gfy on load
addGfy()

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
	gfyName.innerHTML = '"' + gfyData.name + '"';
	parentDiv.appendChild(gfyName);
	
	var br = document.createElement("br");
	parentDiv.appendChild(br);
	
}

function addGfy()
{
	var div = document.getElementById('gfy-list');
	
	// while(div.firstChild){
		// div.removeChild(div.firstChild);
	// }

	var i;
	for(i = index; i < index + max; i++)
	{
		addGfyData(div, shuffledGfyArray[i]);
	}
	index = i;
	
}
