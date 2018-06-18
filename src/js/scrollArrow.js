import { hide, show, hasClass } from "./utilityFunctions";

const arrow = document.querySelector('.hero__arrow');

const ARROW_CUTOFF = 100;

export function checkArrow(scrollPosition) {


    // If arrow is 'hidden'
    if (hasClass(arrow, 'hide')) {
        // check if it should be 'unhidden'
        if (scrollPosition < ARROW_CUTOFF) show(arrow);

    // if it isn't 'hidden', check if it should be
    } else if (scrollPosition > ARROW_CUTOFF) {
        hide(arrow);
    }
    
}