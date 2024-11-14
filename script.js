// Khởi tạo EmailJS với Service ID của bạn
(function() {
  emailjs.init("mhhjWMt4JKT_QMCeKaaas"); // Thay Service ID của bạn vào đây
})();

let currentButtonID = ''; // Biến lưu trạng thái của button được nhấn

// Mở modal khi nhấn vào Button 1 hoặc Button 2
function openCustomPrompt(buttonID) {
  if (buttonID === 'button1' || buttonID === 'button2') {
    currentButtonID = buttonID; // Lưu lại nút hiện tại
    document.getElementById('myModal').style.display = 'block'; // Hiển thị modal
  } else {
    sendNotification(buttonID);  // Gửi thông báo tự động cho các button khác
  }
}

// Đóng modal khi người dùng hoàn thành
function closeCustomPrompt() {
  document.getElementById('myModal').style.display = 'none'; // Ẩn modal
}

// Hàm gửi gợi ý khi người dùng nhập vào
function submitSuggestion() {
  const suggestion = document.getElementById('suggestionInput').value; // Lấy gợi ý từ input
  sendNotification(currentButtonID, suggestion); // Gửi thông báo với gợi ý
  closeCustomPrompt(); // Đóng modal
}

// Hàm gửi yêu cầu giúp đỡ khi nhấn vào helpButton
function sendHelpRequest() {
  sendNotification("helpButton"); // Gửi thông báo cho helpButton
  closeCustomPrompt(); // Đóng modal
}

// Hàm gửi thông báo qua EmailJS
function sendNotification(buttonID, suggestion = "") {
  let messageContent = "";

  // Xác định thông báo dựa trên ID của nút
  switch (buttonID) {
    case 'button1': 
      messageContent = "Em đói rồi!";
      if (suggestion) { 
        messageContent += ` - Gợi ý: ${suggestion}`; 
      }
      break;
    case 'button2': 
      messageContent = "Em muốn uống gì đó!";
      if (suggestion) { 
        messageContent += ` - Gợi ý: ${suggestion}`;    
      }
      break;
    case 'button3': 
      messageContent = "Honey muốn đi chơi"; 
      break;
    case 'button4': 
      messageContent = "Hòa muốn gọi"; 
      break;
    case 'button5': 
      messageContent = "Hòa muốn xem phim"; 
      break;
    case 'button6': 
      messageContent = "Hòa nhớ bạn kìa"; 
      break;
    case 'helpButton': 
      // Thông báo tùy chỉnh cho helpButton
      if (currentButtonID === "button1") {
        messageContent = "Em đói rồi! Mà em ko biết ăn gì cả"; 
      } else if (currentButtonID === "button2") {
        messageContent = "Em muốn uống gì đó! mà em hông biết nên uống gì cả"; 
      }
      break;
    default: 
      messageContent = "Không xác định"; 
      break;
  }

  // Thiết lập các tham số email
  const emailParams = {
    to_email: "phuocdangvan342@outlook.com.vn",  // Địa chỉ email nhận thông báo
    subject: "Thông báo từ Button " + buttonID,
    message: "Honey muốn " + messageContent
  };

  // Gửi thông báo qua EmailJS
  emailjs.send("service_m13uhin", "template_xzyam56", emailParams)
    .then(function(response) {
      showAlert("Anh đã nhận được yêu cầu rồi nhé!", "success"); // Thông báo thành công
    }, function(error) {
      showAlert("Gửi thông báo thất bại, thử lại! Em nhớ kiểm tra lại kết nối mạng nhé", "error"); // Thông báo lỗi
      console.error("Lỗi gửi email:", error);
    });
}

// Hàm hiển thị thông báo trên giao diện
function showAlert(message, type,) {
  const alertBox = document.getElementById("alertBox"); // Lấy phần tử thông báo
  alertBox.innerText = message; // Hiển thị thông điệp
  alertBox.className = "alert " + (type === "success" ? "alert-success" : "alert-error"); // Xử lý kiểu thông báo
  alertBox.style.display = "block"; // Hiển thị thông báo
  alertBox.style.opacity = 1;
  setTimeout(() => {
    alertBox.style.opacity = 0; // Ẩn thông báo sau 3 giây
    setTimeout(() => {
      alertBox.style.display = "none"; // Ẩn thông báo hoàn toàn
    }, 500);
  }, 6000);
}
