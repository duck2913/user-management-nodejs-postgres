const nameEl = document.querySelector(".username");
const passwordEl = document.querySelector(".password");

async function handleSubmit() {
	const username = nameEl.value;
	const password = passwordEl.value;

	const options = {
		method: "POST",
		body: JSON.stringify({ password: password, username: username }),
		headers: {
			"Content-Type": "application/json",
		},
	};

	const res = await fetch("http://localhost:3000/auth/login", options);
	const response = await res.json();
	console.log("🚀 -> file: script.js -> line 19 -> response", response);
}
