(function() {

    const   infoPanels = document.querySelectorAll('.info-panel'),
            projects = document.querySelectorAll('.project'),
            projectBGs = document.querySelectorAll('.bg__text'),
            container = document.querySelector('.container'),
            moreInfo = document.querySelectorAll('.info-panel__expand-button'),
            bg = document.querySelector('.bg__overlay'),
            BG_SHIFT_AMOUNT = .1,
            scrollMeter = document.querySelector('.bg__scroll-meter circle'),
            meterLength = 2 * Math.PI * scrollMeter.r.baseVal.value;


    let waitingForUpdate,
        currentProject = -1,
        pageHeight = getPageHeight();
    
    setupScrollMeter();


    // Use window.addEventListener & window.pageYOffset if not using parallax
    container.addEventListener('scroll', () => {
        
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

        waitingForUpdate = false;    // For debouncing the scroll event handler

        const scrollPosition = container.scrollTop;

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
            }

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

        // first we need to determine whether we need to open or close the 
        // info panel. We can do this by checking if the expanded class is 
        // present or not. If it is then we need to remove it if it's not
        // we need to add it.
        if (infoPanels[i].className.indexOf(' expanded') == -1) {
            // then panel is not expanded and we should add the class
            infoPanels[i].classList.add('expanded');
            //moreInfo[i].innerHTML = "less info";
            
        } else {

            infoPanels[i].classList.remove('expanded');
            //moreInfo[i].innerHTML = "more info";

        }

    }

    function getPageHeight() {

        // The page is made up of hero + projects
        let height = document.querySelector('.hero').clientHeight;

        projects.forEach(el => {
            
            height += el.clientHeight;
        })

        // However the page this doesn't take into account certain margins
        // so an alternative might be to just find bottom of the last project 
        // which as of right now is the last element on the page
        const lastProject = projects[projects.length -1];

        height = lastProject.offsetTop + lastProject.clientHeight;


        return height;

        
    }

    function setupScrollMeter() {

        scrollMeter.style.strokeDasharray = meterLength;
        scrollMeter.style.strokeDashoffset = meterLength;

    }

    function updateScrollMeter(scrollPosition) {

        const totalHeight = pageHeight - container.clientHeight;

        const scrollPercentage = scrollPosition / totalHeight;

        scrollMeter.style.strokeDashoffset = meterLength - (meterLength * scrollPercentage);
    }

    function resizeUpdate() {
        pageHeight = getPageHeight();
        console.log(pageHeight);
    }

})();

