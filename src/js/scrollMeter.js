const scrollMeter = document.querySelector('.bg__scroll-meter circle');
const meterLength = 2 * Math.PI * scrollMeter.r.baseVal.value;


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