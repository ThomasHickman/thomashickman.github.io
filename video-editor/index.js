const previewHeight = 280;
function error(message) {
    alert(message);
}
var supportedFiles = new Set([
    "video/mp4"
]);
function drawDropZone() {
    var dropZone = document.getElementById("video-drop-zone");
    dropZone.addEventListener("dragenter", () => {
        dropZone.classList.add("hover");
    });
    dropZone.addEventListener("dragover", event => {
        event.preventDefault();
        event.stopPropagation();
        event.dataTransfer.dropEffect = 'copy';
    }, false);
    dropZone.addEventListener("dragleave", () => {
        dropZone.classList.remove("hover");
    });
    dropZone.addEventListener("drop", event => {
        console.log("drop");
        dropZone.classList.remove("hover");
        event.preventDefault();
        event.stopPropagation();
        if (event.dataTransfer.files.length > 1) {
            error("Can only process 1 file at a time");
            return;
        }
        var file = event.dataTransfer.files[0];
        if (supportedFiles.has(file.type)) {
            dropZone.parentNode.removeChild(dropZone);
        }
    }, false);
}
function displayVideo(url) {
    var preview = document.getElementById("preview");
    var videoHolder = document.getElementById("video-holder");
    videoHolder.src = url;
    videoHolder.addEventListener("loadeddata", () => {
        function renderImage() {
            var ctx = preview.getContext("2d");
            ctx.drawImage(videoHolder, 0, 0, previewWidth, previewHeight);
        }
        var previewWidth = (previewHeight / videoHolder.videoHeight) * videoHolder.videoWidth;
        preview.height = previewHeight;
        preview.width = previewWidth;
        setInterval(renderImage, 0);
        videoHolder.muted = true;
        videoHolder.play();
    });
}
$(() => {
    displayVideo("../test.mp4");
});
