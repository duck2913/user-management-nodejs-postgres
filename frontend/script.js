const nameEl = document.querySelector(".username");
const passwordEl = document.querySelector(".password");

function handleSubmit() {
	const username = nameEl.value;
	const password = passwordEl.value;

	const options = {
		method: "POST",
		body: JSON.stringify({ password: password, username: username }),
		headers: {
			"Content-Type": "application/json",
		},
	};

	fetch("http://localhost:3000/auth/login", options)
		.then((response) => response.json())
		.then((response) => console.log(response))
		.catch((err) => console.error(err));
}
