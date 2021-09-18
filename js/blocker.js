const distractions  = {

    "github.com": {
        // <span class="mail-status unread " data-target="notification-indicator.modifier"></span>
        // I will have to create the Xpath identifier for the element
        notifications: [{
            type: 'div',
            class: 'mail-status unread'
        }]
    },

    "linkedin.com": {
        // <span class="notification-badge notification-badge--show "><span aria-hidden="true" class="notification-badge__count ">1</span><span class="a11y-text" data-test-notification-a11y="">1 new network update notification</span></span>
        // <span class="notification-badge notification-badge--show "> <span aria-hidden="true" class="notification-badge__no-count"></span> <span class="a11y-text" data-test-notification-a11y="">new feed updates notifications</span> </span>
        // <button class="artdeco-button feed-new-update-pill__new-update-button Elevation-6dp justify-flex-start " type="button" data-ember-action="" data-ember-action-382="382"> <div class="feed-new-update-pill__loader"> <div id="ember383" class="feed-new-update-pill__loader-icon artdeco-loader artdeco-loader--small artdeco-loader--inverse ember-view"><!----> <span class="artdeco-loader__bars"></span> <span class="artdeco-loader__bars"></span> <span class="artdeco-loader__bars"></span> <span class="artdeco-loader__bars"></span> <span class="artdeco-loader__bars"></span> <span class="artdeco-loader__bars"></span> <span class="artdeco-loader__bars"></span> <span class="artdeco-loader__bars"></span> <span class="artdeco-loader__bars"></span> <span class="artdeco-loader__bars"></span> <span class="artdeco-loader__bars"></span> <span class="artdeco-loader__bars"></span> </div> </div> <div class="feed-new-update-pill__text"> <li-icon aria-hidden="true" type="arrow-up-icon" class="feed-new-update-pill__up-icon mr1" size="small"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" data-supported-dps="16x16" fill="currentColor" class="mercado-match" width="16" height="16" focusable="false"> <path d="M13 7L9 4.16V14H7V4.16L3 7V4.55L8 1l5 3.55z"></path> </svg></li-icon> <span> New posts </span> </div> </button>
        // <span class="notification-badge notification-badge--show "> <span aria-hidden="true" class="notification-badge__count ">1</span> <span class="a11y-text" data-test-notification-a11y="">1 new notification</span> </span>
        notifications: [{
            type: 'div',
            class: 'notification-badge'
        },{
            type: 'div',
            class: 'feed-new-update-pill__new-update-button'
        }]
    },

    "stackoverflow.com": {
        // <span class="indicator-badge js-unread-count _important">1</span>
        notifications: [{
            type: 'div',
            class: 'indicator-badge'
        }, {
            type: 'div',
            id: 'review-button'
        }]
    },

    "medium.com": {
        notifications: [{
        }]
    },

    "twitter": {
        notifications: [{

        }]
    },

    "gmail": {

    },

    "reddit.com": {
        notifications: [{
            type: 'div',
            class: '_1-nIsCaWhGBFN-L4ZHnbGp'
        }, {
            type: 'div',
            class: '_1-nIsCaWhGBFN-L4ZHnbGp '
        }]
    },

    "instagram.com": {
        notifications: [{
            type: 'div',
            class:'KdEwV'
        }]
    }
}

const removeElements = (elements)  => {
    console.log('In the removeElements method with the elements', elements)
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

const removeElementByClass = (className) => {
    const elements = document.getElementsByClassName(className);
    removeElements(elements)
}

const removeElementById = (id) => {
    const elements = document.getElementById(id);
    removeElements(elements);
}

const removeBadges = (website) => {
    const header = distractions[website]
    if (!header){
        return
    }
    for (let data of header.notifications){
        const className = data.class
        if (className){
            removeElementByClass(className)
        } else {
            removeElementById(data.id)
        }
    }
}
