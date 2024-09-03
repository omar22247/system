let title = document.querySelector(".title");
let price = document.querySelector(".price");
let tax = document.querySelector(".tax");
let ads = document.querySelector(".ads");
let discount = document.querySelector(".discount");
let total = document.querySelector(".total");
let count = document.querySelector(".count");
let category = document.querySelector(".category");
let create = document.querySelector(".create");
let mianheader = document.querySelector(".mianheader");
let searchFiled = document.querySelector(".searchFiled");
let tbody = document.querySelector("tbody");
let totalPrice;
let mode = "create";
let searchmode = "title";
let tmp;
// localStorage.clear()

function getTotal() {
    if (price.value != "") {
        totalPrice = +price.value + +tax.value + +ads.value - +discount.value;
        total.textContent = `total: ${totalPrice}`;
        total.style.background = "green";
    } else {
        total.textContent = `total: `;
        total.style.background = "rgb(83, 3, 3)";
    }
};


// ----------------------------------------------------
let products = JSON.parse(localStorage.getItem("product")) || [];
show();

// ----------------------------------------------------


function creatElement() {
    const d = new Date();

    let newProduct = {
        title: title.value,
        price: +price.value,
        tax: +tax.value,
        ads: +ads.value,
        total: totalPrice,
        discount: +discount.value,
        category: category.value,
        count: +count.value,
        addDate: d.toLocaleDateString('en-US')
    };
    if (title.value != "" && price.value != "" && +count.value < 100 && category.value != "") {
        if (mode === "create") {
            if (+count.value > 1) {
                for (let i = 0; i < +count.value; i++) {
                    products.push(newProduct);
                    // show();
                    clear();
                };
            } else {
                products.push(newProduct);
                clear();
            }
            total.style.background = "rgb(83, 3, 3)";
        } else {
            products[tmp] = newProduct;
            mode = "create";
            total.style.background = "rgb(83, 3, 3)";
        }
    };
    localStorage.setItem("product", JSON.stringify(products));
    create.textContent = "Create";
    mianheader.textContent = "CREATE";
    show();
    // scroll({
    //     top: 900,
    //     behavior: "smooth"
    // })
};
// ----------------------------------------------------

function show() {
    count.style.display = "block";
    products = JSON.parse(localStorage.product);
    let tbody = document.querySelector("tbody");
    tbody.innerHTML = "";
    for (i = 0; i < products.length; i++) {

        let current = products[i];

        let product = document.createElement("tr");
        product.id = `${i+1}`;
        product.className = `product${i+1}`;
        product.innerHTML = `<td>${i+1}</td>
                        <td>${current.title|| "___"}</td>
                        <td>${current.price|| "___"}</td>
                        <td>${current.tax|| "___"}</td>
                        <td>${current.ads|| "___"}</td>
                        <td>${current.discount|| "___"}</td>
                        <td style="color:  rgb(49, 152, 49);" >${current.total|| "___"}</td>
                        <td>${current.category|| "___"}</td>
                        <td><button class="update" onclick="update(${i+1})">UPDATE</button></td>
                        <td><button class="delete" onclick="deleteelement(${i+1})">DELETE</button></td>`;
        tbody.appendChild(product);
    }
    delbutton();
};

function update(x) {
    console.log(products[x - 1]);
    tmp = x - 1;
    title.value = `${products[x - 1].title}`;
    price.value = `${products[x - 1].price}`;
    tax.value = `${products[x - 1].tax}`;
    ads.value = `${products[x - 1].ads}`;
    discount.value = `${products[x - 1].discount}`;
    getTotal();
    count.style.display = "none";
    category.value = `${products[x - 1].category}`;
    create.textContent = "Update";
    mode = "update";
    mianheader.textContent = "UPDATE";
    scroll({
        top: 0,
        behavior: "smooth"
    });
    title.focus();

};

function deleteelement(x) {
    let ele = document.getElementById(`${x}`);
    products.splice(x - 1, 1);
    localStorage.setItem("product", JSON.stringify(products));
    show();
};

function delbutton() {
    if (products.length >= 1) {
        let y = document.querySelector(".d");
        y.style.display = "block";
    } else {
        let y = document.querySelector(".d");
        y.style.display = "none";
    }
};

function deleteAll() {
    localStorage.clear();
    let tbody = document.querySelector("tbody");
    tbody.innerHTML = "";
    let y = document.querySelector(".d");
    y.style.display = "none";
};

function clear() {
    title.value = "";
    price.value = "";
    tax.value = "";
    ads.value = "";
    discount.value = "";
    total.textContent = `total: `;
    count.value = "";
    category.value = "";
};

function getsearch(x) {
    let searchFiled = document.querySelector(".searchFiled");
    searchFiled.value = "";
    show();
    searchmode = x;
    searchFiled.focus();
    searchFiled.placeholder = `Search by ${searchmode}`;
    // console.log(searchmodemode)
    search()
};

function search(value) {

    let countsearch = 0;
    // console.log(value);
    if (value.length >= 1) {
        tbody.innerHTML = "";
        let regex = new RegExp(value, "i");
        for (let i = 0; i < products.length; i++) {
            if (searchmode === "category") {
                if (regex.test(products[i].category)) {
                    console.log(i);
                    countsearch++;

                    let product = document.createElement("tr");
                    product.className = `product${i+1}`;
                    product.innerHTML = `<td>${i+1}</td>
                            <td>${products[i].title|| "___"}</td>
                            <td>${products[i].price|| "___"}</td>
                            <td>${products[i].tax|| "___"}</td>
                            <td>${products[i].ads|| "___"}</td>
                            <td>${products[i].discount|| "___"}</td>
                            <td>${products[i].total|| "___"}</td>
                            <td  style="color: red;">${products[i].category|| "___"}</td>
                            <td><button class="update" onclick="update(${i+1})">UPDATE</button></td>
                            <td><button class="delete" onclick="deleteelement(${i+1})">DELETE</button></td>`;
                    tbody.appendChild(product);

                }
            } else {

                if (regex.test(products[i].title)) {
                    console.log(i);
                    countsearch++;

                    let product = document.createElement("tr");
                    product.className = `product${i+1}`;
                    product.innerHTML = `<td>${i+1}</td>
                            <td  style="color: red;">${products[i].title|| "___"}</td>
                            <td>${products[i].price|| "___"}</td>
                            <td>${products[i].tax|| "___"}</td>
                            <td>${products[i].ads|| "___"}</td>
                            <td>${products[i].discount|| "___"}</td>
                            <td>${products[i].total|| "___"}</td>
                            <td>${products[i].category|| "___"}</td>
                            <td><button class="update" onclick="update(${i+1})">UPDATE</button></td>
                            <td><button class="delete" onclick="deleteelement(${i+1})">DELETE</button></td>`;
                    tbody.appendChild(product);

                };

            };
        };
        if (countsearch == 0) {
            let product = document.createElement("tr");
            product.className = `product${i+1}`;
            product.innerHTML = `<td colspan="10"><h2>NO result match you search</h2></td>`;
            tbody.appendChild(product);
        }
    } else {
        show()
    };
};