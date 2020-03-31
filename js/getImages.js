
    (function() {
        let container = document.querySelector('.pictures'),
        gallery = document.querySelector('.gallery-overlay');
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
    })();