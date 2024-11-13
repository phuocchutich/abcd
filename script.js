 // Cấu hình EmailJS
        (function() {
            emailjs.init("ru1XIJTXkpe62i_bi");  // Thay "YOUR_USER_ID" bằng ID từ EmailJS của bạn
        })();

        function sendNotification(buttonID) {
            var messageContent = "";  // Khởi tạo biến chứa nội dung thông báo

            // Điều chỉnh thông điệp tùy thuộc vào button được nhấn
            switch(buttonID) {
                case 'button1':
                    messageContent = "Hòa đói rồi";  // Nội dung cho button 1
                    break;
                case 'button2':
                    messageContent = "Hòa muốn uống gì đó ";  // Nội dung cho button 2
                    break;
                case 'button3':
                    messageContent = "Hòa muốn đi chơi";  // Nội dung cho button 3
                    break;
                    case 'button4':
                    messageContent = "Hòa muốn gọi";  // Nội dung cho button 3
                    break;
                    case 'button5':
                    messageContent = "Hòa muốn xem phim";  // Nội dung cho button 3
                    break;
                    case 'button6':
                    messageContent = "Hòa nhớ bạn kìa";  // Nội dung cho button 3
                    break;
                default:
                    messageContent = "Không xác định";  // Thông điệp mặc định nếu không có button nào khớp
                    break;
            }

            // Thông tin email
            var emailParams = {
                to_email: "phuocdangvan342@outlook.com.vn",  // Địa chỉ email nhận thông báo
                subject: "Thông báo từ Button " + buttonID,
                message: "Honey muốn " + messageContent
            };

            // Gửi email qua EmailJS
            emailjs.send("service_i0nclqj", "template_69nzdju", emailParams)
            .then(function(response) {
               showAlert("Anh đã nhận được yêu cầu rồi nhé!", "success");
            }, function(error) {
               showAlert("Gửi thông báo thất bại, thử lại!", "error");
               console.error("Lỗi gửi email:", error);
            });
        }

        // Hiển thị thông báo thành công hoặc thất bại
        function showAlert(message, type) {
            var alertBox = document.getElementById("alertBox");
            alertBox.innerText = message;
           
            alertBox.className = "alert" + (type === "success" ? "success" : "error");
            alertBox.style.display = "inline-block";  // Hiển thị thông báo
        }