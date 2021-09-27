const distractions = {
  "github.com": {
    // <span class="mail-status unread " data-target="notification-indicator.modifier"></span>
    // I will have to create the Xpath identifier for the element
    notifications: [
      {
        type: "div",
        class: "mail-status",
      },
    ],
    cssRules: [".mail-status { display: none !important}\n"],
    title: "Github",
  },

  "linkedin.com": {
    // <span class="notification-badge notification-badge--show "><span aria-hidden="true" class="notification-badge__count ">1</span><span class="a11y-text" data-test-notification-a11y="">1 new network update notification</span></span>
    // <span class="notification-badge notification-badge--show "> <span aria-hidden="true" class="notification-badge__no-count"></span> <span class="a11y-text" data-test-notification-a11y="">new feed updates notifications</span> </span>
    // <button class="artdeco-button feed-new-update-pill__new-update-button Elevation-6dp justify-flex-start " type="button" data-ember-action="" data-ember-action-382="382"> <div class="feed-new-update-pill__loader"> <div id="ember383" class="feed-new-update-pill__loader-icon artdeco-loader artdeco-loader--small artdeco-loader--inverse ember-view"><!----> <span class="artdeco-loader__bars"></span> <span class="artdeco-loader__bars"></span> <span class="artdeco-loader__bars"></span> <span class="artdeco-loader__bars"></span> <span class="artdeco-loader__bars"></span> <span class="artdeco-loader__bars"></span> <span class="artdeco-loader__bars"></span> <span class="artdeco-loader__bars"></span> <span class="artdeco-loader__bars"></span> <span class="artdeco-loader__bars"></span> <span class="artdeco-loader__bars"></span> <span class="artdeco-loader__bars"></span> </div> </div> <div class="feed-new-update-pill__text"> <li-icon aria-hidden="true" type="arrow-up-icon" class="feed-new-update-pill__up-icon mr1" size="small"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" data-supported-dps="16x16" fill="currentColor" class="mercado-match" width="16" height="16" focusable="false"> <path d="M13 7L9 4.16V14H7V4.16L3 7V4.55L8 1l5 3.55z"></path> </svg></li-icon> <span> New posts </span> </div> </button>
    // <span class="notification-badge notification-badge--show "> <span aria-hidden="true" class="notification-badge__count ">1</span> <span class="a11y-text" data-test-notification-a11y="">1 new notification</span> </span>
    title: "Linkedin",
    faviconUrl: "https://static-exp1.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca",
    faviconSelector: "link[id='favicon-ico']",
    notifications: [
      {
        type: "div",
        class: "notification-badge",
      },
      {
        type: "div",
        class: "feed-new-update-pill__new-update-button",
      },
    ],
    cssRules: [
      ".notification-badge {display:none !important}\n",
      ".feed-new-update-pill {display:none !important}\n",
      ".feed-new-update-pill__loader {display: none !important}\n",
      ".feed-new-update-pill__text { display: none !important}\n",
      ".feed-new-update-pill__new-update-button {display: none !important}\n",
    //   ".profile-rail-card__actor-link {display: none !important}\n",
    //   ".identity-headline {display:none !important}\n"
    ],
  },

  "stackoverflow.com": {
    // <span class="indicator-badge js-unread-count _important">1</span>
    title: "Stackoverflow",
    notifications: [
      {
        type: "div",
        class: "indicator-badge",
      },
      {
        type: "div",
        id: "review-button",
      },
      {
        type: "remove-class",
        class: "_highlighted-positive",
        property: ["color"],
      },
    ],
    cssRules: [
      ".indicator-badge {display:none !important}\n",
      "#review-button {display:none !important} \n",
      "._highlighted-positive { color: unset !important}\n",
    ],
  },

  "medium.com": {
    notifications: [{}],
    cssRules: [],
    title: "Medium - Where good ideas found you "
  },

  // <div dir="auto" aria-label="1 unread items" aria-live="polite" class="css-901oao r-1awozwy r-l5o3uw r-1xc7w19 r-sdzlij r-1phboty r-rs99b7 r-1tjplnt r-jwli3a r-6koalj r-1q142lx r-37j5jr r-1gkfh8e r-16dba41 r-10ptun7 r-1777fci r-56xrmm r-285fr0 r-u8s1d r-kquydp r-1m4drjs r-lrvibr r-3s2u2q r-qvutc0"><span class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">1</span></div>
  twitter: {
    notifications: [{}],
    cssRules: [],
  },

  "mail.google.com": {
    notifications: [
      {
        type: "div",
        class: "aDG",
      },
      {
        type: "div",
        class: "aKs",
      },
    ],
    cssRules: [
      ".aDG {display:none !important} \n",
      ".aKs {display:none !important}\n",
    ],
    title: "Gmail"
  },

    // const links = document.querySelectorAll('link[rel=icon]')
    // console.log('The links are', links)
    // href="https://www.redditstatic.com/desktop2x/img/favicon/favicon-32x32.png"
    // <link rel="icon" type="image/png" sizes="32x32" href="https://www.redditstatic.com/desktop2x/img/favicon/badged-favicon-32x32.png">

  "reddit.com": {
    title: "Reddit - Dive into anything",
    faviconUrl: "https://www.redditstatic.com/desktop2x/img/favicon/favicon-32x32.png",
    faviconSelector: "link[rel='icon']",
    notifications: [
      {
        type: "div",
        class: "_1-nIsCaWhGBFN-L4ZHnbGp",
      },
      {
        type: "div",
        class: "_1-nIsCaWhGBFN-L4ZHnbGp ",
      },
      { type: "div", class: "_1PPMaBuBIFqAY5VrSWww3Y" },
      {
        // class="cmR5BF4NpBUm3DBMZCmJS _2R__ntXP0SJs6INH-bBBFn" CGFfgr
        type: "div",
        class: "cmR5BF4NpBUm3DBMZCmJS",
      },
    ],
    cssRules: [
      "._1-nIsCaWhGBFN-L4ZHnbGp {display: none !important} \n",
      "._1PPMaBuBIFqAY5VrSWww3Y {display: none !important} \n",
      ".cmR5BF4NpBUm3DBMZCmJS {display:none !important} \n",
    ],
  },

  "instagram.com": {
    title: "Instagram",
    notifications: [
      {
        type: "div",
        class: "KdEwV",
      },
    ],
    cssRules: [".KdEwV {display:none !important} \n"],
  },

  "youtube.com": {
    title: "YouTube",
    notifications: [
      {
        type: "div",
        id: "notification-count",
      },
    ],
    cssRules: ["#notification-count {display:none !important} \n"],
  },
};

const removeElements = (elements) => {
  console.log("In the removeElements method with the elements", elements);
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
};

const removeElementByClass = (className) => {
  const elements = document.getElementsByClassName(className);
  removeElements(elements);
};

const removeElementById = (id) => {
  const elements = document.getElementById(id);
  removeElements(elements);
};

const removeBadges = (website) => {
  console.log("Removing the badges");
  const header = distractions[website];
  if (!header) {
    return;
  }
  for (let data of header.notifications) {
    const className = data.class;
    if (className) {
      removeElementByClass(className);
    } else {
      removeElementById(data.id);
    }
  }
};

const ruleByClassName = (className) => {
  return "." + className + "{display:none !important};";
  // const elements = document.getElementsByClassName(className);
  // removeElements(elements)
};

const ruleById = (id) => {
  return "#" + id + "{display:none !important};";
};

const generateCSSRule = (website) => {
  const header = distractions[website];
  if (!header) {
    return "";
  }
  let cssRule = header.cssRules.reduce((prev, cur) => prev + cur);
  console.log("The CSS Rule is ", cssRule);
  return cssRule;
};

const updateFavicon = (website) => {
    const {faviconSelector, faviconUrl} = distractions[website];
    const favicons = document.querySelectorAll(faviconSelector);
    for (let favicon of favicons){
        favicon.href = faviconUrl
    }
}

const modifyTitle = (website) => {
    var title = document.title;
    var newTitle = "";
    var skip = false;
    for (let ch of title){
        if (ch === '('){
            skip = true;
        }else if ( ch === ')'){
            skip = false
        }else if (skip){
            continue;
        }else {
            newTitle = newTitle + ch;
        }
    }
  console.log("The title is",title);
  document.title = newTitle.trim();
};
