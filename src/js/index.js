import { setupScrollMeter, updateScrollMeter, resizeUpdate } from './scrollMeter.js';
import { infoPanels,
        checkProject,
        checkVisibility,
        toggleInfoExpansion } from './project.js';
import { checkArrow } from './scrollArrow.js';

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




function scrollUpdate() {
    // For debouncing the scroll event handler
    waitingForUpdate = false;   

    const scrollPosition = window.pageYOffset;
    
    checkProject(scrollPosition);

    updateScrollMeter(scrollPosition);

    //checkArrow(scrollPosition);

    checkVisibility();

}