import { setupScrollMeter, updateScrollMeter, resizeUpdate } from './scrollMeter.js';
import { addMultipleEventListeners } from './utilityFunctions.js';
import { infoPanels,
        checkProject,
        checkVisibility,
        toggleInfoExpansion } from './project.js';




const moreInfo = document.querySelectorAll('.info-panel__expand-button');

let waitingForUpdate;
    
setupScrollMeter();

window.addEventListener('scroll', () => {
    
    if (!waitingForUpdate) {
        
        window.requestAnimationFrame(scrollUpdate);

        waitingForUpdate = true;

    }
    
})

window.addEventListener('resize', resizeUpdate);

addMultipleEventListeners(moreInfo, 'click', (event, i) => toggleInfoExpansion(event, i) )




function scrollUpdate() {
    // For debouncing the scroll event handler
    waitingForUpdate = false;   

    const scrollPosition = window.pageYOffset;
    
    checkProject(scrollPosition);

    updateScrollMeter(scrollPosition);

    checkVisibility();

}