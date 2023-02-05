
window.addEventListener("load", function () {
    var ws = new WebSocket('ws://192.168.1.37:7000');

    // Set up the message input element and the send button
    const userIdInput = document.getElementById('userid-input');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');

    // Set up the message history element
    const messageHistory = document.getElementById('message-history');

    ws.onmessage = function (event) {
        console.log(event.data)
        const message = JSON.parse(event.data)
        messageHistory.innerHTML += (`<div class='message'><div class='${message.userId === userIdInput.value ? "sender" : "receiver"}'><div class="senderID">@${message.userId}</div>${message.message}</div>`);
    };

    // Set up a click event handler for the send button
    sendButton.addEventListener('click', () => {
        const userId = userIdInput.value;
        const message = messageInput.value;

        if (userId.trim() === "") {
            alert("Please insert a userId!");
            return;
        }
        if (message.trim() === "") {
            alert("Please insert a message!");
            return;
        }

        ws.send(JSON.stringify({ message, userId }))
        messageInput.value = '';
    });
});