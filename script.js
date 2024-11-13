// Cấu hình EmailJS
        (function() {
            emailjs.init("ru1XIJTXkpe62i_bi");  // Thay "YOUR_USER_ID" bằng ID từ EmailJS của bạn
        })();

        function sendNotification(buttonID) {
            // Thông tin email
            var emailParams = {
                to_email: "phuocdangvan342@outlook.com.vn",  // Thay bằng địa chỉ Gmail của bạn
                subject: "Thông báo từ Button " + buttonID,
                message: "Honey muốn " + buttonID
            };

            // Gửi email qua EmailJS
            emailjs.send("service_i0nclqj", "template_69nzdju", emailParams)
            .then(function(response) {
               alert("Đã gửi thông báo!");
            }, function(error) {
               alert("Gửi thông báo thất bại, thử lại!");
               console.error("Lỗi gửi email:", error);
            });
        }