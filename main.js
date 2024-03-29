Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});
camera = document.getElementById("camera");

Webcam.attach('#camera');


function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';
    });
}
console.log('ml5 version', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/IENOfbcVU/model.json',modelLoaded);

function modelLoaded() {
    console.log('model Loaded')
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "The first Predicition is" + prediction_1;
    speak_data_1 = "And the second Predicition is" + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function check() {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_object_name").innerHTML = results[0].label;
        gesture = results[0].label;
        if (gesture == "Amazing") {
            document.getElementById("result_object_gesture_icon").innerHTML = "&#128076;";
            speak_data = "This is looking amazing";
            speak();
        } else if (gesture == "All the best") {
            document.getElementById("result_object_gesture_icon").innerHTML = "&#128077;";
            speak_data = "All the best";
            speak();
        } else if (gesture == "Victory") {
            document.getElementById("result_object_gesture_icon").innerHTML = "&#9996;";
            speak_data = "That was the marvelous victory";
            speak();
        }
    }
}