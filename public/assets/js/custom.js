// NAVBAR PROCUCTS
var swiper = new Swiper(".navbar-product .bestSeller", {
  slidesPerView: 1,
  spaceBetween: 30,
  navigation: {
    nextEl: ".navbar-product .swiper-button-next",
    prevEl: ".navbar-product .swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    450: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    580: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
    885: {
      slidesPerView: 6,
      spaceBetween: 25,
    },
    992: {
      slidesPerView: 4,
      spaceBetween: 15,
    },
    1460: {
      slidesPerView: 4,
      spaceBetween: 18,
    },
    1599: {
      slidesPerView: 4,
      spaceBetween: 19,
    },
  },
});
// NAVBAR PROCUCTS
var swiper = new Swiper(".navbar-product .shop-collection", {
  slidesPerView: 1,
  spaceBetween: 30,
  navigation: {
    nextEl: ".navbar-product .swiper-button-next",
    prevEl: ".navbar-product .swiper-button-prev",
  },
  breakpoints: {
    320: {
      slidesPerView: 2,
      spaceBetween: 18,
    },
    430: {
      slidesPerView: 3,
      spaceBetween: 18,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 18,
    },
    1746: {
      slidesPerView: 3,
      spaceBetween: 15,
    },
  },
});

//============ FIRST PAGE START ============
// ============= POPUP ==============
document.addEventListener("DOMContentLoaded", function () {
  const popupModal = document.getElementById("popupModal");
  const cookiePopup = document.getElementById("cookiePopup");
  const acceptCookiesBtn = document.getElementById("acceptCookies");
  const closeModalBtn = document.getElementById("closeModal");

  if (!popupModal || !cookiePopup || !acceptCookiesBtn || !closeModalBtn) {
    // console.error("One or more elements are missing in the DOM.");
    return;
  }

  // Show both popups on page load
  popupModal.style.display = "flex";
  cookiePopup.style.display = "flex";

  // Close Main Popup when clicking close button
  closeModalBtn.addEventListener("click", function () {
    popupModal.style.display = "none";
  });

  // Accept Cookies - Hide only Cookie Popup
  acceptCookiesBtn.addEventListener("click", function () {
    cookiePopup.style.display = "none";
  });
});



var swiper = new Swiper(".categories .wc_fashion_categories_slider", {
  spaceBetween: 30,
  navigation: {
    nextEl: ".categories  .swiper-button-next",
    prevEl: ".categories  .swiper-button-prev",
  },
  breakpoints: {
    0: {
      spaceBetween: 20,
      slidesPerView: 1,
    },
    430: {
      spaceBetween: 20,
      slidesPerView: 2,
    },
    620: {
      spaceBetween: 20,
      slidesPerView: 3,
    },
    769: {
      spaceBetween: 20,
      slidesPerView: 3,
    },
    992: {
      spaceBetween: 20,
      slidesPerView: 4,
    },
    1170: {
      spaceBetween: 20,
      slidesPerView: 5,
    },
    1672: {
      spaceBetween: 30,
      slidesPerView: 6,
    },
  },
});

// //========= Trending Products Slider =========//

var swiper = new Swiper(".trending-product .wc_trending_products_slider", {
  spaceBetween: 30,
  navigation: {
    nextEl: ".trending-product .swiper-button-next",
    prevEl: ".trending-product .swiper-button-prev",
  },
  breakpoints: {
    0: {
      spaceBetween: 20,
      slidesPerView: 1,
    },
    355: {
      spaceBetween: 20,
      slidesPerView: 1.2,
    },
    430: {
      spaceBetween: 20,
      slidesPerView: 1.4,
    },
    480: {
      spaceBetween: 20,
      slidesPerView: 1.6,
    },
    531: {
      spaceBetween: 25,
      slidesPerView: 1.8,
    },
    615: {
      spaceBetween: 25,
      slidesPerView: 2.1,
    },
    769: {
      spaceBetween: 25,
      slidesPerView: 2.4,
    },
    992: {
      spaceBetween: 25,
      slidesPerView: 3.1,
    },
    1172: {
      spaceBetween: 30,
      slidesPerView: 3.6,
    },
    1672: {
      spaceBetween: 30,
      slidesPerView: 4.1,
    },
  },
});

// //========= Testimonial Slider =========//

var swiper = new Swiper(".wp-testimonial .swiper", {
  spaceBetween: 20,
  navigation: {
    nextEl: ".wp-testimonial .swiper-button-next",
    prevEl: ".wp-testimonial .swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 50,
    },
    1170: {
      slidesPerView: 3,
      spaceBetween: 60,
    },
  },
});

// //========= Insta Slider =========//

var swiper = new Swiper(".insta-post-slider", {
  breakpoints: {
    0: {
      slidesPerView: 2,
    },
    375: {
      slidesPerView: 2,
    },
    660: {
      slidesPerView: 3,
    },
    900: {
      slidesPerView: 4,
    },
    1300: {
      slidesPerView: 5,
    },
    1500: {
      slidesPerView: 6,
    },
  },
});

// //========= Best Seller Product Slider =========//

var swiper = new Swiper(".seller-product-slider", {
  spaceBetween: 10,
  navigation: {
    nextEl: ".seller-product-slider .swiper-button-next",
    prevEl: ".seller-product-slider .swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 15,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    991: {
      slidesPerView: 3,
      spaceBetween: 15,
    },
    1023: {
      slidesPerView: 4,
      spaceBetween: 15,
    },
    1440: {
      slidesPerView: 5,
      spaceBetween: 15,
    },
  },
});

// ======================HOME-2-JS============================ //
// <!-- ====REVIEWS-SWIPER==== -->
var swiper1 = new Swiper(".myBlog", {
  spaceBetween: 30,
  effect: "fade",
  loop: true,
  fadeEffect: {
    crossFade: true, // Ensures previous slide is hidden
  },
  pagination: {
    el: ".myBlog-pagination",
    clickable: true,
  },
});

var swiper2 = new Swiper(".myBlog2", {
  spaceBetween: 40,
  loop: true,
  fadeEffect: {
    crossFade: true, // Ensures previous slide is hidden
  },
  pagination: {
    el: ".myBlog-pagination",
    clickable: true,
  },
});

// Link both Swipers for proper synchronization
swiper1.controller.control = swiper2;
swiper2.controller.control = swiper1;

// Ensure pagination updates correctly when swiping
swiper1.on("slideChange", function () {
  if (swiper2.activeIndex !== swiper1.activeIndex) {
    swiper2.slideTo(swiper1.activeIndex);
  }
});

swiper2.on("slideChange", function () {
  if (swiper1.activeIndex !== swiper2.activeIndex) {
    swiper1.slideTo(swiper2.activeIndex);
  }
});

// <!--=====SHOP BY COLLECTION======-->
var swiper = new Swiper(".shop-collection  .collection", {
  slidesPerView: 2,
  spaceBetween: 15,
  navigation: {
    nextEl: ".shop-collection .arrow .swiper-button-next",
    prevEl: ".shop-collection .arrow .swiper-button-prev",
  },
  breakpoints: {
    444: {
      slidesPerView: 3,
      spaceBetween: 15,
    },
    590: {
      slidesPerView: 4,
      spaceBetween: 15,
    },
    992: {
      slidesPerView: 5,
      spaceBetween: 30,
    },
    1260: {
      slidesPerView: 6,
      spaceBetween: 40,
    },
    1672: {
      slidesPerView: 7,
      spaceBetween: 50,
    },
  },
});

// <!--=====PREMIUM COLLECTION======-->
var swiper = new Swiper(".premium-collection .myCollection", {
  slidesPerView: 1,
  spaceBetween: 20,
  navigation: {
    nextEl: ".premium-collection .swiper-button-next",
    prevEl: ".premium-collection .swiper-button-prev",
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    480: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1170: {
      slidesPerView: 3,
      spaceBetween: 25,
    },
  },
});

// <!--=====BLOGS & NEWS======-->
var swiper = new Swiper(".latest-blog .myBlogs", {
  slidesPerView: 1,
  spaceBetween: 20,
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    480: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    769: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 45,
    },
    1170: {
      slidesPerView: 3,
      spaceBetween: 60,
    },
  },
  navigation: {
    nextEl: ".latest-blog .arrow .swiper-button-next",
    prevEl: ".latest-blog .arrow .swiper-button-prev",
  },
});

// ===============HOME-3 JS=============================
var swiper = new Swiper(".myProduct", {
  slidesPerView: 1,
  spaceBetween: 30,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    376: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    501: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    769: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 0,
    },
    1170: {
      slidesPerView: 4,
      spaceBetween: 10,
    },
    1640: {
      slidesPerView: 5,
      spaceBetween: 25,
    },
  },
});

// ==== hero progresbar and number
document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".list .item");
  const totalSlides = slides.length;
  let currentIndex = 0;

  const currentSlideText = document.getElementById("currentSlide");
  const progressBar = document.getElementById("progressBar");
  const nextBtn = document.getElementById("next");
  const prevBtn = document.getElementById("prev");

  // Check if next/prev buttons exist before adding event listeners
  if (nextBtn && prevBtn) {
    nextBtn.addEventListener("click", () => updateSlide(1));
    prevBtn.addEventListener("click", () => updateSlide(-1));
  }

  function updateSlide(direction) {
    currentIndex = (currentIndex + direction + totalSlides) % totalSlides;

    requestAnimationFrame(() => {
      if (currentSlideText) {
        currentSlideText.textContent = String(currentIndex + 1).padStart(2, "0");
      }
      if (progressBar) {
        progressBar.style.width = `${((currentIndex + 1) / totalSlides) * 100}%`;
      }
    });
  }

  // Set initial state only if elements exist
  if (currentSlideText) currentSlideText.textContent = "01";
  if (progressBar) progressBar.style.width = `${(1 / totalSlides) * 100}%`;
});


//==== SHOP BY COLLECTION SLIDER ====//
var exploreSwiper = new Swiper(".explore", {
  slidesPerView: 2,
  spaceBetween: 0,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    444: {
      slidesPerView: 3,
      spaceBetween: 0,
    },
    590: {
      slidesPerView: 4,
      spaceBetween: 0,
    },
    769: {
      slidesPerView: 5,
      spaceBetween: 10,
    },
    1000: {
      slidesPerView: 5,
      spaceBetween: 30,
    },
    1260: {
      slidesPerView: 6,
      spaceBetween: 40,
    },
    1640: {
      slidesPerView: 7,
      spaceBetween: 50,
    },
  },
});

//==== TRENDING PRODUCT ====//
var trendingProductSwiper = new Swiper(".trending-product .myCollection", {
  slidesPerView: 1,
  spaceBetween: 20,
  navigation: {
    nextEl: ".trending-product .swiper-button-next",
    prevEl: ".trending-product .swiper-button-prev",
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    539: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 22,
    },
    1640: {
      slidesPerView: 4,
      spaceBetween: 22,
    },
  },
});

//==== STATE SLIDER ====//
var stateSwiper = new Swiper(".state", {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    575: {
      slidesPerView: 2,
      spaceBetween: 0,
    },
  },
});

// WITHOUT YELLOW BORDER FILTER = INDEX-3
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const filterItems = document.querySelectorAll(".filter-item");

  if (filterButtons.length === 0) {
    return;
  }

  if (filterItems.length === 0) {
    return;
  }

  // Set the first button as active by default
  const firstButton = filterButtons[0];
  const firstButtonText = firstButton.querySelector("p");

  if (firstButtonText) {
    firstButtonText.classList.add("text-violet-900");
  } else {
  }

  filterButtons.forEach((button) => {
    const buttonText = button.querySelector("p");
    if (!buttonText) {
      return;
    }

    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");

      // Remove active classes from all buttons
      filterButtons.forEach((btn) => {
        const btnText = btn.querySelector("p");
        if (btnText) {
          btnText.classList.remove("text-violet-900");
          btnText.classList.remove("font-medium");
          btnText.classList.add("text-[#374151]");
        }
      });

      // Add active classes to the clicked button
      buttonText.classList.add("text-violet-900");
      buttonText.classList.add("font-medium");
      buttonText.classList.remove("text-[#374151]");

      // Filter items based on the selected category
      filterItems.forEach((item) => {
        if (filter === "all" || item.classList.contains(filter)) {
          item.classList.remove("hidden");
        } else {
          item.classList.add("hidden");
        }
      });
    });
  });
});

// <!-- BLOGS & NEWS====//
var swiper = new Swiper(".blogs .blog-article", {
  slidesPerView: 1,
  spaceBetween: 30,
  navigation: {
    nextEl: ".blogs .arrow .swiper-button-next",
    prevEl: ".blogs .arrow .swiper-button-prev",
  },
  breakpoints: {
    500: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
  },
});

// ========FOLLOW-STARRY-HEAVEN====//
var swiper = new Swiper(".follow-heaven", {
  slidesPerView: 2,
  spaceBetween: 10,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    425: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    500: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    769: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    992: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
    1170: {
      slidesPerView: 6,
      spaceBetween: 20,
    },
    1672: {
      slidesPerView: 6,
      spaceBetween: 30,
    },
  },
});

//=====CLIENT'S TESTIMONIAL====//




//===== TRENDING-FASHION
var swiper = new Swiper(".trending .myTrending", {
  slidesPerView: 1,
  spaceBetween: 30,
  navigation: {
    nextEl: ".trending .swiper-button-next",
    prevEl: ".trending .swiper-button-prev",
  },
  breakpoints: {
    407: {
      slidesPerView: 2,
      spaceBetween: 14,
    },
    600: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    769: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1170: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
    1672: {
      slidesPerView: 5,
      spaceBetween: 24,
    },
  },
});

//=====DEAL OF THE WEEK
var swiper = new Swiper(".deal-week-product .deal-week", {
  slidesPerView: 1,
  spaceBetween: 24,
  navigation: {
    nextEl: ".deal-week-product .swiper-button-next",
    prevEl: ".deal-week-product .swiper-button-prev",
  },
  breakpoints: {
    480: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    769: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1170: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
    1260: {
      slidesPerView: 5,
      spaceBetween: 24,
    },
  },
});

//===== BLOGS & NEWS
var swiper = new Swiper(".latest-news .myBlogs-news", {
  slidesPerView: 1,
  spaceBetween: 20,
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    624: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    769: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    1170: {
      slidesPerView: 3,
      spaceBetween: 32,
    },
  },
  navigation: {
    nextEl: ".latest-news .arrow .swiper-button-next",
    prevEl: ".latest-news .arrow .swiper-button-prev",
  },
});

//=====FOR TAB-MENU
var swiper = new Swiper(".tab-down", {
  spaceBetween: 10,
  slidesPerView: 3,
  freeMode: true,
  watchSlidesProgress: true,
  breakpoints: {
    320: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    480: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    769: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    1170: {
      slidesPerView: 4,
      spaceBetween: 10,
    },
  },
});
var swiper2 = new Swiper(".tab-up", {
  spaceBetween: 20,
  thumbs: {
    swiper: swiper,
  },
});

//-================HOME-5====================
//===== HERO
// Initialize first Swiper instance (for text slides)
var swiper1 = new Swiper(".mySale1", {
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// Initialize second Swiper instance (for image slides)
var swiper2 = new Swiper(".mySale2", {
  spaceBetween: 30,
  effect: "fade",
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// Synchronize both Swipers
swiper1.controller.control = swiper2;
swiper2.controller.control = swiper1;

//== SEASON-COLLECTION ==
var swiper = new Swiper(".season .season-collection", {
  slidesPerView: 1,
  spaceBetween: 20,
  navigation: {
    nextEl: ".season .arrow .swiper-button-next",
    prevEl: ".season .arrow .swiper-button-prev",
  },
  breakpoints: {
    460: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 2.5,
    },
    992: {
      slidesPerView: 3.2,
    },
    1260: {
      slidesPerView: 3.5,
    },
    1672: {
      slidesPerView: 4.2,
    },
  },
});

//====== home-7 =======
//=====DEAL OF THE WEEK
var swiper = new Swiper(".trending-collection-product .trending-collection", {
  slidesPerView: 1,
  spaceBetween: 24,
  navigation: {
    nextEl: ".trending-collection-product .swiper-button-next",
    prevEl: ".trending-collection-product .swiper-button-prev",
  },
  breakpoints: {
    440: {
      slidesPerView: 2,
      spaceBetween: 0,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 0,
    },
    1170: {
      slidesPerView: 4,
      spaceBetween: 0,
    },
    1260: {
      slidesPerView: 5,
      spaceBetween: 0,
    },
  },
});

//===== SHOP.HTML  =====
//===== Large Screen Dropdown Functionality (same as small screen but for larger screens)
function toggleLargeDropdown(buttonId, menuId) {
  const button = document.getElementById(buttonId);
  const menu = document.getElementById(menuId);

  if (button && menu) {
    button.addEventListener("click", () => {
      menu.classList.toggle("hidden");
    });
  }
}

//===== Close all dropdowns if clicking outside
function closeDropdownsOnClick() {
  document.addEventListener("click", (e) => {
    if (
      !e.target.closest(".dropdown-btn") &&
      !e.target.closest(".dropdown-menu")
    ) {
      const dropdowns = document.querySelectorAll(".dropdown-menu");
      dropdowns.forEach((dropdown) => {
        dropdown.classList.add("hidden");
      });
    }
  });
}

//====RELATED PRODUCT
var swiper = new Swiper(".related-product .related", {
  slidesPerView: 1,
  spaceBetween: 24,
  navigation: {
    nextEl: ".related-product .swiper-button-next",
    prevEl: ".related-product .swiper-button-prev",
  },
  breakpoints: {
    426: {
      slidesPerView: 2,
      spaceBetween: 14,
    },
    600: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    769: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1170: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    1672: {
      slidesPerView: 5,
      spaceBetween: 24,
    },
  },
});

//===== SINGLE PRODUCT 2
document.addEventListener("DOMContentLoaded", function () {
  var productsEl = document.querySelector(".products");
  var products2El = document.querySelector(".products2");

  if (!productsEl || !products2El) {
    return;
  }

  var swiper = new Swiper(".products", {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
  });

  var swiper2 = new Swiper(".products2", {
    spaceBetween: 20,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    thumbs: {
      swiper: swiper,
    },
  });
});
// document.addEventListener("DOMContentLoaded", function () {
//   var swiper = new Swiper(".products", {
//     spaceBetween: 10,
//     slidesPerView: 4,
//     freeMode: true,
//     watchSlidesProgress: true,
//   });

//   var swiper2 = new Swiper(".products2", {
//     spaceBetween: 20,
//     navigation: {
//       nextEl: ".swiper-button-next",
//       prevEl: ".swiper-button-prev",
//     },
//     thumbs: {
//       swiper: swiper,
//     },
//   });
// });

// Initialize Swiper
document.addEventListener("DOMContentLoaded", () => {
  var swiper = new Swiper(".new-arrival", {
    slidesPerView: 1,
    spaceBetween: 30,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      450: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1170: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
      1672: {
        slidesPerView: 5,
        spaceBetween: 30,
      },
    },
  });

  // Filter buttons functionality
  const filterButtons = document.querySelectorAll(".filter-button1");

  // Add underline to the first button by default
  if (filterButtons.length > 0) {
    filterButtons[0].classList.add("active");

    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        filterButtons.forEach((btn) => btn.classList.remove("active"));

        this.classList.add("active");

        const filter = this.getAttribute("data-filter");
        const items = document.querySelectorAll(".swiper-slide");

        items.forEach((item) => {
          if (filter === "men" || item.classList.contains(filter)) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        });

        swiper.update();
      });
    });
  }
});

// ===== FILTERED MENU START======
// WITH YELLOW BORDER FILTER
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-button");
  const filterItems = document.querySelectorAll(".filter-items");

  if (filterButtons.length === 0) {
    return;
  }

  if (filterItems.length === 0) {
    return;
  }

  // Set the first button as active by default
  const firstButton = filterButtons[0];
  const firstButtonText = firstButton.querySelector("p");

  if (firstButtonText) {
    firstButtonText.classList.add("text-black");
    firstButtonText.classList.add("underline");
  } else {
  }

  filterButtons.forEach((button) => {
    const buttonText = button.querySelector("p");
    if (!buttonText) {
      return;
    }

    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");

      // Remove active classes from all buttons
      filterButtons.forEach((btn) => {
        const btnText = btn.querySelector("p");
        if (btnText) {
          btnText.classList.remove("text-black");
          btnText.classList.remove("underline");
          btnText.classList.add("text-[#374151]");
        }
      });

      // Add active classes to the clicked button
      buttonText.classList.add("text-black");
      buttonText.classList.add("underline");
      buttonText.classList.remove("text-[#374151]");

      // Filter items based on the selected category
      filterItems.forEach((item) => {
        if (filter === "all" || item.classList.contains(filter)) {
          item.classList.remove("hidden");
        } else {
          item.classList.add("hidden");
        }
      });
    });
  });
});
// ===== FILTERED MENU END ======

// ===== PASSWORD SHOW/HIDE START ======
function togglePassword(inputId) {
  const input = document.getElementById(inputId);
  const svg = document.querySelector(`#${inputId}-toggle-icon`);

  if (input.type === "password") {
    input.type = "text";
    svg.classList.add("stroke-violet-900"); // Keep the color when password is visible
  } else {
    input.type = "password";
    svg.classList.remove("stroke-violet-900"); // Remove the color when password is hidden
  }
}

// ===== PASSWORD SHOW/HIDE END ======

//===== SIDEBAR ======
document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const openSidebarBtn = document.getElementById("openSidebar");
  const closeSidebarBtn = document.getElementById("closeSidebar");

  // Check if elements exist before adding event listeners
  if (sidebar && openSidebarBtn && closeSidebarBtn) {
    openSidebarBtn.addEventListener("click", () => {
      sidebar.classList.remove("-translate-x-full");
    });

    closeSidebarBtn.addEventListener("click", () => {
      sidebar.classList.add("-translate-x-full");
    });

    // Optional: Close sidebar when clicking outside it
    document.addEventListener("click", (e) => {
      if (
        !sidebar.contains(e.target) &&
        !openSidebarBtn.contains(e.target) &&
        window.innerWidth <= 991
      ) {
        sidebar.classList.add("-translate-x-full");
      }
    });
  } else {
  }
});

//===== MODAL OPEN AND CLOSE ======
// Encapsulate the modal functionality
// window.ModalHandler = (() => {
//   const openModalButton = document.getElementById("openModalButton");
//   const closeModalButton = document.getElementById("closeModalButton");
//   const closeModalButtonBottom = document.getElementById(
//     "closeModalButtonBottom"
//   );
//   const modal = document.getElementById("modal");

//   // Function to open the modal and disable background scroll
//   function openModal() {
//     modal.classList.remove("hidden");
//     // document.body.classList.add("overflow-hidden");
//   }

//   // Function to close the modal and enable background scroll
//   function closeModal() {
//     modal.classList.add("hidden");
//     // document.body.classList.remove("overflow-hidden");
//   }

//   // Attach event listeners after DOM content is loaded
//   document.addEventListener("DOMContentLoaded", () => {
//     openModalButton?.addEventListener("click", openModal);
//     closeModalButton?.addEventListener("click", closeModal);
//     closeModalButtonBottom?.addEventListener("click", closeModal);
//   });
//   // document.addEventListener("DOMContentLoaded", () => {
//   //   document.addEventListener("click", (event) => {
//   //     if (event.target.matches("#openModalButton")) {
//   //       openModal();
//   //     } else if (event.target.matches("#closeModalButton, #closeModalButtonBottom")) {
//   //       closeModal();
//   //     }
//   //   });
//   // });

//   // Expose functions for external access
//   return {
//     openModal,
//     closeModal,
//   };
// })();

//===== TAB MENU ======
document.addEventListener("DOMContentLoaded", () => {
  let tabsContainer = document.querySelector("#tabs");
  if (!tabsContainer) return; // Ensure the container exists

  let tabTogglers = tabsContainer.querySelectorAll("a");
  let tabContents = document.querySelector("#tab-contents");
  if (!tabContents) return; // Ensure tab contents exist

  tabTogglers.forEach((toggler) => {
    toggler.addEventListener("click", function (e) {
      e.preventDefault();

      let tabName = this.getAttribute("href");
      if (!tabName) return; // Ensure the href attribute is valid

      // Remove active styles from all tabs and hide all content
      tabTogglers.forEach((tab) =>
        tab.parentElement.classList.remove(
          "border-black",
          "border-b-[3px]",
          "-mb-px",
          "opacity-100"
        )
      );

      Array.from(tabContents.children).forEach((content) => {
        content.classList.add("hidden");
      });

      // Activate the selected tab
      let targetTab = document.querySelector(tabName);
      if (targetTab) targetTab.classList.remove("hidden");

      e.target.parentElement.classList.add(
        "border-black",
        "border-b-[3px]",
        "-mb-px",
        "opacity-100"
      );
    });
  });

  // Click the default tab if it exists
  let defaultTab = document.getElementById("default-tab");
  if (defaultTab) defaultTab.click();
});

var swiper = new Swiper(".related-products .trending-collection", {
  slidesPerView: 1,
  spaceBetween: 24,
  navigation: {
    nextEl: ".related-products .swiper-button-next",
    prevEl: ".related-products .swiper-button-prev",
  },
  breakpoints: {
    407: {
      slidesPerView: 2,
      spaceBetween: 0,
    },
    769: {
      slidesPerView: 3,
      spaceBetween: 0,
    },
    992: {
      slidesPerView: 4,
      spaceBetween: 0,
    },
    1672: {
      slidesPerView: 5,
      spaceBetween: 0,
    },
  },
});

// ==== SHOP,BLOG SIDEBAR FILTER ====
document.addEventListener("DOMContentLoaded", () => {
  function initSidebar(sidebarId, openBtnId, closeBtnId) {
    const sidebar = document.getElementById(sidebarId);
    const openSidebarBtn = document.getElementById(openBtnId);
    const closeSidebarBtn = document.getElementById(closeBtnId);

    if (sidebar && openSidebarBtn && closeSidebarBtn) {
      // Open sidebar
      openSidebarBtn.addEventListener("click", () => {
        sidebar.classList.remove("-translate-x-full");
      });

      // Close sidebar
      closeSidebarBtn.addEventListener("click", () => {
        sidebar.classList.add("-translate-x-full");
      });

      // Close sidebar on outside click for smaller screens
      document.addEventListener("click", (e) => {
        if (
          !sidebar.contains(e.target) &&
          !openSidebarBtn.contains(e.target) &&
          window.innerWidth <= 991
        ) {
          sidebar.classList.add("-translate-x-full");
        }
      });
    } else {
    }
  }
  // Initialize the sidebar functionality
  document.addEventListener("DOMContentLoaded", () => {
    initSidebar("sidebar", "openSidebar", "closeSidebar");
  });
  initSidebar();
});

//==== CHECKOUT SHIPPING DETAILS ====
function toggleShippingDetails(checkbox) {
  const shippingDetails = document.getElementById("shipping-details");
  const textarea = document.getElementById("textarea");
  shippingDetails.style.display = checkbox.checked ? "block" : "none";
  textarea.style.display = checkbox.checked ? "none" : "block";
}

// ==== MODAL OPEN/CLOSE ====
document.addEventListener("DOMContentLoaded", () => {
  const openModalButton = document.getElementById("openModalButton");
  const closeModalButton = document.getElementById("closeModalButton");
  const modal = document.getElementById("modal");
  const nav = document.getElementById("nav");
  const html = document.documentElement;

  function openModal() {
    if (modal) {
      modal.classList.remove("hidden");
      nav.classList.add("overflow-hidden");
      setTimeout(() => modal.classList.add("active"), 10);
    }
    html.classList.add("body_class");
  }

  function closeModal() {
    if (modal) {
      modal.classList.remove("active");
      setTimeout(() => nav.classList.remove("overflow-hidden"), 750);
      setTimeout(() => modal.classList.add("hidden"), 500);
    }
    html.classList.remove("body_class");
  }

  if (openModalButton) {
    openModalButton.addEventListener("click", openModal);
  }

  if (closeModalButton) {
    closeModalButton.addEventListener("click", closeModal);
  }

  // **Close modal when clicking outside of it**
  document.addEventListener("click", (event) => {
    if (
      modal &&
      !modal.contains(event.target) &&
      !openModalButton.contains(event.target)
    ) {
      closeModal();
    }
  });

  // **Prevent modal from closing when clicking inside it**
  modal.querySelector(".modal").addEventListener("click", (event) => {
    event.stopPropagation();
  });
});

// ==== update cart ====
document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("update-cart-btn");
  const spinner = document.getElementById("cart-spinner");
  if (!button) {
    return;
  }

  if (!spinner) {
    return;
  }
  button.addEventListener("click", (e) => {
    e.preventDefault();

    spinner.classList.remove("hidden");

    setTimeout(() => {
      spinner.classList.add("hidden");
    }, 3000);
  });
});

//  ==== SHOP-2 FILTER ====
document.addEventListener("DOMContentLoaded", () => {
  const gridViewButton = document.getElementById("gridView1");
  const listViewButton = document.getElementById("listView1");
  const productContainer = document.getElementById("productContainer1");
  const products = document.querySelectorAll(".products");
  const boundaries = document.querySelectorAll(".boundry");
  const productDetails = document.querySelectorAll(".product-detail-second");
  const productDetailsText = document.querySelectorAll(
    ".product-detail-second h3"
  );

  if (
    gridViewButton &&
    listViewButton &&
    productContainer &&
    products &&
    boundaries &&
    productDetails &&
    productDetailsText
  ) {
    // Helper functions
    const addClass = (elements, ...classes) => {
      elements.forEach((el) => el?.classList.add(...classes));
    };

    const removeClass = (elements, ...classes) => {
      elements.forEach((el) => el?.classList.remove(...classes));
    };

    // Toggle to Grid View
    const activateGridView = () => {
      productContainer.className =
        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4";
      gridViewButton.classList.add("bg-violet-900");
      gridViewButton.classList.remove("sm:bg-violet-400", "bg-white");
      listViewButton.classList.remove("bg-violet-900");
      listViewButton.classList.add("sm:bg-violet-400", "bg-white");

      gridViewButton.querySelector("svg")?.classList.add("fill-white");
      listViewButton.querySelector("svg")?.classList.remove("fill-white");

      addClass(products, "first-grid");
      removeClass(products, "second");

      addClass(boundaries, "border", "border-lightborder-100");
      removeClass(boundaries, "pt-6");
      addClass(
        productDetails,
        "grid",
        "2xl:gap-[10px]",
        "xl:gap-0",
        "gap-2",
        "py-2",
        "xl:py-4",
        "xl:px-2",
        "bg-white",
        "w-[90%]",
        "relative",
        "z-10"
      );
      removeClass(
        productDetails,
        "1xl:gap-[22px]",
        "xl:gap-[18px]",
        "lg:gap-[14px]",
        "md:gap-[20px]",
        "sm:gap-[17px]",
        "gap-[12px]",
        "pr-[10px]"
      );
      addClass(productDetailsText, "hidden");
    };

    // Toggle to List View
    const activateListView = () => {
      productContainer.className =
        "flex flex-col divide-y divide-lightborder-200";
      listViewButton.classList.add("bg-violet-900");
      listViewButton.classList.remove("sm:bg-violet-400", "bg-white");
      gridViewButton.classList.remove("bg-violet-900");
      gridViewButton.classList.add("sm:bg-violet-400", "bg-white");

      listViewButton.querySelector("svg")?.classList.add("fill-white");
      gridViewButton.querySelector("svg")?.classList.remove("fill-white");

      removeClass(products, "first-grid");
      addClass(products, "second");

      removeClass(boundaries, "border", "border-lightborder-100");
      removeClass(
        productDetails,
        "grid",
        "2xl:gap-[10px]",
        "xl:gap-0",
        "gap-2",
        "py-4",
        "xl:py-4",
        "lg:px-2",
        "bg-white",
        "w-[90%]",
        "relative",
        "z-10"
      );
      addClass(
        productDetails,
        "grid",
        "1xl:gap-[22px]",
        "xl:gap-[18px]",
        "lg:gap-[14px]",
        "md:gap-[20px]",
        "sm:gap-[17px]",
        "gap-[12px]",
        "pr-[10px]"
      );
      removeClass(productDetailsText, "hidden");
    };

    gridViewButton.addEventListener("click", activateGridView);
    listViewButton.addEventListener("click", activateListView);

    // Default view
    activateGridView();
  }
});

// ==== shop-1 filter =======
document.addEventListener("DOMContentLoaded", () => {
  const gridViewButton = document.getElementById("gridView");
  const listViewButton = document.getElementById("listView");
  const productContainer = document.getElementById("productContainer");
  const products = document.querySelectorAll(".products");
  const productDetails = document.querySelectorAll(".product-detail");
  const productDetailsText = document.querySelectorAll(".details");

  // Helper functions
  const addClass = (elements, ...classes) => {
    elements.forEach((el) => el?.classList.add(...classes));
  };

  const removeClass = (elements, ...classes) => {
    elements.forEach((el) => el?.classList.remove(...classes));
  };

  const toggleButtonState = (activeButton, inactiveButton) => {
    activeButton.classList.add("bg-violet-900");
    activeButton.querySelector("svg")?.classList.add("fill-white");
    activeButton.classList.remove("sm:bg-violet-400", "bg-white");
    inactiveButton.classList.remove("bg-violet-900");
    inactiveButton.querySelector("svg")?.classList.remove("fill-white");
    inactiveButton.classList.add("sm:bg-violet-400", "bg-white");
  };

  // Toggle to Grid View
  const activateGridView = () => {
    productContainer.className =
      "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-[24px]";

    toggleButtonState(gridViewButton, listViewButton);

    addClass(products, "first");
    removeClass(products, "second");

    addClass(
      productDetails,
      "grid",
      "justify-items-center",
      "2xl:gap-[10px]",
      "mx-auto",
      "lg:-mt-12",
      "-mt-10",
      "px-2",
      "py-4",
      "xl:p-4",
      "shadow-tabbox",
      "bg-white",
      "w-[90%]",
      "relative",
      "z-10",
      "group-hover:shadow-xl"
    );
    removeClass(
      productDetails,
      "grid",
      "justify-items-start",
      "1xl:gap-[22px]",
      "sm:gap-[17px]",
      "gap-[10px]",
      "sm:pr-[10px]"
    );

    // Hide details in grid view
    addClass(productDetailsText, "hidden");
  };

  // Toggle to List View
  const activateListView = () => {
    productContainer.className =
      "flex flex-col divide-y divide-lightborder-200";

    toggleButtonState(listViewButton, gridViewButton);

    addClass(products, "second");
    removeClass(products, "first");

    addClass(
      productDetails,
      "grid",
      "justify-items-start",
      "1xl:gap-[22px]",
      "sm:gap-[17px]",
      "gap-[10px]",
      "sm:pr-[10px]"
    );
    removeClass(
      productDetails,
      "grid",
      "justify-items-center",
      "2xl:gap-[10px]",
      "mx-auto",
      "lg:-mt-12",
      "-mt-10",
      "px-2",
      "py-4",
      "xl:p-4",
      "shadow-tabbox",
      "bg-white",
      "w-[90%]",
      "relative",
      "z-10",
      "group-hover:shadow-xl"
    );

    // Show details in list view
    removeClass(productDetailsText, "hidden");
  };
  if (!productContainer) {
    return;
  }

  // Event Listeners
  gridViewButton?.addEventListener("click", activateGridView);
  listViewButton?.addEventListener("click", activateListView);

  // Initialize default view
  activateGridView();
});

// External Access Script
document.addEventListener("DOMContentLoaded", () => {
  (function (global) {
    function decrement(e) {
      const btn = e.target.parentNode.parentElement.querySelector(
        'button[data-action="decrement"]'
      );
      const target = btn.nextElementSibling;
      let value = Number(target.value);
      if (value > 0) {
        value--;
        target.value = value;
      }
    }

    function increment(e) {
      const btn = e.target.parentNode.parentElement.querySelector(
        'button[data-action="decrement"]'
      );
      const target = btn.nextElementSibling;
      let value = Number(target.value);
      value++;
      target.value = value;
    }

    function attachEventListeners() {
      const decrementButtons = document.querySelectorAll(
        `button[data-action="decrement"]`
      );

      const incrementButtons = document.querySelectorAll(
        `button[data-action="increment"]`
      );

      decrementButtons.forEach((btn) => {
        btn.addEventListener("click", decrement);
      });

      incrementButtons.forEach((btn) => {
        btn.addEventListener("click", increment);
      });
    }

    // Expose functions globally
    global.CounterScript = {
      decrement,
      increment,
      attachEventListeners,
    };
  })(window);

  // Automatically attach event listeners on page load
  window.addEventListener("DOMContentLoaded", () => {
    CounterScript.attachEventListeners();
  });
});

//===== PAGINATION ======
document.addEventListener("DOMContentLoaded", () => {
  const paginationItems = document.querySelectorAll(".pagination-item");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  let currentPage = 1;

  if (prevBtn && nextBtn) {
    // Check if elements are found
    function updatePagination() {
      paginationItems.forEach((item) => {
        if (item.dataset.page == currentPage) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });

      // Disable/Enable Prev and Next buttons based on current page
      prevBtn.disabled = currentPage === 1;
      nextBtn.disabled = currentPage === paginationItems.length - 2;
    }

    // Click event for pagination numbers
    paginationItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        const page = parseInt(e.target.dataset.page);
        if (page) {
          currentPage = page;
          updatePagination();
        }
      });
    });

    // Prev and Next buttons functionality
    prevBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        updatePagination();
      }
    });

    nextBtn.addEventListener("click", () => {
      if (currentPage < paginationItems.length - 2) {
        currentPage++;
        updatePagination();
      }
    });

    // Initialize pagination
    updatePagination();
  }
});

// VIDEO PAUSE AND START
document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("toggleVideo");
  const video = document.getElementById("videoElement");

  // Ensure elements exist before adding event listeners
  if (!toggleButton || !video) {
    return;
  }

  toggleButton.addEventListener("click", () => {
    if (video.paused) {
      video.play();
      toggleButton.style.display = "none";
    }
  });
});

// 2ND NAVBAR
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const menuClose = document.getElementById("menuClose");
  const navMenu = document.getElementById("navMenu");

  // Check if menu elements exist
  if (!menuToggle || !menuClose || !navMenu) {
    return;
  }

  // Initially close the menu
  navMenu.classList.add("hidden");

  // Close the menu
  menuClose.addEventListener("click", () => {
    navMenu.classList.add("hidden");
    navMenu.classList.add("animate-slideOut");
    navMenu.classList.remove("animate-slideIn");
  });

  // Open the menu
  menuToggle.addEventListener("click", () => {
    navMenu.classList.remove("hidden");
    navMenu.classList.add("animate-slideIn");
    navMenu.classList.remove("animate-slideOut");
  });

  // Dropdown functionality
  const dropdownToggles = document.querySelectorAll('[id^="dropdownToggle"]');
  const dropdownMenus = document.querySelectorAll('[id^="dropdownMenu"]');

  if (dropdownToggles.length === 0 || dropdownMenus.length === 0) {
    return;
  }

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

// SIDEBAR
document.addEventListener("DOMContentLoaded", () => {
  function initSidebar(sidebarId, openBtnId, closeBtnId) {
    const sidebar = document.getElementById(sidebarId);
    const openSidebarBtn = document.getElementById(openBtnId);
    const closeSidebarBtn = document.getElementById(closeBtnId);

    if (sidebar && openSidebarBtn && closeSidebarBtn) {
      // Open sidebar
      openSidebarBtn.addEventListener("click", () => {
        sidebar.classList.remove("-translate-x-full");
      });

      // Close sidebar
      closeSidebarBtn.addEventListener("click", () => {
        sidebar.classList.add("-translate-x-full");
      });

      // Close sidebar on outside click for smaller screens
      document.addEventListener("click", (e) => {
        if (
          !sidebar.contains(e.target) &&
          !openSidebarBtn.contains(e.target) &&
          window.innerWidth <= 991
        ) {
          sidebar.classList.add("-translate-x-full");
        }
      });
    }
  }
  // Initialize the sidebar functionality
  document.addEventListener("DOMContentLoaded", () => {
    initSidebar("sidebar", "openSidebar", "closeSidebar");
  });
});

// === SHOP.HTML PRICE RANGE SLIDER ===
document.addEventListener("DOMContentLoaded", function () {
  const minRange = document.getElementById("minRange");
  const maxRange = document.getElementById("maxRange");
  const sliderFill = document.getElementById("sliderFill");
  const minValueDisplay = document.getElementById("minValue");
  const maxValueDisplay = document.getElementById("maxValue");

  // Ensure elements exist before proceeding
  if (
    !minRange ||
    !maxRange ||
    !sliderFill ||
    !minValueDisplay ||
    !maxValueDisplay
  ) {
    return;
  }

  function formatPrice(value) {
    return `$${parseFloat(value).toFixed(2)}`;
  }

  function updateSlider() {
    let minValue = parseInt(minRange.value);
    let maxValue = parseInt(maxRange.value);
    let range = maxRange.max - minRange.min;

    // Prevent overlap (minimum gap of $50)
    if (minValue > maxValue - 50) {
      minRange.value = maxValue - 50;
      minValue = maxValue - 50;
    }
    if (maxValue < minValue + 50) {
      maxRange.value = minValue + 50;
      maxValue = minValue + 50;
    }

    // Calculate positions in percentage
    let minPercent = ((minValue - minRange.min) / range) * 100;
    let maxPercent = ((maxValue - minRange.min) / range) * 100;

    sliderFill.style.left = minPercent + "%";
    sliderFill.style.width = maxPercent - minPercent + "%";

    // Update displayed values with decimal formatting
    minValueDisplay.textContent = formatPrice(minValue);
    maxValueDisplay.textContent = formatPrice(maxValue);
  }

  minRange.addEventListener("input", updateSlider);
  maxRange.addEventListener("input", updateSlider);

  updateSlider(); // Initialize on page load
});

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("modal-hidden");
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("modal-hidden");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", (event) => {
    if (event.target.matches("#openModalButton")) {
      openModal("modal1");
    } else if (event.target.matches("#closeModalButton")) {
      closeModal("modal1");
    }
  });
});

// PROFILE PICTURE CHANGE IN DASHBOARD
document.addEventListener("DOMContentLoaded", function () {
  const fileInput = document.getElementById("fileInput");
  if (fileInput) {
    fileInput.addEventListener("change", function (event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          document.getElementById("profileImage").src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }
});
