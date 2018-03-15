var subscription = null;

function showTweet(tweet) {
    var JSONtweet = JSON.parse(tweet.body);
    $("#resultsBlock").append(Mustache.render(template, JSONtweet));
}

function registerTemplate() {
    template = $("#template").html();
    Mustache.parse(template);
}

function connect() {
    var socket = new SockJS('/twitter');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
    });
}

function registerSearch() {
    $("#search").submit(function(event) {
        event.preventDefault();
        var target = $(this).attr('action');
        var query = $("#q").val();

        if (subscription != null) {
            $("#resultsBlock").empty();
            subscription.unsubscribe();
        }

        stompClient.send("/app/" + target, {}, query);
        subscription = stompClient.subscribe('/queue/search/' + query, showTweet);
    });
}

$(document).ready(function() {
    registerTemplate();
    connect();
    registerSearch();
});