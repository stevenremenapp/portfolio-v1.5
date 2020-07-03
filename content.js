document.addEventListener(
  "DOMContentLoaded",
  () => {
    // Scrollspy
    const sections = document.querySelectorAll(".anchor");
    const tocLinks = document.querySelectorAll(".toc a");
    const makeActive = link => tocLinks[link].classList.add("active");
    const removeActive = link => tocLinks[link].classList.remove("active");
    const removeAllActive = link =>
      [...Array(sections.length).keys()].forEach(link => removeActive(link));
    const sectionMargin = 50;
    let currentActive = 1;
    // console.log(sections);
    // console.log([...sections]);
    // console.log(tocLinks);
    window.addEventListener("scroll", () => {
      let current =
        sections.length -
        [...sections]
          .reverse()
          .findIndex(
            section => window.scrollY >= section.offsetTop - sectionMargin
          ) -
        1;
      if (current >= sections.length) {
        current = 0;
      }
      if (current !== currentActive) {
        removeAllActive();
        currentActive = current;
        makeActive(current);
      }
    });
  },
  false
);
