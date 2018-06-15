export function show() {
        
    for (let i=0; i < arguments.length; i++) {

        arguments[i].classList.add('show');

        arguments[i].classList.remove('hide');
    }

}

export function hide() {

    for (let i=0; i < arguments.length; i++) {

        arguments[i].classList.add('hide');

        arguments[i].classList.remove('show');
        
    }

}

export function showName() {

    const name = document.querySelector('header .name text');

    name.classList.add('show');

}

export function getElementTop(element) {
    var yPosition = 0;

    while(element) {
        yPosition += (element.offsetTop + element.clientTop);
        element = element.offsetParent;
    }

    return yPosition;
}

export function addMultipleEventListeners(arr, event, callback) {

    arr.forEach((el, i) => {

        el.addEventListener(event, (e) => {
            
            callback(e, i);

        });

    })

}