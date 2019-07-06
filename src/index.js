import './style.css';

const btn = document.querySelector(".refresh");


const url = 'https://random.dog/woof.json';

btn.addEventListener('click', e => {
    const imgArr = document.querySelectorAll(".img-dog");

    imgArr.forEach((el) => {
        el.innerHTML = '';

        el.addEventListener('click', e => {
            e.preventDefault();
            if (e.target.parentElement.classList.contains("large"))
                return;

            imgArr.forEach(el => {
                if (el.classList.contains("large")) {
                    el.classList.remove("large");
                    el.classList.add("small");
                }
            });
            e.target.parentElement.classList.add("large");
        });
        
        getImg(url)
            .then(json => { insertImg(el, json)} )
            .catch();

    });
});

function getImg(url) {
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = function() {
            if (xhr.status === 200) {
                let json = JSON.parse(xhr.response);
                resolve(json);
            } else {
                reject(xhr.statusText);
            }
        }
        xhr.onerror = function(error) {
            reject(error);
        }
        xhr.send();
    }) 
}

function insertImg(elem, obj) {
    let img = document.createElement('img');
    img.setAttribute('src', obj.url);
    elem.appendChild(img);
}