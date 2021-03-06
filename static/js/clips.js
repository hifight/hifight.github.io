---
---

// Check if there is tag parameter in the url
var url_string = window.location.href
var url = new URL(url_string);
var searchTag = url.searchParams.get("tag");
var specifyClipId = url.searchParams.get("id");

var parentDiv = document.getElementById('gfy-list');
var showMorePanel = document.getElementById('showMorePanel');
var showMoreButton = document.getElementById('showMoreButton');
showMoreButton.addEventListener("click", addClips);

var selectorPanel = document.getElementById('selectorPanel');
var sortParam = url.searchParams.get("sort");
var sortSelector = document.getElementById('sortSelector');
var sortBy = "created_at";
if(sortParam == "recent")
{
	sortSelector.value = sortParam;
	sortBy = "created_at";
}
else if(sortParam == "views")
{
	sortSelector.value = sortParam;
	sortBy = "view_count";
}

// Initialize Firebase
var config = {
apiKey: "AIzaSyDkxHrIpkBIVIMSuR3Zkr0_X2oiyyyUdAM",
authDomain: "hifight-9a09c.firebaseapp.com",
databaseURL: "https://hifight-9a09c.firebaseio.com",
projectId: "hifight-9a09c",
storageBucket: "hifight-9a09c.appspot.com",
messagingSenderId: "236845143850"
};
var app = firebase.initializeApp(config);
db = firebase.firestore(app);

var lastDocument = null;

if(specifyClipId != null)
{
	showMorePanel.innerHTML = "";
	selectorPanel.innerHTML = "";
	
	var clipRef = db.collection("clips");
	var query = clipRef.where("id", "==", specifyClipId).limit(1);
				
	if(query != null)
	{
		query.get().then(function(querySnapshot) {		
			querySnapshot.forEach(function(doc) {
				//console.log(doc.id, " => ", doc.data());
				addClipData(doc);
			});
		})
		.catch(function(error) {
			console.log("Error getting documents: ", error);
		});
	}
	
}
else
{
	addClips();
}

function addClips()
{
	var clipNum = 5;
	var clipRef = db.collection("clips");
	var query = null;
	if(searchTag != null)
	{
		searchTag = searchTag.toLowerCase();
		// if there is last document then query next documents
		if(lastDocument != null)
		{
			query = clipRef.where("tags", "array-contains", searchTag)
				.orderBy(sortBy, "desc")
				.startAfter(lastDocument).limit(clipNum);
				
		}
		// First add when the page is loaded
		else
		{
			query = clipRef.where("tags", "array-contains", searchTag)
				.orderBy(sortBy, "desc").limit(clipNum);
		}
	}
	else
	{
		// if there is last document then query next documents
		if(lastDocument != null)
		{
			query = clipRef.orderBy(sortBy, "desc")
				.startAfter(lastDocument).limit(clipNum);
		}
		// First add when the page is loaded
		else
		{
			query = clipRef.orderBy(sortBy, "desc").limit(clipNum);
		}
	}
	
	if(query != null)
	{
		query.get().then(function(querySnapshot) {					
			var addedClip = 0;
			querySnapshot.forEach(function(doc) {
				//console.log(doc.id, " => ", doc.data());
				addClipData(doc);
				addedClip += 1;
			});
			
			if(addedClip == 0)
			{
				showMoreButton.disabled = true;
				showMoreButton.innerHTML = "No Results";
			}
		})
		.catch(function(error) {
			console.log("Error getting documents: ", error);
		});
	}
	
}

function addClipData(doc)
{
	lastDocument = doc;
	var clipData = doc.data();
	{
		var figure = document.createElement("FIGURE");
		figure.className = "entry-gfy";
		parentDiv.appendChild(figure);
		
		var gfyDiv = document.createElement("div");
		gfyDiv.setAttribute('style', 'position:relative; padding-bottom:56.25%');
		figure.appendChild(gfyDiv)
		var clipFrame = document.createElement("iframe");
		clipFrame.setAttribute('src', clipData.embed_url + '&autoplay=false');
		clipFrame.setAttribute('frameborder', "0");
		clipFrame.setAttribute('width', "100%");
		clipFrame.setAttribute('height', "100%");
		clipFrame.setAttribute('allowfullscreen', true);
		clipFrame.setAttribute('autoplay', false);
		clipFrame.setAttribute('style', 'position:absolute;top:0;left:0;');
		gfyDiv.appendChild(clipFrame);
	}
	
	{
		var clipComment = document.createElement("div");
		clipComment.className = "clip-comment";
		clipComment.innerHTML = clipData.comment;
		parentDiv.appendChild(clipComment);
		
		// Direct link share button
		var clipShare = document.createElement("a");
		clipShare.className = "gfy-share";
		clipShare.href = "{{ site.url }}/clips/?id=" + clipData.id;
		clipShare.target = "_blank";
		clipShare.title = "Direct link";
		clipComment.appendChild(clipShare);
		var clipShareIcon = document.createElement("i");
		clipShareIcon.className = "fa fa-share";
		clipShare.appendChild(clipShareIcon);
		
		// Twitter link share button
		var twitterIntent = "https://twitter.com/intent/tweet?";
		twitterIntent += "text=" + clipData.comment;
		twitterIntent += "&url={{ site.url }}/clips/?id=" + clipData.id;
		twitterIntent += "&via=HiFightTH";
		var twitterShare = document.createElement("a");
		twitterShare.className = "gfy-share";
		twitterShare.href = twitterIntent;
		twitterShare.target = "_blank";
		twitterShare.title = "Share on Twitter";
		clipComment.appendChild(twitterShare);
		var twitterShareIcon = document.createElement("i");
		twitterShareIcon.className = "fa fa-twitter";
		twitterShare.appendChild(twitterShareIcon);
	}
	
	{
		var clipDate = document.createElement("div");
		clipDate.className = "clip-date";
		clipDate.innerHTML = new Date(clipData.created_at).toLocaleString();
		parentDiv.appendChild(clipDate);
	}
	
	{
		var tagList = document.createElement("div");
		tagList.className = "clip-tags";
		parentDiv.appendChild(tagList);
		for(i = 0; i < clipData.tags.length; i++)
		{
			var tag = document.createElement("a");
			tag.className = "clip-tag";
			if(sortParam != null)
			{
				tag.setAttribute('href', "{{ site.url }}/clips/?sort=" + sortParam + "&tag=" + clipData.tags[i]);
			}
			else
			{
				tag.setAttribute('href', "{{ site.url }}/clips/?tag=" + clipData.tags[i]);
			}
			tag.innerHTML = clipData.tags[i];
			tagList.appendChild(tag);
		}
	}
	
	var hr = document.createElement("hr");
	parentDiv.appendChild(hr);
	
}

function onSortSelected()
{
	if(searchTag != null)
	{
		window.open("{{ site.url }}/clips/?tag=" + searchTag + "&sort=" + sortSelector.value,"_self");
	}
	else
	{
		window.open("{{ site.url }}/clips/?sort=" + sortSelector.value,"_self");
	}
}

