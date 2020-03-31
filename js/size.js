
(function() {
    let size = document.querySelector('.upload-resize-controls-value'),
    minus = document.querySelector('.upload-resize-controls-button-dec'),
    plus = document.querySelector('.upload-resize-controls-button-inc'),
    image = document.querySelector('.effect-image-preview'),
    value = 0;
 



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
})();