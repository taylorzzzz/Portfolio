import { setupScrollMeter, updateScrollMeter, resizeUpdate } from './scrollMeter.js';
import { infoPanels,
        checkProject,
        checkVisibility,
        toggleInfoExpansion } from './project.js';
import { arrow, scrollToProjects } from './scrollArrow.js';

import { contactBtn,
        contactCloseBtn,
        expandContact, 
        hideContact } from './contact.js';

let waitingForUpdate;
    
setupScrollMeter();


/********* EVENT LISTENERS *********/ 
window.addEventListener('scroll', () => {
    
    if (!waitingForUpdate) {
        
        window.requestAnimationFrame(scrollUpdate);

        waitingForUpdate = true;

    }
    
})

window.addEventListener('resize', resizeUpdate);


arrow.addEventListener('click', scrollToProjects);

contactBtn.addEventListener('click', expandContact);

contactCloseBtn.addEventListener('click', hideContact);

function scrollUpdate() {
    // For debouncing the scroll event handler
    waitingForUpdate = false;   

    const scrollPosition = window.pageYOffset;
    
    checkProject(scrollPosition);

    updateScrollMeter(scrollPosition);

    checkVisibility(scrollPosition);

}