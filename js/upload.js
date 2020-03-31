

(function() {
    let uploadFile = document.querySelector('#upload-file'),
    overlay = document.querySelector('.upload-overlay'),
    message = document.querySelector('.upload-message'),
    image = document.querySelector('.effect-image-preview'),
    closeOverlay = document.querySelector('.upload-form-cancel');



uploadFile.addEventListener('change', () => {
    window.valueSetDefault();
    overlay.classList.remove('hidden');
    message.classList.remove('hidden');
    let selectedFile = document.getElementById('upload-file').files[0];
    var reader = new FileReader();
    reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(image);
    let url = reader.readAsDataURL(selectedFile);
});

closeOverlay.addEventListener('click', () => {
    window.valueSetDefault();
    overlay.classList.add('hidden');
    message.classList.add('hidden');
});
})();