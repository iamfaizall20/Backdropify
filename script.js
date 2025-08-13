// Selecting Elements from HTML
const imagePreview = document.querySelector('.image-preview');
const image = document.querySelector('.image-preview img');
const uploadContent = document.querySelector('.upload-content');
const uploadSection = document.querySelector('.upload-section');
const fileInput = document.getElementById('fileInput');

fileInput.onchange = () => {
    const file = fileInput.files[0];
    const fileReader = new FileReader();
    fileReader.onload = (e) => image.src = e.target.result;
    fileReader.readAsDataURL(file);

    imagePreview.style.display = "block";
    uploadContent.style.display = "none";
    uploadSection.style.borderColor = "#93c5fd";
}