(function() {

    const infoPanels = document.querySelectorAll('.info-panel');

    const projects = document.querySelectorAll('.project');

    const projectBGs = document.querySelectorAll('.bg__text');
 
    const container = document.querySelector('.container');

    let waitingForUpdate;

    let currentProject = -1;

    const moreInfo = document.querySelectorAll('.info-panel__expand-button');

    addMultipleEventListeners(moreInfo, 'click', (event, i) => {

        toggleInfoExpansion(event, i);

    })

    // Use window.addEventListener & window.pageYOffset if not using parallax
    container.addEventListener('scroll', () => {
        
        if (!waitingForUpdate) {
            
            window.requestAnimationFrame(scrollUpdate);

            waitingForUpdate = true;

        }
        
    })

    const bg = document.querySelector('.bg__overlay');
    const BG_SHIFT_AMOUNT = .1;
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

})();

