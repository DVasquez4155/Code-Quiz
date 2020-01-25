var scores = getScores();
// scores = [
//     ['Mark', 20],
//     ['Jacob', 18],
//     ['Larry', 19],
//     ['Larry', 20],
//     ]

// Retrieves the score
function getScores() {
    var retrievedObject = localStorage.getItem('scores');
    if (retrievedObject == null) {
        return [];
    }
    return JSON.parse(retrievedObject);
}

// Update Scores
function updateScores() {
    var sortedScores = [];
    sort().forEach(function(user) {
        sortedScores.push(user[0]);
    })
    scores = sortedScores;
    localStorage.setItem('scores', JSON.stringify(sortedScores));
}
function clearScores() {
    scores = [];
    localStorage.setItem('scores', JSON.stringify(scores));
    displayScores();
}
function displayScores() {
    clear();
    var title = document.createElement('h1');
    title.innerHTML = 'Highscores';
    $("#main").append(title);
    $("#main").append(document.createElement('br'));

    $("#main").append('<table class="table table-striped"><thead><tr><th scope="col">#</th><th scope="col">User</th><th scope="col">Score</th></tr></thead><tbody id="table"></tbody></table>');
    Object.keys(scores).forEach(function(user) {
        if (scores == 0) {
            return;
        }
        var trElement = document.createElement('tr');
        trElement.setAttribute('id',user);
        $("#table").append(trElement);
        
        $("#" + user).append("<td>" +  (parseInt(user) + 1) + "</td>");
        scores[user].forEach(function(text){
            $("#" + user).append("<td>" +  text + "</td>");
        })
    });
    // scores.foreach(addScore);
    $("#main").append(document.createElement('br'));
    
    $("#main").append('<button type="button" onclick="displayHome()" class="btn btn-primary">Go Back</button>');
    $("#main").append("&nbsp;");
    $("#main").append('<button type="button" onclick="clearScores()" class="btn btn-primary">Clear Highscoress</button>');
}
function addScore() {
    var initials = $("#initials").val();
    if (initials == "") {
        $("#title").html("Please enter an initial");
        return;
    }
    

    scores.push([initials, timeleft]);
    updateScores();
    displayScores();
}
function sort() {
    var sortable = [];
    
    Object.keys(scores).forEach(function(user) {
        sortable.push([scores[user], scores[user][1]]);
    });
    sortable.sort(function(a, b) {
        return b[1] - a[1];
    });
    return sortable;
}