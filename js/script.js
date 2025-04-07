window.addEventListener("load", () => {
  // // isotope 필터링
  // const grid = new Isotope("main", {
  //   itemSelector: "section",
  //   transitionDuration: "0.3s",
  // });

  function resetHome() {
    // history.go(0);
    location.replace(location.href);
  }

  // 네비게이션 메뉴 클릭 시 섹션 이동
  const navLinks = document.querySelectorAll(".header nav a");

  document
    .querySelector('.header nav a[href="#about"]')
    ?.classList.add("active");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);
      if (!targetSection) return;

      window.scrollTo({
        top: targetSection.offsetTop - 80,
        behavior: "smooth",
      });

      // 선택 상태 표시 (선택사항)
      navLinks.forEach((el) => el.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // 헤더 스크롤 스타일
  const header = document.querySelector(".header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    const sections = document.querySelectorAll("section");
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // more 버튼
  const moreBtn = document.querySelector(".load-more");
  if (!moreBtn) return;

  moreBtn.addEventListener("click", () => {
    const hiddenItems = document.querySelectorAll(".project-item.hidden");

    // 최대 3개만 보여주기
    for (let i = 0; i < 3 && i < hiddenItems.length; i++) {
      hiddenItems[i].classList.remove("hidden");
    }

    // 남은 hidden 아이템이 없으면 버튼 숨기기
    if (document.querySelectorAll(".project-item.hidden").length === 0) {
      moreBtn.style.display = "none";
    }
  });

  // ✅ 로고 클릭 → 최상단 이동 + 강제 새로고침
  const logo = document.getElementById("logo");
  if (logo) {
    logo.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = window.location.origin + window.location.pathname;
    });
  }

  // 프로젝트 모달 관련 코드 (반복문 밖에서 실행)
  const projectItems = document.querySelectorAll(".project-item");
  const modal = document.querySelector(".modal");
  const closeBtn = document.querySelector(".modal .close");

  projectItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      const title = item.querySelector("h3").innerText;
      const description = item.querySelector("p").innerText;
      const imgSrc = item.querySelector("img").getAttribute("src");

      modal.querySelector("h1").innerText = title;
      modal.querySelector("p").innerText = description;
      modal.querySelector("img").setAttribute("src", imgSrc);
      modal.classList.add("active");
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
  });
});
