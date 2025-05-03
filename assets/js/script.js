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

// Cập nhật hàm createFallingMoney để tiền rơi chậm và mượt hơn
function createFallingMoney() {
  const container = document.querySelector(".money-animation-container");
  const sectionHeight = document.querySelector(
    ".testimonial-section"
  ).offsetHeight;

  // Số lượng đồng tiền giảm xuống để tránh quá nhiều
  const moneyCount = 15;

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

    // Đặt animation với tốc độ CHẬM hơn nhiều
    // Thời gian dài hơn: 15-25 giây
    const duration = Math.random() * 10 + 15; // 15-25 giây, chậm hơn nhiều
    const delay = Math.random() * 5; // 0-5 giây delay, dài hơn
    money.style.animation = `moneyFall ${duration}s linear infinite ${delay}s`;

    // Đặt background
    money.style.backgroundImage = "url('./assets/img/money-icon.png')";
    money.style.backgroundSize = "contain";
    money.style.backgroundRepeat = "no-repeat";
    money.style.position = "absolute";
    money.style.opacity = Math.random() * 0.3 + 0.2; // 0.2-0.5 opacity, mờ hơn
    money.style.pointerEvents = "none";
    money.style.zIndex = "1";

    // Thêm chuyển động lắc nhẹ khi rơi
    const wiggle = Math.random() * 2 - 1; // -1 đến 1
    money.style.transform = `rotate(${Math.random() * 360}deg)`;
    money.style.animationTimingFunction = "ease-in-out";

    // Thêm vào container
    container.appendChild(money);
  }
}

// Chạy hiệu ứng khi trang tải xong
window.addEventListener("load", function () {
  createFallingMoney();
});

// Scroll Telling functionality - Fixed & Enhanced Version
function initScrollTelling() {
  const container = document.querySelector(".scroll-container");
  if (!container) return;

  const progressFill = document.querySelector(".progress-fill");
  const progressPoints = document.querySelectorAll(".progress-point");
  const sections = document.querySelectorAll(".scroll-section-item");

  if (!sections.length || !progressPoints.length || !progressFill) return;

  // Thiết lập ban đầu: tất cả các sections hiển thị nhưng mờ
  sections.forEach((section) => {
    section.style.opacity = "0.3";
    section.style.transform = "translateY(20px)";
  });

  // Đánh dấu section đầu tiên là active
  if (sections.length > 0) {
    sections[0].classList.add("active");
    sections[0].style.opacity = "1";
    sections[0].style.transform = "translateY(0)";
  }

  // Cập nhật section active và progress
  function updateActiveSection(index) {
    // Cập nhật progress points
    progressPoints.forEach((point, i) => {
      point.classList.toggle("active", i === index);
      point.classList.toggle("passed", i < index);
    });

    // Cập nhật sections với hiệu ứng fade
    sections.forEach((section, i) => {
      // Nếu là section hiện tại, hiện lên
      if (i === index) {
        section.classList.add("active");
        section.style.opacity = "1";
        section.style.transform = "translateY(0)";
      } else {
        // Nếu không phải section hiện tại, làm mờ đi
        section.classList.remove("active");
        section.style.opacity = "0.3";
        section.style.transform = "translateY(20px)";
      }
    });

    // Cập nhật progress fill
    const progress = (index + 1) / progressPoints.length;
    if (window.innerWidth <= 992) {
      progressFill.style.width = `${progress * 100}%`;
      progressFill.style.height = "100%";
    } else {
      progressFill.style.height = `${progress * 100}%`;
      progressFill.style.width = "100%";
    }
  }

  // Xử lý click vào progress points
  progressPoints.forEach((point, index) => {
    point.addEventListener("click", () => {
      // Cập nhật active section
      updateActiveSection(index);

      // Tính toán vị trí chính xác để scroll đến
      const section = sections[index];

      // Lấy vị trí của section so với top của document
      const sectionTop = getElementOffset(section).top;

      // Trừ thêm offset (khoảng cách từ top) để section hiển thị đẹp hơn
      const scrollOffset = 100; // Có thể điều chỉnh khoảng cách này

      // Scroll đến vị trí của section
      window.scrollTo({
        top: sectionTop - scrollOffset,
        behavior: "smooth", // Tạo hiệu ứng scroll mượt mà
      });
    });
  });

  // Theo dõi scroll để cập nhật UI
  function handleScroll() {
    // Lấy vị trí hiện tại của viewport
    const viewportMiddle = window.scrollY + window.innerHeight / 2;

    // Tính toán vị trí của container
    const containerTop = getElementOffset(container).top;
    const containerBottom = containerTop + container.offsetHeight;

    // Tính toán progress dựa trên vị trí scroll
    let scrollProgress = 0;
    if (viewportMiddle >= containerTop && viewportMiddle <= containerBottom) {
      scrollProgress =
        (viewportMiddle - containerTop) / (containerBottom - containerTop);
      scrollProgress = Math.min(1, Math.max(0, scrollProgress));

      // Cập nhật progress fill
      if (window.innerWidth <= 992) {
        progressFill.style.width = `${scrollProgress * 100}%`;
      } else {
        progressFill.style.height = `${scrollProgress * 100}%`;
      }

      // Tính toán section active dựa trên progress
      const sectionCount = sections.length;
      const sectionHeight = container.offsetHeight / sectionCount;
      const activeSectionIndex = Math.min(
        Math.floor(scrollProgress * sectionCount),
        sectionCount - 1
      );

      // Cập nhật UI
      updateActiveSection(activeSectionIndex);
    }
  }

  // Helper function để lấy offset của element
  function getElementOffset(element) {
    let top = 0;
    let left = 0;
    let currentElement = element;

    // Loop through the DOM tree
    while (currentElement) {
      top += currentElement.offsetTop || 0;
      left += currentElement.offsetLeft || 0;
      currentElement = currentElement.offsetParent;
    }

    return {
      top,
      left,
    };
  }

  // Optimize scroll handler with requestAnimationFrame
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Thêm xử lý resize
  window.addEventListener("resize", () => {
    // Tìm section hiện tại
    const activeIndex = Array.from(sections).findIndex((section) =>
      section.classList.contains("active")
    );

    // Cập nhật lại progress
    if (activeIndex >= 0) {
      const progress = (activeIndex + 1) / sections.length;
      if (window.innerWidth <= 992) {
        progressFill.style.width = `${progress * 100}%`;
        progressFill.style.height = "100%";
      } else {
        progressFill.style.height = `${progress * 100}%`;
        progressFill.style.width = "100%";
      }
    }
  });

  // Khởi tạo trạng thái ban đầu
  updateActiveSection(0);

  // Kích hoạt scroll event để thiết lập UI ban đầu
  setTimeout(() => {
    handleScroll();
    window.dispatchEvent(new Event("scroll"));
  }, 200);
}

// Thêm vào DOM ready event
document.addEventListener("DOMContentLoaded", function () {
  // Các hàm khởi tạo khác...

  // Khởi tạo Scroll Telling
  initScrollTelling();
});
