let uploadFile = document.querySelector('#upload-file'),
    overlay = document.querySelector('.upload-overlay'),
    message = document.querySelector('.upload-message'),
    closeOverlay = document.querySelector('.upload-form-cancel');


uploadFile.addEventListener('change', () => {
    valueSetDefault();
    overlay.classList.remove('hidden');
    message.classList.remove('hidden');
    let selectedFile = document.getElementById('upload-file').files[0];
    var reader = new FileReader();
    reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(image);
    let url = reader.readAsDataURL(selectedFile);
});

closeOverlay.addEventListener('click', () => {
    valueSetDefault();
    overlay.classList.add('hidden');
    message.classList.add('hidden');
});


let size = document.querySelector('.upload-resize-controls-value'),
    minus = document.querySelector('.upload-resize-controls-button-dec'),
    plus = document.querySelector('.upload-resize-controls-button-inc'),
    image = document.querySelector('.effect-image-preview'),
    
    
    value = 0;
 

function valueSetDefault() {
    size.value = '100%';
    image.style.transform = 'scale(1)';
    value = +(size.value.slice(0, -1));
    image.style.filter = 'none';
    levelContainer.classList.add('hidden');
    hashtags.value = '';
    comment.value = '';
    previewPictures[0].checked = true;
}

plus.addEventListener('click', () => {
    if (value != 100) {
        size.value = `${value + 25}%`;
        value = +(size.value.slice(0, -1));
        image.style.transform = `scale(${value/100})`;
    }
    
});

minus.addEventListener('click', () => {
    if (value != 25) {
        size.value = `${value - 25}%`;
        value = +(size.value.slice(0, -1));
        image.style.transform = `scale(${value/100})`;
    }
    
});


let levelContainer = document.querySelector('.upload-effect-level'),
    line = document.querySelector('.upload-effect-level-line'),
    pin = document.querySelector('.upload-effect-level-pin'),
    val = document.querySelector('.upload-effect-level-val'),
    filtersList = document.querySelector('.upload-effect-controls'),
    filterIntensityInput = document.querySelector('.effect-level__value'),
    previewPictures = document.querySelectorAll('.effects__radio'),
    DEFAULT_SCALE_VALUE = 100,
    DAFAULT_FILTER_INTENSITY = 100;

filterIntensityInput.style.display = "none";

function onFiltersListClick(evt) {
    if (evt.target.classList.contains('effects__radio')) {
        updateFilterIntensityControl(DAFAULT_FILTER_INTENSITY);
        image.style.filter = getPictureFilter(evt.target.id, DAFAULT_FILTER_INTENSITY);
        filterIntensityInput.value = DAFAULT_FILTER_INTENSITY;

        if (evt.target.id === 'upload-effect-none') {
            levelContainer.classList.add('hidden');
        } else {
            levelContainer.classList.remove('hidden');
        }
    }
}

function getFilterIntensity(x) {
    let filterIntensityRangeLeftX = line.getBoundingClientRect().left;
    let filterIntensityRangeRightX = line.getBoundingClientRect().right;

    let relativeX;
    if (x < filterIntensityRangeLeftX) {
        relativeX = 0;
    } else if (x > filterIntensityRangeRightX) {
        relativeX = line.clientWidth;
    } else {
        relativeX = (x - filterIntensityRangeLeftX);
    }

    return Math.round(relativeX / line.clientWidth * 100);
}

function updateFilterIntensityControl(value) {
    pin.style.left = value + '%';
    val.style.width = value + '%';
}

function getPictureFilter(id, value) {
    switch (id) {
        case 'upload-effect-chrome':
            return `grayscale(${value / 100})`;
        case 'upload-effect-sepia':
            return `sepia(${value / 100})`;
        case 'upload-effect-marvin':
            return `invert(${value}%)`;
        case 'upload-effect-phobos':
            return `blur(${value / 20}px)`;
        case 'upload-effect-heat':
            return `brightness(${1 + value / 50})`;
        case 'upload-effect-none':
            return 'none';
    }
}

function getActivePictureFilterId() {
    let previewPictures = document.querySelectorAll('.effects__radio');
    for (let i = 0; i < previewPictures.length; i++) {
        if (previewPictures[i].checked) {
            return previewPictures[i].id;
        }
    }

}

function changeFilterIntensity(x) {
    let filterIntensity = getFilterIntensity(x);

    updateFilterIntensityControl(filterIntensity);
    image.style.filter = getPictureFilter(getActivePictureFilterId(), filterIntensity);
    filterIntensityInput.value = filterIntensity;
}

function onFilterIntensityRangeClick(evt) {
    changeFilterIntensity(evt.clientX);
}

function onFilterIntensityPinMousedown(evt) {
    evt.preventDefault();
    document.addEventListener('mousemove', onDocumentMousemove);
    document.addEventListener('mouseup', onDocumentMouseup);
}

function onDocumentMousemove(evt) {
    changeFilterIntensity(evt.clientX);
}

function onDocumentMouseup(evt) {
    evt.preventDefault();
    document.removeEventListener('mousemove', onDocumentMousemove);
    document.removeEventListener('mouseup', onDocumentMouseup);
}
pin.addEventListener('mousedown', onFilterIntensityPinMousedown);
line.addEventListener('click', onFilterIntensityRangeClick);
filtersList.addEventListener('click', onFiltersListClick);

let hashtags = document.querySelector('.upload-form-hashtags'),
    comment = document.querySelector('.upload-form-description'),
    form = document.querySelector('.upload-form'),
    messageContainer = document.querySelector('.upload-message'),
    messageInner = document.querySelector('.upload-message-container');



function stayOpened() {
    window.addEventListener('keydown', evt => {
        if (evt.keyCode === 27) {
            evt.preventDefault();
            if (overlay.classList.contains("hidden")) {
                overlay.classList.remove("hidden");
            }
            if (message.classList.contains("hidden")) {
                message.classList.remove("hidden");
            }
        }
    });
}

function closeForm() {
    window.addEventListener('keydown', evt => {
        if (evt.keyCode === 27) {
            evt.preventDefault();
            if (!overlay.classList.contains("hidden")) {
                overlay.classList.add("hidden");
            }
            if (!message.classList.contains("hidden")) {
                message.classList.add("hidden");
            }
        }
    });
}
comment.onfocus = function () {
    stayOpened();
};
hashtags.onfocus = function () {
    stayOpened();
};
comment.onblur = function () {
    closeForm();
};
hashtags.onblur = function () {
    closeForm();
};



form.addEventListener('submit', event => {
    event.preventDefault();
    const url = 'https://jsonplaceholder.typicode.com/users';

    function sendRequest(method, url) {
        overlay.classList.add('hidden')
        message.classList.add('hidden')
        messageContainer.classList.remove('hidden');
        messageInner.innerHTML = 'Загрузка...';

        const headers = {
            'Content-Type': 'application/json'
        }
        return fetch(url, {
            method: method,
            body: JSON.stringify(body),
            headers: headers,
            cors: 'no-cors'
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then(error => {
                const e = new Error('Что-то не так')
                e.data = error;
                throw e;
            })
        })


    }


    let formData = new FormData(form);

    const body = {};

    formData.forEach(function (value, key) {
        body[key] = value;
    });
    let hashes = hashtags.value.toLowerCase();
    let hashtagsArr = hashes.split(" ");
    let hashready = true;

    for (let i = 0; i < hashtagsArr.length; i++) {
        if (hashtagsArr[i].length > 20 || hashtagsArr[i].length === 1 || hashtagsArr.length > 5 || hashtagsArr[i][0] != '#') {
            hashready = false;
        }
        for (let j = 0; j < hashtagsArr.length; j++) {
            if (hashtagsArr[i] === hashtagsArr[j] && i != j) {
                hashready = false;
            }
        }
    }

    if (comment.value.length > 140) {
        comment.style.borderColor = 'red';
    } else if (hashready === false && hashtags.value != '') {
        hashtags.style.borderColor = 'red';
    } else {
        sendRequest('POST', url, body)
            .then(() => {
                valueSetDefault();
                overlay.classList.add('hidden');
                message.classList.add('hidden');
                messageContainer.classList.add('hidden');
                messageInner.innerHTML = '';
                

            })
            .catch(() => {
                overlay.classList.add('hidden');
                message.classList.add('hidden');
                messageContainer.classList.remove('hidden');
                messageInner.innerHTML = 'Произошла ошибка';
                setTimeout(() => {
                    messageContainer.classList.add('hidden');
                    messageInner.innerHTML = '';
                }, 2000);
            })
    }
});

function getData(method, url) {
    const headers = {
        'Content-Type': 'application/json'
    }
    return fetch(url, {
        method: method,
        headers: headers,
        cors: 'no-cors'
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
        return response.json().then(error => {
            const e = new Error('Что-то не так')
            e.data = error;
            throw e;
        })
    })


}
let container = document.querySelector('.pictures'),
    gallery = document.querySelector('.gallery-overlay');


class Picture {
    constructor(data) {
        this.url = data.url;
        this.likes = data.likes;
        this.comments = data.comments;
        this.description = data.description;
    }
    createPicture() {
        let newPicuture = document.createElement('a');
        newPicuture.innerHTML = `<img src=${this.url} width="182" height="182">
        <span class="picture-stats">
          <span class="picture-stat picture-comments"></span>
          <span class="picture-stat picture-likes"></span>
        </span>`;
        newPicuture.classList.add('picture');
        container.append(newPicuture);
    }
    createGallery() {
        let pictures = document.querySelectorAll('.picture');

        pictures.forEach(item => {
            item.addEventListener('click', () => {
                gallery.classList.remove('hidden');
                gallery.innerHTML = `<span class="gallery-overlay-close">&times;</span>
                <div class="gallery-overlay-preview">
                  <img src=${this.url} class="gallery-overlay-image" alt="">
                  <div class="gallery-overlay-controls">
                    <div class="gallery-overlay-controls-like">Нравится <span class="likes-count">0</span></div>
                    <div class="gallery-overlay-controls-comments"><span class="comments-count">125</span> комментариев</div>
                  </div>
                </div>`
            });
        })
    }
}


let url = 'https://js.dump.academy/kekstagram/data';
getData('GET', url)
    .then(data =>{
        loadData(data);
        function loadData(data) {
            container.innerHTML = '';
            let filters = document.querySelector('.filters');
            filters.classList.remove('hidden');
            data.forEach(item => {
                const picture = new Picture(item);
                picture.createPicture();
            });
            for(let i = 0;i < data.length; i++) {
                let pictures = document.querySelectorAll('.picture');
                let comments = document.createElement('ul');
                let pictureComments = data[i].comments;
                comments.classList.add('social-comments');
                const picture = pictures[i];
                picture.addEventListener('click', () => {
                    gallery.classList.remove('hidden');
                    gallery.innerHTML = `<span class="gallery-overlay-close">&times;</span>
                    <div class="gallery-overlay-preview">
                      <img src=${data[i].url} class="gallery-overlay-image" alt="">
                      <div class="gallery-overlay-controls">
                        <div class="gallery-overlay-controls-like">Нравится <span class="likes-count">${data[i].likes}</span></div>
                        <div class="gallery-overlay-controls-comments"><span class="comments-count">${data[i].comments.length}</span> комментариев</div>
                        <button class="showMore">Еще комментарии</button>
                      </div>
                    </div>`;
                    
                    function showComments(n) {
                        
                        
                        for (let j = 0; j < pictureComments.length; j++) {
                            
                            let com = pictureComments[j];
                            let myCom = document.createElement('li');
                           
                            myCom.classList.add('social-comment');
                               
                            myCom.innerHTML = `
                            <img src="" alt="" class="social-picture">
                            <p class = "social-message"><span class="social-name">${com.name}:</span><br><span class="social-text">${com.message}</span></p>
                            `;
                            comments.appendChild(myCom);
                            if( j === n - 1){
                                break;
                            }
                            let galleryOverlay = document.querySelector('.gallery-overlay-preview');
                            comments.style.width = galleryOverlay.style.width;
                        }
                        
                        gallery.appendChild(comments);
                        
                    }
                    function clearComments() {
                        comments.innerHTML = ``;
                    }
                    
                    let btnShowMore = document.querySelector('.showMore');
                    let commentsCount = 5;
                    showComments(commentsCount);
                    if(commentsCount > pictureComments.length - 1) {
                        btnShowMore.style.display = 'none';
                    }
                    btnShowMore.addEventListener('click', () => {
                        commentsCount += 5;
                        clearComments();
                        showComments(commentsCount);
                       
                        if(commentsCount > pictureComments.length - 1) {
                            btnShowMore.style.display = 'none';
                        }
                    })
                    
                    
            
    
                    let galleryClose = document.querySelector('.gallery-overlay-close');
                    galleryClose.addEventListener('click', () => {
                        gallery.classList.add('hidden');
                    });
                   
                });
    
               
            }
        }
        

          
          let popular = document.getElementById('filter-popular');
          popular.addEventListener('click', () => {
            let newData = data.slice(0, 10);
            newData.sort(function(){
              return Math.random() - 0.5;
            });
            setTimeout(() => {
                loadData(newData);
              }, 500);   
              
          })
          let random = document.getElementById('filter-random');
          random.addEventListener('click', () => {
              setTimeout(() => {
                let randData = data.slice();
                randData.sort(function(){
                    return Math.random() - 0.5;
                  });
                loadData(randData);
              }, 500);
            
        })
        let recommend = document.getElementById('filter-recommend');
        recommend.addEventListener('click', () => {
            setTimeout(() => {
                loadData(data);
              }, 500);        
        })
       
        let discussed = document.getElementById('filter-discussed');
        discussed.addEventListener('click', () => {         
            let discussedData = data.slice();
            discussedData.sort((a, b) => a.comments.length < b.comments.length ? 1 : -1);
            setTimeout(() => {
                loadData(discussedData);
              }, 500);   
        });
    })
    
    .catch(err => console.error(err));
