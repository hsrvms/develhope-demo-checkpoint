const app = document.querySelector("#app");
const brandInput = document.querySelector("#brand");
const countInput = document.querySelector("#count");
const submitButton = document.querySelector("#submitBtn");
const cardsContainer = document.querySelector("#cardsContainer");

function renderCards() {
  const cards = JSON.parse(localStorage.getItem('cards'));

	cardsContainer.innerHTML = `
    <ul class="card-list">
      ${cards
			.map((item, index) =>{
        if(item.count > 0) {
          return `
          <li class="card" >
            <span>${index + 1}</span>
            <p>${item.name}</p>
            <p>${item.count}</p>
            <button onclick="handleSell(${index})">Sell</button>
          </li>
        `
        } else {
          return ''
        }
      }).join("")}
    </ul>
 `;
}

function handleSell(index) {
	const cards = JSON.parse(localStorage.getItem("cards"));

	cards[index].count -= 1;

  const newCards = cards.filter((item) => {
    return item.count > 0 ;
  })
  
	localStorage.setItem("cards", JSON.stringify(newCards));

  renderCards();
}

function handleSubmit(e) {
	e.preventDefault();
	const name = brandInput.value;
	const count = countInput.value;

	if (!name || !count) return;

	const formData = {
		name: name,
		count: count,
	};

	const cards = [];
	const localData = localStorage.getItem("cards");

	if (!localData) {
		cards.push(formData);
		localStorage.setItem("cards", JSON.stringify(cards));
	} else {
		const parsedLocalData = JSON.parse(localData);
		cards.push(...parsedLocalData);
		cards.push(formData);
		localStorage.setItem("cards", JSON.stringify(cards));
	}

	renderCards();

	// localStorage.clear();
}

renderCards();
submitButton.addEventListener("click", handleSubmit);

// localStorage.clear();
