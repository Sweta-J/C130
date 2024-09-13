song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.position(350, 200);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded() {
    console.log("PoseNet Is Initialized");
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("Score of left wrist: " + scoreLeftWrist);
        console.log("Score of right wrist: " + scoreRightWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("X value of left wrist is " + leftWristX + "Y value of left wrist is " + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("X value of right wrist is " + rightWristX + "Y value of right wrist is " + rightWristY);
    }
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("red");
    stroke("red");
    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        leftWristY1 = Number(leftWristY); 
        leftWristY2 = floor(leftWristY1);
        volume = leftWristY2/500
        document.getElementById("volume").innerHTML = "Volume: " + volume;
        song.setVolume(volume);
    }
    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        rightWristY1 = Number(rightWristY); 
        rightWristY2 = rightWristY1/100
        rightWristY3 = ceil(rightWristY1);
        speed = rightWristY3/2
        document.getElementById("speed").innerHTML = "Speed: " + speed;
        song.rate(speed);
    }
}