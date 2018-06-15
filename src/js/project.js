import { show, hide, showName, getElementTop } from './utilityFunctions.js';


export const infoPanels = document.querySelectorAll('.info-panel');
export const projects = document.querySelectorAll('.project');
export const projectBGs = document.querySelectorAll('.bg__text');

const   BG_SHIFT_AMOUNT = .1,
        bg = document.querySelector('.bg__overlay');

let currentProject = -1;

export function toggleInfoExpansion(event, i) {

    if (infoPanels[i].className.indexOf(' expanded') == -1) {

        infoPanels[i].classList.add('expanded');
        
    } else {

        infoPanels[i].classList.remove('expanded');

    }

}

export function checkProject(scrollPosition) {
        
    const currentTop = currentProject !== -1
        ? projects[currentProject].offsetTop 
        : 0;

    const currentHeight = currentProject !== -1    
        ? projects[currentProject].offsetHeight
        : projects[0].offsetTop;

    if (scrollPosition > currentTop + currentHeight) {

        if (currentProject !== -1) {

            hide(projectBGs[currentProject]);

            infoPanels[currentProject].classList.remove('expanded');

            bg.style.opacity = +bg.style.opacity + BG_SHIFT_AMOUNT;

        } else { showName() }

        currentProject++;
        
        show(infoPanels[currentProject], projectBGs[currentProject]);

    } else if (scrollPosition < currentTop) {
        
        hide(infoPanels[currentProject], projectBGs[currentProject]);

        infoPanels[currentProject].classList.remove('expanded');

        currentProject--;            

        if (currentProject !== -1) {

            show(projectBGs[currentProject]);

            bg.style.opacity = +bg.style.opacity - BG_SHIFT_AMOUNT;

        }

    }
}

export function checkHiddenElements(elements, cutoffTop, cutoffBottom) {

    elements.forEach((el, i) => {
        
        const   elementTop = getElementTop(el),
                elementBottom = elementTop + el.offsetHeight;

        if (elementTop < cutoffBottom && elementBottom > cutoffTop + 50) {
            el.classList.remove('scroll--hidden');
            el.classList.add('scroll--visible');
        }
    });
}

export function checkVisibleElements(elements, cutoffTop, cutoffBottom) {

    elements.forEach((el, i) => {

        const   elementTop = getElementTop(el),
                elementBottom = elementTop + el.offsetHeight;
                

        if (cutoffTop > elementBottom || cutoffBottom < elementTop) {
            el.classList.add('scroll--hidden');
            el.classList.remove('scroll--visible');
        }
    });
}

export function checkVisibility() {
    const scrollTop = window.pageYOffset;

    const   cutoffTop = scrollTop - 50,
            cutoffBottom = scrollTop + window.innerHeight - 50;

    const   hiddenElements = document.querySelectorAll('.scroll--hidden'),
            visibleElements = document.querySelectorAll('.scroll--visible');

    checkHiddenElements(hiddenElements, cutoffTop, cutoffBottom);

    checkVisibleElements(visibleElements, cutoffTop, cutoffBottom);
}

