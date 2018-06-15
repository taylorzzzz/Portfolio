import { setupScrollMeter, updateScrollMeter } from './scrollMeter.js';



    const   infoPanels = document.querySelectorAll('.info-panel'),
            projects = document.querySelectorAll('.project'),
            projectBGs = document.querySelectorAll('.bg__text'),
            moreInfo = document.querySelectorAll('.info-panel__expand-button'),
            bg = document.querySelector('.bg__overlay'),
            BG_SHIFT_AMOUNT = .1;

    let waitingForUpdate,
        currentProject = -1,
        resizeTimeout;
        
    setupScrollMeter();


    // Use window.addEventListener & window.pageYOffset if not using parallax
    window.addEventListener('scroll', () => {
        
        if (!waitingForUpdate) {
            
            window.requestAnimationFrame(scrollUpdate);

            waitingForUpdate = true;

        }
        
    })

    window.addEventListener('resize', resizeUpdate);

    addMultipleEventListeners(moreInfo, 'click', (event, i) => {

        toggleInfoExpansion(event, i);

    })



    function scrollUpdate() {
        // For debouncing the scroll event handler
        waitingForUpdate = false;   

        const scrollPosition = window.pageYOffset;
        
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

        updateScrollMeter(scrollPosition);

        checkVisibility();

    }

    function addMultipleEventListeners(arr, event, callback) {

        arr.forEach((el, i) => {

            el.addEventListener(event, (e) => {
                
                callback(e, i);

            });

        })

    }

    function show() {
        
        for (let i=0; i < arguments.length; i++) {

            arguments[i].classList.add('show');

            arguments[i].classList.remove('hide');
        }

    }

    function hide() {

        for (let i=0; i < arguments.length; i++) {

            arguments[i].classList.add('hide');

            arguments[i].classList.remove('show');
            
        }

    }

    function toggleInfoExpansion(event, i) {

        if (infoPanels[i].className.indexOf(' expanded') == -1) {

            infoPanels[i].classList.add('expanded');
            
        } else {

            infoPanels[i].classList.remove('expanded');
            //moreInfo[i].innerHTML = "more info";

        }

    }

    function resizeUpdate() {

        clearTimeout(resizeTimeout);

        resizeTimeout = setTimeout(() => {
            const scrollPosition = window.pageYOffset;
            updateScrollMeter(scrollPosition);
        }, 200);
        // The large (2s) delay is to allow the images time to resize before we set pageHeight.
    }

    function showName() {

        const name = document.querySelector('header .name text');

        name.classList.add('show');

    }

    function checkVisibility() {
        const scrollTop = window.pageYOffset;

        const   cutoffTop = scrollTop - 50,
                cutoffBottom = scrollTop + window.innerHeight - 50;

        const   hiddenElements = document.querySelectorAll('.scroll--hidden'),
                visibleElements = document.querySelectorAll('.scroll--visible');

        checkHiddenElements(hiddenElements, cutoffTop, cutoffBottom);

        checkVisibleElements(visibleElements, cutoffTop, cutoffBottom);
    }

    function checkHiddenElements(elements, cutoffTop, cutoffBottom) {

        elements.forEach((el, i) => {
            
            const   elementTop = getElementTop(el),
                    elementBottom = elementTop + el.offsetHeight;

            if (elementTop < cutoffBottom && elementBottom > cutoffTop + 50) {
                el.classList.remove('scroll--hidden');
                el.classList.add('scroll--visible');
            }
        });
    }

    function checkVisibleElements(elements, cutoffTop, cutoffBottom) {

        elements.forEach((el, i) => {

            const   elementTop = getElementTop(el),
                    elementBottom = elementTop + el.offsetHeight;
                    

            if (cutoffTop > elementBottom || cutoffBottom < elementTop) {
                el.classList.add('scroll--hidden');
                el.classList.remove('scroll--visible');
            }
        });
    }

    function getElementTop(element) {
        var yPosition = 0;

        while(element) {
            yPosition += (element.offsetTop + element.clientTop);
            element = element.offsetParent;
        }

        return yPosition;
    }