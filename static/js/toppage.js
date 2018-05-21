---
---
(function() {
   
		var gfyArray = {{ site.data.gifs | jsonify }};
		var playerArray = {{ site.data.players | jsonify }};

		function setGfy(gfyData) {
			var gfy = document.getElementById("top-gfy");
			gfy.setAttribute('data-id', gfyData.gfyid);
			document.getElementById("top-gfy-name").innerHTML = '"' + gfyData.name + '"';
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
			gfyShare.href = "{{ site.url }}?id=" + gfyData.gfyid;
			gfyShare.target = "_blank";
			gfyName.appendChild(gfyShare);
			
			var gfyShareIcon = document.createElement("i");
			gfyShareIcon.className = "fa fa-share";
			gfyShare.appendChild(gfyShareIcon);
			
			var br = document.createElement("br");
			parentDiv.appendChild(br);
			
		}
		
		function shuffle(sourceArray) {
			for (var i = 0; i < sourceArray.length - 1; i++) {
				var j = i + Math.floor(Math.random() * (sourceArray.length - i));

				var temp = sourceArray[j];
				sourceArray[j] = sourceArray[i];
				sourceArray[i] = temp;
			}
			return sourceArray;
		}

		function addPlayerData(listGroupElement, playerData)
		{
			var listGroupItem = document.createElement("div");
			listGroupItem.className = "list-group-item";
			listGroupElement.appendChild(listGroupItem);
			
			var rowActionPrimary = document.createElement("div");
			rowActionPrimary.className = "row-action-primary";
			listGroupItem.appendChild(rowActionPrimary);
			
			var picLink = document.createElement("a");
			picLink.href = "{{ site.url }}/player/" + playerData.link;
			rowActionPrimary.appendChild(picLink);
			
			var picImg = document.createElement("img");
			picImg.src = "/static/img/player/" + playerData.link + ".jpg";
			picImg.className = "row-picture";
			picLink.appendChild(picImg);
			
			var rowContent = document.createElement("div");
			rowContent.className = "row-content";
			listGroupItem.appendChild(rowContent);
			
			var listGroupItemHeading = document.createElement("h4");
			listGroupItemHeading.className = "list-group-item-heading";
			rowContent.appendChild(listGroupItemHeading);
			
			var headName = document.createElement("a");
			headName.href = "{{ site.url }}/player/" + playerData.link;
			headName.innerHTML = playerData.name;
			listGroupItemHeading.appendChild(headName);
			
			var leastContent = document.createElement("div");
			leastContent.className = "least-content";
			leastContent.innerHTML = playerData.hifight;
			listGroupItemHeading.appendChild(leastContent);
			
			var content = document.createElement("p");
			content.className = "list-group-item-text";
			content.innerHTML = playerData.content.split(" ").splice(0,25).join(" ") + "...";
			rowContent.appendChild(content);
			
			var listGroupSeparator = document.createElement("div");
			listGroupSeparator.className = "list-group-separator";
			listGroupElement.appendChild(listGroupSeparator);
		}

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
		
		var shuffledGfyArray = shuffle(gfyArray);
		var gfydiv = document.getElementById('top-gfy');
		if(enterGfy != null)
			addGfyData(gfydiv, enterGfy)
		else
			addGfyData(gfydiv, shuffledGfyArray[0])
		//setGfy(shuffledGfyArray[0]);
		
		var shuffledPlayerArray = shuffle(playerArray);
		var div = document.getElementById('player-list');
		var i;
		for(i = 0; i < 3; i++)
		{
			addPlayerData(div, shuffledPlayerArray[i]);
		}
		
})();