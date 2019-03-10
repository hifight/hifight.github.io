
function clipSearch(ele) 
{
	if(ele.value == null || ele.value == "")
		return;
	
	if(event.key === 'Enter') 
	{
		window.open(window.baseurl + "/clips/?tag=" + ele.value,"_self");
	}
}