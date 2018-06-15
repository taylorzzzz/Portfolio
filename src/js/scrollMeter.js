const scrollMeter = document.querySelector('.bg__scroll-meter circle');
const meterLength = 2 * Math.PI * scrollMeter.r.baseVal.value;

let resizeTimeout;

export function setupScrollMeter() {

    scrollMeter.style.strokeDasharray = meterLength;

    scrollMeter.style.strokeDashoffset = meterLength;

}

export function updateScrollMeter(scrollPosition) {

    const pageHeight = Math.max(
        document.documentElement.clientHeight,
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight
    );

    const totalHeight = pageHeight - window.innerHeight;

    const scrollPercentage = scrollPosition / totalHeight;

    scrollMeter.style.strokeDashoffset = meterLength - (meterLength * scrollPercentage);
}

export function resizeUpdate() {

    clearTimeout(resizeTimeout);

    resizeTimeout = setTimeout(() => {
        const scrollPosition = window.pageYOffset;
        updateScrollMeter(scrollPosition);
    }, 200);
    // The large (2s) delay is to allow the images time to resize before we set pageHeight.
}