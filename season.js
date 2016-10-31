var amount = Math.floor(window.innerWidth / (100));

var auto;
function startAuto() {
	if (auto == null) {
	    auto = window.setInterval(continuousFall, 8000);
	}
}
function stopAuto() {
    window.clearInterval(auto);
}

window.addEventListener('focus', startAuto);    
window.addEventListener('blur', stopAuto);

$(function() {

	for (var i = amount - 1; i >= 0; i--) {
		var img = document.createElement("img");
		img.id = "snowflake" + i;
		img.style.position = "absolute";
		img.style.top = "-32px";
		img.style.left = (i * 100) + "px";
		img.zIndex = Number.MAX_SAFE_INTEGER.toString();

		img.src = chrome.extension.getURL("snowflake.png");

		document.body.appendChild(img);
	}

	continuousFall();
});

function continuousFall() {
	for (var j = amount - 1; j >= 0; j--) {
		if (j % 3 == 0) {
			$("#snowflake" + j).
				velocity({ translateY: ($(document).height() + 32), visibility: "visible" }, { delay: 1000 + Math.random() * j * 1000, duration: (9000 + (Math.random() * 1000)) }).
				velocity({ visibility: "hidden" }).
				velocity({ translateY: -32 }, { duration: 0 });
		}
		else if (j % 3 == 1) {
			$("#snowflake" + j).
				velocity({ translateY: ($(document).height() + 32), visibility: "visible" }, { delay: 3000 + Math.random() * j * 1000, duration: (9000 + (Math.random() * 1000)) }).
				velocity({ visibility: "hidden" }).
				velocity({ translateY: -32 }, { duration: 0 });
		}
		else{
			$("#snowflake" + j).
				velocity({ translateY: ($(document).height() + 32), visibility: "visible" }, { delay: 5000 + Math.random() * j * 1000, duration: (9000 + (Math.random() * 1000)) }).
				velocity({ visibility: "hidden" }).
				velocity({ translateY: -32 }, { duration: 0 });
		}
	}

	setInterval(continuousFall, 7000);
}