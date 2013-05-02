// JavaScript Document
// Alec Shallenberger
// May 1, 2013
// Term 1304
// VFW Project4

window.addEventListener("DOMContentLoaded", function(){
		
	
	function $(x){
		var theElement = document.getElementById(x);
		return theElement;
	}
	
	function makeSpec(){
		var formTag = document.getElementsByTagName("form");	
			selectLi = $('select');
			makeSelect = document.createElement('select');
			makeSelect.setAttribute("id", "holiday");
		for (var i=0, j=specHoliday.length; i<j; i++){
			var makeOption = document.createElement('option');
			var optText = specHoliday[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}
		selectLi.appendChild(makeSelect); 	
	}

	
	function getCheckboxValue(){
		var checkboxes = document.getElementById("checklistForm").dishes;
		for(i=0, j=checkboxes.length; i<j; i++){
			if(checkboxes[i].checked){
				sideValue = checkboxes[i].value;
			}
		}
	}
	
				
	function toggleControls(n){
		switch(n){
			case "on":
				$('checklistForm').style.display = "none";
				$('clear').style.display = "inline";
				$('displayLink').style.display = "none";
				$('addNew').style.display = "inline";
				break;
			case "off":
				$('checklistForm').style.display = "block";
				$('clear').style.display = "inline";
				$('displayLink').style.display = "inline";
				$('addNew').style.display = "none";
				$('items').style.display = "none";
				break;
			default:
				return false;
		}	
	}
	
	
	function storeData(key){
		if(!key){
			var id				= Math.floor(Math.random()*14685325);
		}else{
			id = key;
		}
		getCheckboxValue();
		var item			= {};
			item.holigroup	= ["Holiday:", $('holiday').value];
			item.app		= ["Appitizer:", $('app').value];
			item.mname		= ["Main Meal:", $('mname').value];	
			item.side		= ["Sides Dishes:", sideValue];
			item.date		= ["Date:", $('date').value];
			item.amofpeople	= ["Amount of People:", $('amofpeople').value];
			item.notes		= ["Notes:", $('notes').value];
		localStorage.setItem(id, JSON.stringify(item));
		alert("Checklist Saved!");
	}
	
	function getData(){
		toggleControls("on");
		if(localStorage.length === 0){
			alert("There is no data in Local Storage so default data was added.");
			autoFillData();
		}
		
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$('items').style.displau = "block";
		for(var i=0, len=localStorage.length; i<len; i++){
			var makeli = document.createElement('li');
			var linksLi = document.createElement('li');
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);
			var makeSubList = document.createElement('ul');
			makeli.appendChild(makeSubList);
			getImage(obj.holigroup[1], makeSubList);
			for(var k in obj){
				var makeSubli = document.createElement('li');
				makeSubList.appendChild(makeSubli);
				var optSubText = obj[k][0]+" "+obj[k][1];
				makeSubli.innerHTML = optSubText;
				makeSubList.appendChild(linksLi);
			}
			makeItemLinks(localStorage.key(i), linksLi);
		}
	}
	
	function getImage(holiName, makeSubList){
		var imgLi = document.createElement('li');
		makeSubList.appendChild(imgLi);
		var newImage = document.createElement('img');
		var setSrc = newImage.setAttribute("src", "Images/"+ holiName + ".png");
		imgLi.appendChild(newImage);	
	}
	
	function autoFillData(){
		for(var k in json){
			var id	= Math.floor(Math.random()*14685325);
			localStorage.setItem(id, JSON.stringify(json[k]));
		}
	}
	
	function makeItemLinks(key, linksLi){
		var editLink = document.createElement('a');
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Checklist";
		editLink.addEventListener("click", editItem)
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		var breakTag = document.createElement('br');
		linksLi.appendChild(breakTag);
		
		var deleteLink = document.createElement('a');
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Checklist";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	}
	
	function editItem(){
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		toggleControls("off");
		
		$('holiday').value = item.holigroup[1];
		$('app').value = item.app[1];
		$('mname').value = item.mname[1];
		$('date').value = item.date[1];
		$('amofpeople').value = item.amofpeople[1];
		$('notes').value = item.notes[1];
	
		save.removeEventListener("click", storeData);
		$('submit').value = "Edit Checklist";
		var editSubmit = $('submit');
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
	}
	
	function deleteItem(){
		var ask = confirm("Are you sure you want to delete this checklist?");
		if(ask){
			localStorage.removeItem(this.key);
			alert("Checklist was deleted.");
			window.location.reload();	
		}else{	
			alert("Contact was NOT deleted.")
		}
	}
	
	function clearLocal(){
		if(localStorage.length === 0){
			alert("There is no data to clear.")
		}else{
			localStorage.clear();
			alert("All checklists are deleted!");
			window.location.reload();
			return false;
		}	
	}
	
	function validate(e){
		var getHoliday 	= $('holiday');
		var getMain 	= $('mname');
		var getdate 	= $('date');
		var getPeople 	= $('amofpeople');
		
		errMsg.innerHTML = "";
		getHoliday.style.border = "1px solid red";
		getMain.style.border = "1px solid red";
		getdate.style.border = "1px solid red";
		getPeople.style.border = "1px solid red";
		
		var messageAry = [];
		if(getHoliday.value === "--Choose a Holiday--"){
			var holidayError = "Please choose a Holiday.";
			getHoliday.style.border = "1px solid red";
			messageAry.push(holidayError);
		}
		
		if(getMain.value === ""){
			var mainError = "Please enter a Main Meal."
			getMain.style.border = "1px solid red";
			messageAry.push(mainError);
		}
		
		if(getdate.value === ""){
			var dateError = "Please enter a date."
			getdate.style.border = "1px solid red";
			messageAry.push(dateError);
		}
		
		if(getPeople.value === ""){
			var peopleError = "Please enter amount of people."
			getPeople.style.border = "1px solid red";
			messageAry.push(peopleError);
		}
		
		if(messageAry.length >= 1){
			for(var i=0, j=messageAry.length; i < j; i++){
				var txt = document.createElement('li');
				txt.innerHTML = messageAry[i];
				errMsg.appendChild(txt);
			}		
			e.preventDefault();
			return false;
		}else{
			storeData(this.key);
		}
	}
	
	//Variable defualts
	var specHoliday = ["--Choose a Holiday--", "Christmas", "Thanksgiving", "Easter", "Hanukkah", "New Years", "St. Patricks", "Fourth of July"],
	sideValue,
	errMsg = $('errors');
		
	
	
	makeSpec();
	
	
	var displayLink = $('displayLink');
	displayLink.addEventListener("click", getData);
	var clearLink = $('clear');
	clearLink.addEventListener("click", clearLocal);
	var save = $('submit');
	save.addEventListener("click", validate);
	
	
});