let BASE_URL = " http://localhost:8080";
let card = document.querySelector(".arrivalsbottom");

async function getData() {
  let response = await axios(`${BASE_URL}/products`);
  console.log(response.data);
drawTable(response.data)
}
getData();

async function drawTable(data){
    card.innerHTML=""
    data.forEach(element => {
        card.innerHTML+=`
        <div class="arrivalsbottomcard">
              <img src="${element.image}" alt="" />
              <h4>${element.title}</h4>
              <p>${element.price}</p>
            </div>
        `
        
    });
}

