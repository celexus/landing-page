/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

const btnGoToTop = document.getElementById("btnTop");

function getElementPosition(section){
    let elemPosition = section.getBoundingClientRect();
    return elemPosition;
}


/**
 * Credit:
 * https://gomakethings.com/how-to-test-if-an-element-is-in-the-viewport-with-vanilla-javascript/
 */
function isSectionInViewport(section){
    let elemPosition = getElementPosition(section);

    if (elemPosition.top >= 0 &&
        elemPosition.left >= 0 &&
        elemPosition.right <= (window.innerWidth || document.documentElement.clientWidth) &&
        elemPosition.bottom <= (window.innerHeight || document.documentElement.clientHeight)) {
        return true;
    } else {
        return false;
    }
}


function collectNavData(){
    const allSections = document.querySelectorAll('section');
    let navArr = [];

    for (const aSection of allSections){
        const navObj = new Object();
        navObj.id = aSection.getAttribute('id');
        navObj.title = aSection.getAttribute('data-nav');
        navArr.push(navObj);
    }
    return navArr;
}


/*
 * build the nav
  */
function buildMainNav(){

    const navArr = collectNavData();
    let navFragment = new DocumentFragment();

    for (let i = 0; i < navArr.length; i++){
        let listItem = document.createElement('li');
        let listLink = document.createElement('a');

        i == 0 ? listLink.classList.add('menu__link','active') : listLink.classList.add('menu__link');
        listLink.textContent = navArr[i].title;
        listLink.setAttribute('href', navArr[i].id);
        listItem.appendChild(listLink);
        navFragment.appendChild(listItem);
    }

    const navBarList = document.getElementById('navbar__list');
    navBarList.addEventListener('click', navLinkClick);
    navBarList.appendChild(navFragment);
}

/*
 * Build menu
*/
buildMainNav();

/*
 * Scroll to section on link click
*/
function navLinkClick(e){
    e.preventDefault();

    let selectedId = e.target.getAttribute('href');
    let selectedSection = document.getElementById(selectedId);

    selectedSection.scrollIntoView(true);

    toggleSectionActiveState();
}


/*
 * set in view section as active
*/
function toggleSectionActiveState(){
    const allSections = document.querySelectorAll('section');

    for(aSection of allSections){
        if(isSectionInViewport(aSection)) {
            aSection.classList.add('active-section');
            toggleNavActiveState(aSection);
        }else{
            aSection.classList.remove('active-section');
        }
    }
}


/*
 * set relevant nav item as active
*/
function toggleNavActiveState(aSection){
    const navBarList = document.getElementById('navbar__list');
    const navBarLinks = navBarList.querySelectorAll('a');

    for(navLink of navBarLinks){
        if(navLink.getAttribute('href') == aSection.id){
            navLink.classList.add('active');
        }else {
            navLink.classList.remove('active');
        }
    }
}


/*
 * show / hide scroll to top button
*/
function toggleScrollToTopButton(){
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        btnGoToTop.style.display = "block";
    } else {
        btnGoToTop.style.display = "none";
    }
}


window.addEventListener('scroll', function (){
    toggleSectionActiveState();
    toggleScrollToTopButton();
}, false);


btnGoToTop.addEventListener('click', function (e){
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    toggleSectionActiveState();
});