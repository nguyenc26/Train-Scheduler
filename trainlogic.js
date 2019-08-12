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
    var firstArrival = $('#trainTime').val().trim();
    var tFrequency = $('#frequency').val().trim();


    database.ref().push({
        DatatrainName: trainName,
        Datadestination: Destination,
        DatafirstArrival: firstArrival,
        DatatFrequency: tFrequency,
        Timestamp: firebase.database.ServerValue.TIMESTAMP,
    })

    clear();
})

database.ref().on("child_added", function (snapshot) {
    var snapName = snapshot.val().DatatrainName;
    var snapDest = snapshot.val().Datadestination;
    var snapFreq = snapshot.val().DatatFrequency;
    var snapArrival = snapshot.val().DatafirstArrival;

    //  Convert Time and configure for Future use by pushing firstArrival back 1 year
    var firstArrivalConverted = moment(snapArrival, "hh:mm A").subtract(1, "years");
    //  Calculate now vs First Arrival
    var diff = moment().diff(moment(firstArrivalConverted), "minutes");
    var left = diff % snapFreq;
    //  How long till train
    var timeLeft = snapFreq - left;
    var newArrival = moment().add(timeLeft, "m").format("hh:mm A");

    $(".table").append("<tr><td>" + snapName + "</td><td>" + snapDest + "</td><td>" + snapFreq + "</td><td>" +
        newArrival + "</td><td>" + timeLeft + "</td></tr>");

})

function clear() {
    $('#trainName').val("");
    $('#destination').val("");
    $('#trainTime').val("");
    $('#frequency').val("");
}
