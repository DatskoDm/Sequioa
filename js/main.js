const popupLinks = document.querySelectorAll('.popup-link'); 
const body = document.querySelector('body'); 
const lockPadding = document.querySelectorAll('.lock-padding'); 

let unlock = true;

const timeout = 1000;

if (popupLinks.length > 0) {
    for (let index= 0 ; index < popupLinks.length ; index++) {
        const popupLink = popupLinks[index];
        popupLink.addEventListener('click', function (e) {
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const curentPopup = document.getElementById(popupName);
            popupOpen(curentPopup);
            e.preventDefault();
        });  
    }
}

const popupCloseIcon = document.querySelectorAll('.close-a'); 
if (popupCloseIcon.length > 0) {
    for (let index= 0 ; index < popupCloseIcon.length ; index++) {
        const el = popupCloseIcon[index];
        el.addEventListener('click', function (e) {
            popupClose(el.closest('.menu-popup'))
            e.preventDefault();
        }); 
    }
}

function popupOpen(curentPopup) {
    if (curentPopup && unlock) {
        const popupActive = document.querySelector('.menu-popup.active'); 
        if (popupActive) {
            popupClose(popupActive, false)
        } else {
            bodyLock();
        }
        curentPopup.classList.add('active');
        curentPopup.addEventListener("click", function(e) {
            if (!e.target.closest('.menu-popup-content')) {
                popupClose(e.target.closest('menu-popup'))
            }
        });
    }
}

function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('active');
        if (doUnlock) {
            bodyUnlock()
        }
    }
}
const lockPaddingValue = window.innerWidth - document.querySelector('section').offsetWidth + 'px';

function bodyUnlock() {
    setTimeout(function () {
        for (let index= 0 ; index < lockPadding.length ; index++) {
            const el = lockPadding[index];
            el.getElementsByClassName.paddingRight = '0px';
        }
        body.style.paddingRight = lockPaddingValue;
        body.classList.add('lock');
    }, timeout);

    unlock = false;
    setTimeout(function() {
        unlock = true;
    }, timeout);
}

function bodyLock() {

    for (let index= 0 ; index < lockPadding.length ; index++) {
        const el = lockPadding[index];
        el.getElementsByClassName.paddingRight = lockPaddingValue;
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');

    unlock = false;
    setTimeout(function() {
        unlock = true;
    }, timeout);
}


document.addEventListener('keysown', function (e) {
    if(e.which = 27) {
        const popupActive = document.querySelector('popup.active');
        popupClose(popupActive)
    }
});