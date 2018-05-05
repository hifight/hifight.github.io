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

		var shuffledGfyArray = shuffle(gfyArray);
		setGfy(shuffledGfyArray[0]);
		
		var shuffledPlayerArray = shuffle(playerArray);
		var div = document.getElementById('player-list');
		var i;
		for(i = 0; i < 3; i++)
		{
			addPlayerData(div, shuffledPlayerArray[i]);
		}
		
})();