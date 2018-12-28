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
	{
		var figure = document.createElement("FIGURE");
		figure.className = "entry-gfy";
		parentDiv.appendChild(figure);
		
		var gfyDiv = document.createElement("div");
		gfyDiv.setAttribute('style', 'position:relative; padding-bottom:56.25%');
		figure.appendChild(gfyDiv)
		var gfyFrame = document.createElement("iframe");
		gfyFrame.setAttribute('src', 'https://gfycat.com/ifr/' + gfyData.gfyid + '?hd=1');
		gfyFrame.setAttribute('frameborder', "0");
		gfyFrame.setAttribute('width', "100%");
		gfyFrame.setAttribute('height', "100%");
		gfyFrame.setAttribute('style', 'position:absolute;top:0;left:0;');
		gfyDiv.appendChild(gfyFrame)
	}
	
	{
		var gfyName = document.createElement("div");
		gfyName.className = "gfy-name";
		gfyName.innerHTML = '"' + gfyData.name + '"';
		parentDiv.appendChild(gfyName);
		
		// Download button
		var gfyDownload = document.createElement("a");
		gfyDownload.className = "gfy-share";
		gfyDownload.href = "https://gfycat.com/gifs/detail/" + gfyData.gfyid;
		gfyDownload.target = "_blank";
		gfyDownload.title = "Download on gfycat";
		gfyName.appendChild(gfyDownload);
		var gfyDownloadIcon = document.createElement("i");
		gfyDownloadIcon.className = "fa fa-download";
		gfyDownload.appendChild(gfyDownloadIcon);
		
		// Twitter link share button
		var twitterIntent = "https://twitter.com/intent/tweet?";
		twitterIntent += "text=" + gfyData.name;
		twitterIntent += "&url={{ site.url }}/gifs/?id=" + gfyData.gfyid;
		twitterIntent += "&via=HiFightTH";
		twitterIntent += "&hashtags=HiFightGIF";
		var twitterShare = document.createElement("a");
		twitterShare.className = "gfy-share";
		twitterShare.href = twitterIntent;
		twitterShare.target = "_blank";
		twitterShare.title = "Share on Twitter";
		gfyName.appendChild(twitterShare);
		var twitterShareIcon = document.createElement("i");
		twitterShareIcon.className = "fa fa-twitter";
		twitterShare.appendChild(twitterShareIcon);
		
		// Direct link share button
		var gfyShare = document.createElement("a");
		gfyShare.className = "gfy-share";
		gfyShare.href = "{{ site.url }}/gifs/?id=" + gfyData.gfyid;
		gfyShare.target = "_blank";
		gfyShare.title = "Direct link";
		gfyName.appendChild(gfyShare);
		var gfyShareIcon = document.createElement("i");
		gfyShareIcon.className = "fa fa-share";
		gfyShare.appendChild(gfyShareIcon);
	}
	
	var br = document.createElement("br");
	parentDiv.appendChild(br);
	
}

function addGfy()
{
	// Check if there is id parameter in the url
	var url_string = window.location.href
	var url = new URL(url_string);
	var id = url.searchParams.get("id");
	for(var j = 0; j < gfyArray.length; j++)
	{
		if(gfyArray[j].gfyid == id)
		{
			var enterDiv = document.getElementById('enter-gfy');
			addGfyData(enterDiv, gfyArray[j]);
			break;
		}
	}
	
	var div = document.getElementById('gfy-list');
	
	var i;
	for(i = index; i < index + max; i++)
	{
		addGfyData(div, shuffledGfyArray[i]);
	}
	index = i;
	
}
