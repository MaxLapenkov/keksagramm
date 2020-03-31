
(function() {
    let levelContainer = document.querySelector('.upload-effect-level'),
    line = document.querySelector('.upload-effect-level-line'),
    pin = document.querySelector('.upload-effect-level-pin'),
    val = document.querySelector('.upload-effect-level-val'),
    filtersList = document.querySelector('.upload-effect-controls'),
    filterIntensityInput = document.querySelector('.effect-level__value'),
    image = document.querySelector('.effect-image-preview'),
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
})();