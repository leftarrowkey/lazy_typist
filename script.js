const item_template = document.querySelector("#copy_item");
const copy_items = document.querySelector("#copy_items");
const add_item = document.querySelector("#add_item");

for (let i = 0; i < localStorage.length; i++) {
	const text = localStorage.key(i);
	const item = item_template.content.cloneNode(true);
	item.querySelector(".text").textContent = text;
	item.querySelector(".copy").addEventListener("click", async function(event) {
		try {
			navigator.clipboard.writeText(text);
		} catch (error) {
			console.error(error);
		}
	});
	item.querySelector(".delete").addEventListener("click", (event) => {
		if (confirm(`Are you sure you want to delete "${text}"?`)) {
			localStorage.removeItem(text);
			window.location.reload();
		}
	});
	copy_items.appendChild(item);
}

add_item.addEventListener("click", (event) => {
	let text = prompt("Enter the text");
	if (text !== null && text !== "") {
		localStorage.setItem(text, "");
		window.location.reload();
	}
});

// i should probably check service workers are available, but who cares.
if ("serviceWorker" in navigator) {
	navigator.serviceWorker.register("service.js").then(
		(registration) => {
			console.log(`Registration worked: ${registration}`);
		},
		(error) => {
			console.error(`Registration failed: ${error}`);
		}
	)
} else {
	alert("Service Workers are not supported here. The app won't work offline.");
}
