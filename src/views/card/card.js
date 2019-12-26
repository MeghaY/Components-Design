'use strict';

import createElement from "../../utility";

function loadData() {

    fetch('/getProducts').then(function (res) {
        return res.json();
    }).then(function (response) {
        let productsContainer = document.getElementById('products');
        response.products.forEach((item) => {
            let width = `${Math.round((item.Rating_Avg/ 5) * 100)/10 * 10}%`;

            let productTemplate = `<div class="product">
                <img src="../../images/${item.fileName}" alt="${item.Name}">
                <div class="container">
                    <h4><b>${item.Name}</b></h4>
                    <span class="price">$${item.Price}</span>
                    <div class="star_rating_outer">
                        <div class="star_rating_inner" style="width: ${width}">
                        
                        </div>
                    </div>
                </div>
            </div>`;

            productsContainer.insertAdjacentHTML("beforeend", productTemplate);
        }).catch(function (error) {
            let errorElem = createElement('div');
            errorElem.innerHTML = 'Products details are not fetched properly, Please try again or update your products json file';
            productsContainer.appendChild(errorElem);
        });
    });
}


loadData();
