var amount = Math.floor(window.innerWidth / (100));
var snowball, snowballWidth = 0;
var auto;

function startAuto() {
	    auto = window.setInterval(continuousFall, 20 * 1000);
		console.log("Regained focus");
}
function stopAuto() {
	for (var j = amount - 1; j >= 0; j--) {
		$("#snowflake" + j).stop(true, true);
	}
	
	console.log("lost focus");
    window.clearInterval(auto);
}
window.addEventListener('focus', startAuto);    
window.addEventListener('blur', stopAuto);

document.onmousemove = function(e) {
	if(snowball){
		snowball.style.top = (e.clientY + 3) + "px";
		snowball.style.left = (e.clientX + 3) + "px";
		
		if(snowballWidth > 0 && window.innerHeight <= (e.clientY + snowballWidth)) {
			// Create snowball
			snowball = document.createElement("img");
			snowball.src = chrome.extension.getURL("snowball.png");
			snowball.style.position = "absolute";
			snowball.style.width = (snowballWidth = 0) + "px";
			snowball.style.zIndex = "1000";
			document.body.appendChild(snowball);
		}
	}
};
document.onkeydown = function(e) {
	if(e.key == "s") {
			// Create snowball
			snowball = document.createElement("img");
			snowball.src = chrome.extension.getURL("snowball.png");
			snowball.style.position = "absolute";
			snowball.style.width = (snowballWidth = 0) + "px";
			snowball.style.zIndex = "1000";
			document.body.appendChild(snowball);
	}
};

$(function() {
	// Create snowball
	snowball = document.createElement("img");
	snowball.src = chrome.extension.getURL("snowball.png");
	snowball.style.position = "absolute";
	snowball.style.width = snowballWidth + "px";
	snowball.style.zIndex = "1000";
	document.body.appendChild(snowball);

	// Create snowflakes
	for (var i = amount - 1; i >= 0; i--) {
		var img = document.createElement("img");
		img.id = "snowflake" + i;
		img.style.position = "absolute";
		img.style.top = "-32px";
		img.style.left = (i * 100) + "px";
		img.style.width = "32px";
		img.style.height = "32px";
		img.style.zIndex = "1000";
		img.src = chrome.extension.getURL("snowflake.png");
		
		img.addEventListener("mouseover", function() {
			snowball.style.width = (snowballWidth += 2) + "px";
		});


		document.body.appendChild(img);
	}

	continuousFall(); // Make it start as soon as the page loads
	startAuto();
});

function continuousFall() {
	for (var j = amount - 1; j >= 0; j--) {
		if (j % 3 == 0) {
			snowAnimation($("#snowflake" + j), j, 1000, 9000);
		}
		else if (j % 3 == 1) {
			snowAnimation($("#snowflake" + j), j, 3000, 9000);
		}
		else{
			snowAnimation($("#snowflake" + j), j, 5000, 9000);
		}
	}
}

function snowAnimation(element, j, delay, dur) {
	element.velocity({ translateY: ($(document).height() + 32) }, { delay: delay + Math.random() * j * 1000, duration: (dur + (Math.random() * 1000)) }).
		velocity({ translateY: -32 }, { duration: 0 });
}

setInterval(continuousFall, 20 * 1000);