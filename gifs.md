---
layout: page
title: GIFs
permalink: /gifs/
---

<h2>Random GIFs</h2>

<script type="text/javascript">
	
	var gfyArray = {{ site.data.gifs | jsonify }};


	function getGfyTag(id) {
		var gfy = '<figure class="entry-gfy">';
		gfy += '<div class="gfyitem" data-expand="true" data-autoplay="true" data-id="';
		gfy += id;
		gfy += '" /></figure>';
		return gfy;
	}

	function getGfyName(name)
	{
		var text = '<div class="gfy-name">"';
		text += name
		text += '"</div><br/>';
		return text;
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

	var shuffledArray = shuffle(gfyArray);
	document.write(getGfyTag(shuffledArray[0].gfyid));
	document.write(getGfyName(shuffledArray[0].name));
	document.write(getGfyTag(shuffledArray[1].gfyid));
	document.write(getGfyName(shuffledArray[1].name));
	document.write(getGfyTag(shuffledArray[2].gfyid));
	document.write(getGfyName(shuffledArray[2].name));
	document.write(getGfyTag(shuffledArray[3].gfyid));
	document.write(getGfyName(shuffledArray[3].name));
	document.write(getGfyTag(shuffledArray[4].gfyid));
	document.write(getGfyName(shuffledArray[4].name));
	  
</script>


Refresh to shuffle GIFs

If you have any suggestions or any gif you want me to add, 
please DM <a href="https://twitter.com/HiFightTH">@HiFightTH</a>.