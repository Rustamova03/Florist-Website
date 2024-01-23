let BASE_URL = " http://localhost:8080";
let form = document.querySelector("form");
let allInput = document.querySelectorAll("input");
let tBody = document.querySelector("tbody");

async function getData() {
  let res = await axios(`${BASE_URL}/products`);
  console.log(res.data);
  drawTable(res.data);
}
getData();

async function drawTable(data) {
  tBody.innerHTML = "";
  data.forEach((element) => {
    tBody.innerHTML += `
    <tr>
              <td><img src=${element.image} /></td>
              <td>${element.title}</td>
              <td>${element.price}</td>
              <td><button class="deleteBtn" onclick=deleteBtn("${element.id}",this)>Delete</button></td>
            </tr>
    `;
  });
}

