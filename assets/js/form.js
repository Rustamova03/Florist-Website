let BASE_URL = " http://localhost:8080";
let form = document.querySelector("form");
let allInput = document.querySelectorAll("input");
let tBody = document.querySelector("tbody");
let sort = document.querySelector(".asc");
let elemId = false;
let searchBtn = document.querySelector(".search");
let dataArray = [];
let products = null;
let arrayproducts = null;

async function getData() {
  let res = await axios(`${BASE_URL}/products`);
  console.log(res.data);
  drawTable(res.data);
  dataArray = res.data;
  products = res.data;
  arrayproducts = structuredClone(products);
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

async function deleteBtn(id, btn) {
  if (confirm("Are you delete products?")) {
    await axios.delete(`${BASE_URL}/products/${id}`);
    btn.closest("tr").remove();
  }
}

form.addEventListener("click", function (e) {
  e.preventDefault();
  let obj = {
    image: allInput[0].value,
    title: allInput[1].value,
    price: allInput[2].value,
  };
  if (!elemId) {
    if (
      allInput[0].value !== "" &&
      allInput[1].value !== "" &&
      allInput[2].value !== ""
    ) {
      axios.post(`${BASE_URL}/products`, obj);
    }
  }
});

searchBtn.addEventListener("input", function (e) {
  let filtered = dataArray.filter((item) =>
    item.title.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
  );
  drawTable(filtered);
});

sort.addEventListener("click", function () {
  let sorted;
  if (this.innerText === "Ascending") {
    sorted = products.sort((a, b) => a.title.localeCompare(b.title));
    this.innerText = "Descending";
  } else if (this.innerText === "Descending") {
    sorted = products.sort((a, b) => b.title.localeCompare(a.title));
    this.innerText = "Default";
  } else {
    this.innerText = "Ascending";
    sorted = arrayproducts;
  }
  drawTable(sorted);
});
