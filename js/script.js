//set current year
const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

////////////////////////////////////////////////
//Make mobile navigation work
const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");
btnNavEl.addEventListener("click", function () {
  //add and remove nav-open class using the toggle function
  headerEl.classList.toggle("nav-open");
});

///////////////////////////////////////////////
//smooth scrolling animation

//select all anchor element with href property
const allLinks = document.querySelectorAll("a:link");

//add event listener to each of the links
allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    //get the href attribute of the link
    const href = link.getAttribute("href");
    // console.log(href);
    //scroll back to the top
    if (href === "#") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    //scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      //select the href using the queryselector.
      const sectionEl = document.querySelector(href);
      //console.log(sectionEl);

      //smooth scrolling
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    //close mobile navigation
    if (link.classList.contains("main-nav-link")) {
      headerEl.classList.toggle("nav-open");
    }
  });
});

///////////////////////////////////////////////
//sticky navigation

//select html element to be observe using the querySelector
const sectionHeroEl = document.querySelector(".section-hero");

//creates intersection observer object assign it to a variable
const obs = new IntersectionObserver(
  function (entries) {
    //entries is an array which is a collection of multiple html elements. And there is going to be one entry for each threshold value.

    //In this case we have only one html element (section-hero). entries[0] represent the first element in the entry
    const ent = entries[0];

    //check the console to see the properties
    //console.log(ent);

    //check if the property isIntersecting is false
    if (ent.isIntersecting === false) {
      //make the header sticky
      // document.querySelector(".header").classList.add("sticky");

      //add the sticky class to the body
      document.body.classList.add("sticky");
    }

    //remove the sticky header if the isIntersecting property is true
    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  },

  //options section of the IntersectionObserver
  {
    //root is the first object of the options section and determines where the html element should be appearing or not. it will observe the sectionHeroEl in the viewport
    root: null,

    //set a threshold. what the zero (0) means is that a event should occur immediately after the sectionHeroEl is 0% of the viewport or move out of the view port. setting the threshold to 1 means the event should occur when the element to be observed is completely in the viewport
    threshold: 0,

    //event should occur when the section-hero is '-80px' out the viewport which is the same as the height of the sticky navigation
    rootMargin: "-80px",
  }
);
obs.observe(sectionHeroEl);

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js

/*
.no-flexbox-gap .main-nav-list li:not(:last-child) {
  margin-right: 4.8rem;
}

.no-flexbox-gap .list-item:not(:last-child) {
  margin-bottom: 1.6rem;
}

.no-flexbox-gap .list-icon:not(:last-child) {
  margin-right: 1.6rem;
}

.no-flexbox-gap .delivered-faces { 
  margin-right: 1.6rem;
}

.no-flexbox-gap .meal-attribute:not(:last-child) {
  margin-bottom: 2rem;
}

.no-flexbox-gap .meal-icon {
  margin-right: 1.6rem;
}

.no-flexbox-gap .footer-row div:not(:last-child) {
  margin-right: 6.4rem;
}

.no-flexbox-gap .social-links li:not(:last-child) {
  margin-right: 2.4rem;
}

.no-flexbox-gap .footer-nav li:not(:last-child) {
  margin-bottom: 2.4rem;
}

@media (max-width: 75em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 3.2rem;
  }
}

@media (max-width: 59em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 0;
    margin-bottom: 4.8rem;
  }
}
*/
