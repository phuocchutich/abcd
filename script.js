(function() {
  emailjs.init("ru1XIJTXkpe62i_bia");
})();

let currentButtonID = '';

function openCustomPrompt(buttonID) {
  // Chỉ mở modal cho Button 1 và Button 2
  if (buttonID === 'button1' || buttonID === 'button2') {
    currentButtonID = buttonID;
    document.getElementById('myModal').style.display = 'block';
  } else {
    sendNotification(buttonID);  // Tự động gửi thông báo cho các nút khác
  }
}

function closeCustomPrompt() {
  document.getElementById('myModal').style.display = 'none';
}

function submitSuggestion() {
  const suggestion = document.getElementById('suggestionInput').value;
  sendNotification(currentButtonID, suggestion);
  closeCustomPrompt();
}

function sendHelpRequest() {
  sendNotification("helpButton", "Em không biết");
  closeCustomPrompt();
}

function sendNotification(buttonID, suggestion = "") {
  let messageContent = "";

  switch (buttonID) {
    case 'button1': 
      messageContent = "Em đói rồi!"; 
      if (suggestion) { 
        messageContent += ` - Gợi ý: <i>${suggestion}</i>`; 
      } 
      break;
    case 'button2': 
      messageContent = "Em muốn uống gì đó."; 
      if (suggestion) { 
        messageContent += ` - Gợi ý: <i>${suggestion}</i>`; 
      } 
      break;
    case 'button3': messageContent = "Hòa muốn đi chơi"; break;
    case 'button4': messageContent = "Hòa muốn gọi"; break;
    case 'button5': messageContent = "Hòa muốn xem phim"; break;
    case 'button6': messageContent = "Hòa nhớ bạn kìa"; break;
    case 'helpButton': 
    case 'button1': 
      messageContent = "Em đói rồi! Em không biết."; 
      if (suggestion) { 
        messageContent += ` - Gợi ý: <i>${suggestion}</i>`; 
      } 
      break;
    case 'button2': 
      messageContent = "Em muốn uống gì đó! Em không biết."; 
      if (suggestion) { 
        messageContent += ` - Gợi ý: <i>${suggestion}</i>`; 
      } 
      break;
    default: 
      messageContent = "Không xác định"; 
      break;
  }

  const emailParams = {
    to_email: "phuocdangvan342@outlook.com.vn",
    subject: "Thông báo từ Button " + buttonID,
    message: "Honey muốn " + messageContent
  };

  emailjs.send("service_i0nclqj", "template_69nzdju", emailParams)
    .then(function(response) {
      showAlert("Anh đã nhận được yêu cầu rồi nhé!", "success");
    }, function(error) {
      showAlert("Gửi thông báo thất bại, thử lại! Em nhớ kiểm tra lại kết nối mạng nhé", "error");
      console.error("Lỗi gửi email:", error);
    });
}

function showAlert(message, type) {
  const alertBox = document.getElementById("alertBox");
  alertBox.innerText = message;
  alertBox.className = "alert " + (type === "success" ? "alert-success" : "alert-error");
  alertBox.style.display = "block";
  alertBox.style.opacity = 1;
  setTimeout(() => {
    alertBox.style.opacity = 0;
    setTimeout(() => {
      alertBox.style.display = "none";
    }, 500);
  }, 3000);
}
