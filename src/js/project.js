import { show, hide, showName, getElementTop,addMultipleEventListeners } from './utilityFunctions.js';

export const infoPanels = document.querySelectorAll('.info-panel');

const   projects = document.querySelectorAll('.project'),
        projectBGs = document.querySelectorAll('.bg__text');

const moreInfo = document.querySelectorAll('.info-panel__expand-button');

addMultipleEventListeners(moreInfo, 'click', (event, i) => toggleInfoExpansion(event, i) )


let currentProject = -1;
let currentHeight = projects[0].offsetTop;
let currentTop = 0;

export function toggleInfoExpansion(event, i) {

    if (infoPanels[i].className.indexOf(' expanded') == -1) {

        infoPanels[i].classList.add('expanded');
        
    } else {

        infoPanels[i].classList.remove('expanded');

    }

}

export function checkProject(scrollPosition) {

    if (scrollPosition > currentTop + currentHeight) {

        if (currentProject !== -1) {

            hide(projectBGs[currentProject]);

            infoPanels[currentProject].classList.remove('expanded');

        } else { showName() }

        currentProject++;
        // recalc height and top
        currentHeight = getHeight(currentProject);
        currentTop = getTop(currentProject);
        
        show(infoPanels[currentProject], projectBGs[currentProject]);

    } else if (scrollPosition < currentTop) {
        
        hide(infoPanels[currentProject], projectBGs[currentProject]);

        infoPanels[currentProject].classList.remove('expanded');

        currentProject--;  
        // recalc height and top
        currentHeight = getHeight(currentProject);
        currentTop = getTop(currentProject);

        if (currentProject !== -1) {

            show(projectBGs[currentProject]);

        }

    }
}

function getTop(currentProject) {
    console.log('getting top of currentProject');
    return currentTop = currentProject !== -1
        ? projects[currentProject].offsetTop 
        : 0;
}
function getHeight(currentProject) {
    return currentHeight = currentProject !== -1    
        ? projects[currentProject].offsetHeight
        : projects[0].offsetTop;
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

export function checkVisibility(scrollTop) {

    const   cutoffTop = scrollTop - 50,
            cutoffBottom = scrollTop + window.innerHeight - 50;

    const   hiddenElements = document.querySelectorAll('.scroll--hidden'),
            visibleElements = document.querySelectorAll('.scroll--visible');

    checkHiddenElements(hiddenElements, cutoffTop, cutoffBottom);

    checkVisibleElements(visibleElements, cutoffTop, cutoffBottom);

}

