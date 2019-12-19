'use strict';

const app = document.getElementById('root');
let slideIndex = 1;
const previous = document.getElementById('prev');
const next = document.getElementById('next');

//Fetching photos as soon as the DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    //API call to flickr
    function fetchPhotos() {
        const fetchPromise = fetch('/getPhotos');
        fetchPromise.then(function (response) {
            return response.json();
        }).then(function(photosObj) {
            if (photosObj.stat === 'fail' || photosObj.code === 100) {
                const messageElem = createElement('div');
                messageElem.innerHTML = "Note: Please register your cloned app with flickr api, grab your api key and use that on server file to call the getPhotos endpoint ";
                app.appendChild(messageElem);
                previous.style.display = "none";
                next.style.display = "none";
            } else {
                getPhotos(photosObj);
            }
        }).catch(function (error) {
            console.log(error);

        });
    }

    //Manipulating DOM elements
    function getPhotos(data) {
        data.photos.photo.forEach((p, i) => {
            let farmId = p.farm;
            let serverId = p.server;
            let id = p.id;
            let secret = p.secret;

            const slides = createElement('div');
            slides.appendChild(createNumDiv(i, data.photos.total));
            slides.appendChild(createImageElement(farmId, serverId, id, secret));
            slides.classList.add('slides');
            app.appendChild(slides);
        });
        showSlides(slideIndex);
        previous.addEventListener('click', () => plusSlides(-1));
        next.addEventListener('click', () => plusSlides(1));
    }

    function showSlides(n) {
        let i;
        let allSlides = document.getElementsByClassName('slides');
        if (n > allSlides.length) {
            slideIndex = 1;
        }

        if ( n < 1)  {slideIndex = allSlides.length}
        for (i = 0; i < allSlides.length; i++) {
            allSlides[i].style.display = "none";
        }
        allSlides[slideIndex - 1].style.display = "block";
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    //Creating image numbering element
    function createNumDiv(i, total) {
        const numDiv = createElement('div');
        numDiv.classList.add('numberText');
        numDiv.innerHTML = `${i + 1}/${total}`;
        return numDiv;
    }

    //creating image element
    function createImageElement(farmId, serverId, id, secret) {
        const img = createElement('img');
        let srcAttr = document.createAttribute('src');
        srcAttr.value = `https://farm${farmId}.staticflickr.com/${serverId}/${id}_${secret}.jpg`;
        img.setAttributeNode(srcAttr);
        return img;
    }

    //Helper function
    function createElement(node) {
        return document.createElement(node);
    }

    fetchPhotos();
});





