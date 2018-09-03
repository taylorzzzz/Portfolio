export const contactBtn = document.querySelector('.contact__btn');

export const contactCloseBtn = document.querySelector('.contact__modal--close');

export function expandContact() {
    const contact = document.querySelector('.contact');
    contact.classList.add('show');
}

export function hideContact() {
    const contact = document.querySelector('.contact');
    contact.classList.remove('show');
}