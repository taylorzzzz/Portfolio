(function() {

    const infoPanelOne = document.querySelectorAll('.info-panel')[0];
    const infoPanelTwo = document.querySelectorAll('.info-panel')[1];
    const infoPanelThree = document.querySelectorAll('.info-panel')[2];

    const projectOne = document.querySelectorAll('.project')[0];
    const projectTwo = document.querySelectorAll('.project')[1];
    const projectThree = document.querySelectorAll('.project')[2];

    const projectBGOne = document.querySelectorAll('.project__background')[0];
    const projectBGTwo = document.querySelectorAll('.project__background')[1];
    const projectBGThree = document.querySelectorAll('.project__background')[2];
    
    const projectOneY = projectOne.offsetTop;
    const projectTwoY = projectTwo.offsetTop;
    const projectThreeY = projectThree.offsetTop;
    

    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        // for each scroll event
        // Check first if the scroll position (top of screen) 
        // has reached the top of project one 
        if (scrollPosition > projectOneY) {
            // if it has we then want to check if 
            // the project-one-panel is already showing
            if (infoPanelOne.className.indexOf(` show`) == -1) {
                // if it isn't then add class that will show it
                infoPanelOne.classList.add('show');
                infoPanelOne.classList.remove('hide');
                
                projectBGOne.classList.add('show');
                projectBGOne.classList.remove('hide');
                // If panel-one is already showing then 
                // check if we are at project two yet
            } else if (scrollPosition > projectTwoY) {
                // if we are then check if panel-two is showing
                if (infoPanelTwo.className.indexOf(` show`) == -1) {
                    // if it is not then make it show
                    infoPanelTwo.classList.add('show');
                    infoPanelTwo.classList.remove('hide');

                    projectBGTwo.classList.add('show');
                    projectBGTwo.classList.remove('hide');

                    projectBGOne.classList.add('hide');
                    projectBGOne.classList.remove('show');

                    // If panel-one and panel-two are both already
                    // showing then we need to check to see if we need 
                    // to show panel-three
                } else if (scrollPosition > projectThreeY) {
                    // if scroll position is past project three trigger point
                    // then check if panel-three is already showing
                    if (infoPanelThree.className.indexOf(` show`) == -1) {
                        // if not then make it show
                        infoPanelThree.classList.add('show');
                        infoPanelThree.classList.remove('hide');

                        projectBGThree.classList.add('show');
                        projectBGThree.classList.remove('hide');

                        projectBGTwo.classList.add('hide');
                        projectBGTwo.classList.remove('show');

                    }
                } else if (infoPanelThree.className.indexOf(` show`) !== -1) {

                    infoPanelThree.classList.add('hide');
                    infoPanelThree.classList.remove('show');

                    projectBGThree.classList.add('hide');
                    projectBGThree.classList.remove('show');

                    projectBGTwo.classList.add('show');
                    projectBGTwo.classList.remove('hide');

                }
            } else if (infoPanelTwo.className.indexOf(` show`) !== -1) {
                // if we are above projectTwo but panel-two is showing
                // hide panel two
                infoPanelTwo.classList.add('hide');
                infoPanelTwo.classList.remove('show');

                projectBGTwo.classList.add('hide');
                projectBGTwo.classList.remove('show');

                projectBGOne.classList.add('show');
                projectBGOne.classList.remove('hide');
            }
             

        } else if (infoPanelOne.className.indexOf(` show`) !== -1) {
            // if we are above the project-one section but 
            // project-one-panel is showing i.e we are moving
            // up - remove the show class and hide panel
            
            infoPanelOne.classList.add('hide');
            infoPanelOne.classList.remove('show');

            projectBGOne.classList.add('hide');
            projectBGOne.classList.remove('show');

        }
    })

    

})()