document.addEventListener("DOMContentLoaded", function () {
  // Tham chiếu đến các phần tử
  const curriculumHeaders = document.querySelectorAll(".curriculum-header");
  const curriculumItems = document.querySelectorAll(".curriculum-item");

  // Toggle curriculum items
  curriculumHeaders.forEach((header) => {
    header.addEventListener("click", function () {
      const parentItem = this.parentElement;
      const isActive = parentItem.classList.contains("active");

      // Close all items
      document.querySelectorAll(".curriculum-item").forEach((item) => {
        item.classList.remove("active");
      });

      // Open clicked item if it wasn't active before
      if (!isActive) {
        parentItem.classList.add("active");
      }
    });
  });

  // Khởi tạo khi trang tải xong
  window.addEventListener("load", function () {
    // Mở phần đầu tiên mặc định
    if (curriculumHeaders.length > 0) {
      const firstItem = curriculumHeaders[0].parentElement;
      firstItem.classList.add("active");
    }
  });
});

// Countdown Timer Function - Sử dụng giá trị có sẵn trên giao diện
function startCountdown() {
  // Lấy giá trị ban đầu từ các phần tử HTML
  let initialDays = parseInt(document.getElementById("days").textContent) || 23;
  let initialHours =
    parseInt(document.getElementById("hours").textContent) || 18;
  let initialMinutes =
    parseInt(document.getElementById("minutes").textContent) || 26;
  let initialSeconds =
    parseInt(document.getElementById("seconds").textContent) || 16;

  // Chuyển đổi thành tổng số giây
  let countDownTime =
    initialDays * 24 * 60 * 60 +
    initialHours * 60 * 60 +
    initialMinutes * 60 +
    initialSeconds;

  // Giá trị ban đầu để reset khi đếm về 0
  const initialCountdown = countDownTime;

  // Cập nhật đếm ngược mỗi giây
  const countdownTimer = setInterval(function () {
    // Tính toán số ngày, giờ, phút, giây còn lại
    const days = Math.floor(countDownTime / (60 * 60 * 24));
    const hours = Math.floor((countDownTime % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((countDownTime % (60 * 60)) / 60);
    const seconds = Math.floor(countDownTime % 60);

    // Hiển thị kết quả
    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours
      .toString()
      .padStart(2, "0");
    document.getElementById("minutes").textContent = minutes
      .toString()
      .padStart(2, "0");
    document.getElementById("seconds").textContent = seconds
      .toString()
      .padStart(2, "0");

    // Giảm thời gian
    countDownTime--;

    // Khi đếm ngược đến 0, đặt lại bộ đếm (vô hạn)
    if (countDownTime < 0) {
      countDownTime = initialCountdown; // Reset về giá trị ban đầu
    }
  }, 1000);
}

// Start countdown khi trang đã tải xong
window.addEventListener("load", function () {
  startCountdown();
});

// Cập nhật hàm createFallingMoney để tiền rơi nhanh và đều
function createFallingMoney() {
  const container = document.querySelector(".money-animation-container");
  const sectionHeight = document.querySelector(
    ".testimonial-section"
  ).offsetHeight;

  // Số lượng đồng tiền
  const moneyCount = 20; // Thêm số lượng để hiệu ứng phong phú hơn

  for (let i = 0; i < moneyCount; i++) {
    // Tạo đồng tiền
    const money = document.createElement("div");
    money.classList.add("money");

    // Đặt kích thước ngẫu nhiên trong khoảng hợp lý
    const size = Math.random() * 10 + 20; // 20-30px
    money.style.width = `${size}px`;
    money.style.height = `${size}px`;

    // Đặt vị trí khởi đầu ngẫu nhiên
    const startLeftPosition = Math.random() * 100;
    money.style.left = `${startLeftPosition}%`;
    money.style.top = `-${size}px`;

    // Đặt animation với tốc độ nhanh và ít delay
    // Thời gian ngắn hơn: 3-5 giây
    const duration = Math.random() * 2 + 3; // 3-5 giây, nhanh hơn nhiều
    const delay = Math.random() * 2; // 0-2 giây delay, ngắn hơn
    money.style.animation = `moneyFall ${duration}s linear infinite ${delay}s`;

    // Đặt background
    money.style.backgroundImage = "url('./assets/img/money-icon.png')";
    money.style.backgroundSize = "contain";
    money.style.backgroundRepeat = "no-repeat";
    money.style.position = "absolute";
    money.style.opacity = Math.random() * 0.3 + 0.5; // 0.5-0.8 opacity
    money.style.pointerEvents = "none";
    money.style.zIndex = "1";

    // Thêm vào container
    container.appendChild(money);
  }
}

// Chạy hiệu ứng khi trang tải xong
window.addEventListener("load", function () {
  createFallingMoney();
});
