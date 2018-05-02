---
layout: page
title: Gifs
permalink: /gifs/
---

<script type="text/javascript">
	
var gfyArray = [
{% for gif in site.data.gifs %}
"{{ gif.gfyid }}",
{% endfor %}
];

function getGfyTag(id) {
	var gfy = '<figure class="entry-gfy">';
	gfy += '<div class="gfyitem" data-expand="true" data-autoplay="true" data-id="';
	gfy += id;
	gfy += '" /></figure><br/>';
	return gfy;
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
document.write(getGfyTag(shuffledArray[0]));
document.write(getGfyTag(shuffledArray[1]));
document.write(getGfyTag(shuffledArray[2]));
  
</script>
