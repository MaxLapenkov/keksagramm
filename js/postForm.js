
(function() {
    let hashtags = document.querySelector('.upload-form-hashtags'),
    comment = document.querySelector('.upload-form-description'),
    form = document.querySelector('.upload-form'),
    messageContainer = document.querySelector('.upload-message'),
    overlay = document.querySelector('.upload-overlay'),
    message = document.querySelector('.upload-message'),
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
})();