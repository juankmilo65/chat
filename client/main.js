var socket = io.connect("https://chat-sockets-test.herokuapp.com", {
  forceNew: true,
});
socket.on("messages", function (data) {
  console.log(data);
  render(data);
});

function render(data) {
  var html = data
    .map(function (message, index) {
      return `
      <div class="message">
        <strong>${message.nickName}</strong> dice:
        <p>${message.text}</p>
    </div>`;
    })
    .join(" ");
  var divMsgs = document.getElementById("messages");

  divMsgs.innerHTML = html;
  divMsgs.scrollTo = divMsgs.scrollHeight;
}

function addMessage(e) {
  var message = {
    text: document.getElementById("text").value,
    nickName: document.getElementById("nickname").value,
  };

  document.getElementById("nickname").style.display = "none";
  socket.emit("add-message", message);
  return false;
}
