//import { signalR } from "./signalr";
"use strict";
var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

$("#sendButton").prop('disabled', true); 

connection.on("SendMessageAllClients", (user, message) => {

    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var encodedMsg = "<strong>"+user + ": </strong>"+ msg;
    var li = document.createElement("li");
    li.innerHTML = encodedMsg;
    console.log(li);
    $("#messageList").append(li);

});


connection.start().then(() => {
    $("#sendButton").prop('disabled',false);
}).catch((err) => {
    return console.log(err.toString());
})


$("#sendButton").click((event) => {

    var user = $("#userInput").val();
    var message = $("#messageInput").val();
    connection.invoke("SendMessage", user, message).catch((err) => {
        return console.log(err.toString());
    });
    event.preventDefault();
})
