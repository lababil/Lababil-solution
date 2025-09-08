const navToggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');
if (navToggle && nav) {
	navToggle.addEventListener('click', () => {
		const expanded = navToggle.getAttribute('aria-expanded') === 'true';
		navToggle.setAttribute('aria-expanded', String(!expanded));
		nav.classList.toggle('show');
	});
}

const yearEl = document.getElementById('year');
if (yearEl) {
	yearEl.textContent = String(new Date().getFullYear());
}

// Form handlers
const form = document.getElementById('contact-form');
const sendWaBtn = document.getElementById('send-wa');
const sendEmailBtn = document.getElementById('send-email');
const errorEl = document.getElementById('form-error');

function getFormData(){
	const name = document.getElementById('name')?.value.trim() || '';
	const phone = document.getElementById('phone')?.value.trim() || '';
	const service = document.getElementById('service')?.value.trim() || '';
	const message = document.getElementById('message')?.value.trim() || '';
	return { name, phone, service, message };
}

function validateForm(){
	const { name, phone, service, message } = getFormData();
	const ok = name && phone && service && message;
	if (!ok && errorEl){
		errorEl.hidden = false;
		errorEl.textContent = 'Harap lengkapi semua kolom.';
	} else if (errorEl){
		errorEl.hidden = true;
	}
	return ok;
}

function toWhatsapp(){
	if (!validateForm()) return;
	const { name, phone, service, message } = getFormData();
	const text = `Halo LABABIL Solution,%0A%0ANama: ${encodeURIComponent(name)}%0AWhatsApp: ${encodeURIComponent(phone)}%0ALayanan: ${encodeURIComponent(service)}%0APesan: ${encodeURIComponent(message)}%0A`;
	const url = `https://wa.me/6282312235675?text=${text}`;
	window.open(url, '_blank');
}

function toMail(){
	if (!validateForm()) return;
	const { name, phone, service, message } = getFormData();
	const subject = encodeURIComponent(`Permintaan ${service} - ${name}`);
	const body = encodeURIComponent(`Halo LABABIL Solution,%0A%0ANama: ${name}%0AWhatsApp: ${phone}%0ALayanan: ${service}%0APesan: ${message}%0A`);
	const url = `mailto:lababil2307@gmail.com?subject=${subject}&body=${body}`;
	window.location.href = url;
}

sendWaBtn?.addEventListener('click', toWhatsapp);
sendEmailBtn?.addEventListener('click', toMail);
form?.addEventListener('submit', (e) => { e.preventDefault(); });


