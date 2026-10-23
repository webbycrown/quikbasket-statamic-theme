// ====HOME-3 SLIDER====//
document.addEventListener("DOMContentLoaded", () => {
  window.heroSlider = {
      nextDom: document.getElementById("next"),
      prevDom: document.getElementById("prev"),
      carouselDom: document.querySelector(".carousel"),
      thumbnailBorderDom: document.querySelector(".carousel .thumbnail"),
      timeRunning: 500, // Animation time
      runTimeOut: null,
      hasStarted: false,

      init() {
          if (this.carouselDom && this.thumbnailBorderDom) {
              this.SliderDom = this.carouselDom.querySelector(".list");
              this.thumbnailItemsDom = Array.from(this.thumbnailBorderDom.querySelectorAll(".item"));

              // Ensure the first thumbnail is the next image
              this.updateThumbnails();

              this.nextDom.onclick = () => this.showSlider("next");
              this.prevDom.onclick = () => this.showSlider("prev");

              // Add click events to thumbnails
              this.thumbnailItemsDom.forEach((item, index) => {
                  item.onclick = () => this.showImage(index);
              });

              // Auto-slide after delay
              this.runTimeOut = setTimeout(() => {
                  this.nextDom.click();
              }, this.timeRunning);
          }
      },

      showSlider(type) {
          let SliderItemsDom = this.SliderDom.querySelectorAll(".item");
          let thumbnailItemsDom = this.thumbnailBorderDom.querySelectorAll(".item");

          if (!this.hasStarted) {
              this.hasStarted = true;
              return;
          }

          if (type === "next") {
              this.SliderDom.appendChild(SliderItemsDom[0]); // Move first image to the end
              this.thumbnailBorderDom.appendChild(thumbnailItemsDom[0]); // Move first thumbnail to the end
          } else {
              this.SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]); // Move last image to the front
              this.thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]); // Move last thumbnail to the front
          }

          this.updateThumbnails();

          this.carouselDom.classList.add(type);
          clearTimeout(this.runTimeOut);
          this.runTimeOut = setTimeout(() => {
              this.carouselDom.classList.remove(type);
          }, this.timeRunning);
      },

      showImage(index) {
          let SliderItemsDom = Array.from(this.SliderDom.querySelectorAll(".item"));
          let thumbnailItemsDom = Array.from(this.thumbnailBorderDom.querySelectorAll(".item"));

          // Move selected image and thumbnail to the front
          while (this.SliderDom.firstChild !== SliderItemsDom[index]) {
              this.SliderDom.appendChild(this.SliderDom.firstChild);
              this.thumbnailBorderDom.appendChild(this.thumbnailBorderDom.firstChild);
          }

          // Ensure the first thumbnail shows the next image
          this.updateThumbnails();

          // Set active class for clicked thumbnail
          this.setActiveBorder(this.thumbnailItemsDom[index]);
      },

      updateThumbnails() {
          let SliderItemsDom = this.SliderDom.querySelectorAll(".item");
          let thumbnailItemsDom = this.thumbnailBorderDom.querySelectorAll(".item");

          // Ensure first thumbnail is the next image (not the current one in the main slider)
          if (thumbnailItemsDom[0].querySelector("img").src === SliderItemsDom[0].querySelector("img").src) {
              this.thumbnailBorderDom.appendChild(thumbnailItemsDom[0]); // Move first thumbnail to the end
          }

          this.setActiveBorder(this.thumbnailBorderDom.querySelector(".item"));
      },

      setActiveBorder(activeItem) {
          this.thumbnailItemsDom.forEach((item) => {
              item.classList.remove("active");
          });
          activeItem.classList.add("active");
      },
  };

  heroSlider.init();
});



// NAVBAR
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const menuClose = document.getElementById("menuClose");
  const navMenu = document.getElementById("navMenu");
  const header = document.getElementById("header");

  // Ensure necessary elements exist before proceeding
  if (!menuToggle || !menuClose || !navMenu) {
    // console.warn("Navigation menu elements not found.");
    return;
  }

  if (!header) {
    // console.warn("Header element not found.");
  }

  navMenu.classList.add("hidden");
  navMenu.style.transition = "transform 0.5s ease-in-out, opacity 0.5s ease-in-out";

  // Close the menu
  menuClose.addEventListener("click", () => {
    navMenu.classList.add("hidden");
    navMenu.classList.add("animate-slideOut");
    navMenu.classList.remove("animate-slideIn");

    if (header) {
      header.classList.remove("relative");
      header.classList.add("absolute");
      header.classList.add("backdrop-blur-sm");
    }
  });

  // Open the menu
  menuToggle.addEventListener("click", () => {
    navMenu.classList.remove("hidden");
    navMenu.classList.add("animate-slideIn");
    navMenu.classList.remove("animate-slideOut");

    if (header) {
      header.classList.add("relative");
      header.classList.remove("absolute");
      header.classList.remove("backdrop-blur-sm");
    }
  });

  // Dropdown functionality
  const dropdownToggles = document.querySelectorAll('[id^="dropdownToggle"]');
  const dropdownMenus = document.querySelectorAll('[id^="dropdownMenu"]');

  dropdownToggles.forEach((toggle, index) => {
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      
      dropdownMenus.forEach((menu, idx) => {
        if (idx !== index) {
          menu.classList.add("hidden");
        }
      });

      dropdownMenus[index]?.classList.toggle("hidden");
    });
  });

  // Close dropdowns when resizing to large screens
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 992) {
      dropdownMenus.forEach((menu) => menu.classList.add("hidden"));
    }
  });
});
