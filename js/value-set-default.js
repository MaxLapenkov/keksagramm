
(function() {
    let size = document.querySelector('.upload-resize-controls-value'),
    image = document.querySelector('.effect-image-preview'),
    levelContainer = document.querySelector('.upload-effect-level'),
    hashtags = document.querySelector('.upload-form-hashtags'),
    comment = document.querySelector('.upload-form-description'),
    previewPictures = document.querySelectorAll('.effects__radio'),
    value = 0;
    
    window.valueSetDefault = function () {
        size.value = '100%';
        image.style.transform = 'scale(1)';
        value = +(size.value.slice(0, -1));
        image.style.filter = 'none';
        levelContainer.classList.add('hidden');
        hashtags.value = '';
        comment.value = '';
        previewPictures[0].checked = true;
    }
})();