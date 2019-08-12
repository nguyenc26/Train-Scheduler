var firebaseConfig = {
    apiKey: "AIzaSyBzIDn_Hbn9NdSZRgzQ1aSnCf8sKy0G7is",
    authDomain: "someprojectidk1.firebaseapp.com",
    databaseURL: "https://someprojectidk1.firebaseio.com",
    projectId: "someprojectidk1",
    storageBucket: "",
    messagingSenderId: "926431109049",
    appId: "1:926431109049:web:626f5794f85c19eb"
};
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

$("#submit").on("click", function () {
    var trainName = $('#trainName').val().trim();
    var Destination = $('#destination').val().trim();
    var trainTime = $('#trainTime').val().trim();
    var trainFrequency = $('#frequency').val().trim();
    var nextArrival
    var minAway

    database.ref().push({
        trainName: trainName,
        Destination: Destination,
        trainTime: trainTime,
        trainFrequency: trainFrequency,
        nextArrival: nextArrival,
        minAway: minAway
    })

    $('#trainName').val("");
    $('#destination').val("");
    $('#trainTime').val("");
    $('#frequency').val("");

})
console.log(trainName);

database.ref().on("child_added", function (snapshot) {
    var newTrain = snapshot.val();
    var newTR = $("<tr>");
    var newtrainName = $("<td>");
    var newDestination = $("<td>");
    var newtrainTime = $("<td>");
    var newtrainFrequency = $("<td>");
    var newnextArrival = $("<td>");
    var newminAway = $("<td>");

    newtrainName.text(newTrain.trainName);
    newDestination.text(newTrain.Destination);
    newtrainTime.text(newTrain.trainTime);
    newtrainFrequency.text(newTrain.trainFrequency);
    newnextArrival.text(newTrain.nextArrival);
    newminAway.text(newTrain.minAway);


    $(newTR).append(newtrainName);
    $(newTR).append(newDestination);
    $(newTR).append(newtrainTime);
    $(newTR).append(newtrainFrequency);
    $(newTR).append(newnextArrival);
    $(newTR).append(newminAway);
    $("table").append(newTR);
})