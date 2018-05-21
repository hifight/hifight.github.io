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
	
	var gfyShare = document.createElement("a");
	gfyShare.className = "gfy-share";
	gfyShare.href = "{{ site.url }}/gifs/?id=" + gfyData.gfyid;
	gfyShare.target = "_blank";
	gfyName.appendChild(gfyShare);
	
	var gfyShareIcon = document.createElement("i");
	gfyShareIcon.className = "fa fa-share";
	gfyShare.appendChild(gfyShareIcon);
	
	var br = document.createElement("br");
	parentDiv.appendChild(br);
	
}

function addGfy()
{
	// Check if there is id parameter in the url
	var url_string = window.location.href
	var url = new URL(url_string);
	var id = url.searchParams.get("id");
	var enterGfy = null;
	for(var j = 0; j < gfyArray.length; j++)
	{
		if(gfyArray[j].gfyid == id)
		{
			enterGfy = gfyArray[j];
		}
	}
	
	var div = document.getElementById('gfy-list');
	
	var i;
	for(i = index; i < index + max; i++)
	{
		// Set the first gfy to id parameter
		if(enterGfy != null && i == 0)
			addGfyData(div, enterGfy);
		else
			addGfyData(div, shuffledGfyArray[i]);
	}
	index = i;
	
}
