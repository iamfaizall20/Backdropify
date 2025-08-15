// Selecting Elements from HTML
const imagePreview = document.querySelector('.image-preview');
const image = document.querySelector('.image-preview img');
const uploadContent = document.querySelector('.upload-content');
const uploadSection = document.querySelector('.upload-section');
const fileInput = document.getElementById('fileInput');
const OldImage = document.querySelector('.before-image img');
const newImagePreview = document.querySelector('.after-image img');
const loaderAnimation = document.querySelector('.loader');
const processingSection = document.querySelector('.process-section');
const bgRemoveBtn = document.getElementById('remove-bg-btn');
const download_btn = document.getElementById('download-btn');

const formData = new FormData();

bgRemoveBtn.disabled = true;
download_btn.disabled = true;

let download_URL = null;
let uploadedFileName = "";

fileInput.onchange = () => {
    const file = fileInput.files[0];
    if (file) {
        uploadedFileName = file.name.split('.').slice(0, -1).join('.') || "new-img";
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            image.src = e.target.result;
            OldImage.src = e.target.result;
        }
        fileReader.readAsDataURL(file);

        formData.set('image_file', file);
        formData.set('size', 'auto');

        imagePreview.style.display = "block";
        uploadContent.style.display = "none";
        uploadSection.style.borderColor = "#93c5fd";

        bgRemoveBtn.disabled = false;
        download_btn.disabled = true;
    } else {
        bgRemoveBtn.disabled = true;
        download_btn.disabled = true;
    }
};

const WEB_URL = "https://api.remove.bg/v1.0/removebg";
const API_KEY = "cmuGQ3oLSuh35s7UBQ5N4kPu";

const removeBackground = async () => {
    const response = await fetch(WEB_URL, {
        method: "POST",
        headers: { 'X-Api-key': API_KEY },
        body: formData,
    });

    if (!response.ok) {
        alert("Failed to process image.");
        return;
    }

    const newImage = await response.blob();
    const newImage_URL = URL.createObjectURL(newImage);
    download_URL = newImage_URL;

    setTimeout(() => {
        loaderAnimation.style.display = "none";
        newImagePreview.src = newImage_URL;
        newImagePreview.style.display = "block";
        download_btn.disabled = false;
    }, 1500);
};

bgRemoveBtn.addEventListener('click', () => {
    uploadContent.style.display = "none";
    processingSection.style.display = "flex";
    imagePreview.style.display = "none";
    bgRemoveBtn.disabled = true;
    OldImage.style.display = "block";
    removeBackground();
});

download_btn.addEventListener('click', () => {
    if (!download_URL) return;

    const anchorTag = document.createElement('a');
    anchorTag.href = download_URL;
    anchorTag.download = `${uploadedFileName}.png`;
    document.body.appendChild(anchorTag);
    anchorTag.click();
    document.body.removeChild(anchorTag);

    // Reset to upload section after download
    setTimeout(() => {
        fileInput.value = "";
        formData.delete('image_file');
        formData.delete('size');
        download_URL = null;
        uploadedFileName = "";
        imagePreview.style.display = "none";
        newImagePreview.style.display = "none";
        OldImage.style.display = "none";
        processingSection.style.display = "none";
        uploadContent.style.display = "block";
        uploadSection.style.borderColor = "#ccc";
        bgRemoveBtn.disabled = true;
        download_btn.disabled = true;
    }, 1000);
});
