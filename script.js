// Selecting Elements from HTML
const imagePreview = document.querySelector('.image-preview');
const image = document.querySelector('.image-preview img');
const uploadContent = document.querySelector('.upload-content');
const uploadSection = document.querySelector('.upload-section');
const fileInput = document.getElementById('fileInput');
const newImagePreview = document.querySelector('.after-image img');
const loaderAnimation = document.querySelector('.loader');
const processingSection = document.querySelector('.process-section');
const bgRemoveBtn = document.getElementById('remove-bg-btn');


const formData = new FormData();

bgRemoveBtn.disabled = true;

fileInput.onchange = () => {
    const file = fileInput.files[0];

    if (file) {

        const fileReader = new FileReader();
        fileReader.onload = (e) => image.src = e.target.result;
        fileReader.readAsDataURL(file);

        formData.append('image_file', file);
        formData.append('size', 'auto');

        imagePreview.style.display = "block";
        uploadContent.style.display = "none";
        uploadSection.style.borderColor = "#93c5fd";

        bgRemoveBtn.disabled = false;
    } else {
        bgRemoveBtn.disabled = true;
    }
}


// API Info
const WEB_URL = "https://api.remove.bg/v1.0/removebg";
const API_KEY = "cmuGQ3oLSuh35s7UBQ5N4kPu";

const removeBackground = async () => {

    const response = await fetch(WEB_URL, {
        method: "POST",
        headers: { 'X-Api-key': API_KEY },
        body: formData,
    })

    if (!response.ok) return;

    const newImage = await response.blob();
    const newImage_URL = URL.createObjectURL(newImage);


    setTimeout(() => {
        loaderAnimation.style.display = "none";
        newImagePreview.src = newImage_URL;
        newImagePreview.style.display = "block";
    }, 1500);


}

bgRemoveBtn.addEventListener('click', () => {
    uploadContent.style.display = "none";
    processingSection.style.display = "flex";
    imagePreview.style.display = "none";

    bgRemoveBtn.disabled = true;


    removeBackground();
});