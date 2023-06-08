const elVideo = document.getElementById('video')

navigator.getMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia)

const cargarCamera = () => {
    navigator.getMedia(
        {
            video: true,
            audio: false
        },
        stream => elVideo.srcObject = stream,
        console.error
    )
}

//CARGAR MODELOS
Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
    faceapi.nets.ageGenderNet.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceLandmark68TinyNet.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
    faceapi.nets.tinyFaceDetector.loadFromUri('/models')
]).then(cargarCamera)

elVideo.addEventListener('play', async () => {
    //CREAMOS EL CANVAS CON LOS ELEMENTOS DE LA FACE API
    const canvas = faceapi.createCanvasFromMedia(elVideo)
    //LO AÑADIMOS AL BODY
    document.body.appened(canvas)

    //TAMAÑO DEL CANVAS
    const displaySize = { with: elVideo.with, height: elVideo.height }
    faceapi.matchDimensions(canvas, displaySize)

    setInterval(async() => {
        //HACER LAS DETECCIONES DE CARA
        const detections = await faceapi.detectAllFaces(elVideo)
            .withFacecLandmarks()
            .withFaceExpressions()
            .withAgeAndGender()
            .withFaceDescriptors()
        
        //PONERLAS EN SU SITIO
        const resizedDetections = faceapi.resizeResults(detections, displaySize)

        //Limpiar el canvas
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
        
        //dibujar las lineas
        faceapi.draw.drawDetections(canvas, resizedDetections)
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections)

        resizedDetections.forEach(detection => {
            const box = detection.detection.box
            new faceapi.draw.DrawBox(box, {
                label: Math.round(detection.age) + ' años ' + detection.gender 
            }).draw(canvas)
        })
    })
})