// ==========================================================================
// NovaCare Hospital & Medical Center - Scripts
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Menu Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
      if (navMenu.style.display === 'flex') {
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '70px';
        navMenu.style.left = '0';
        navMenu.style.width = '100%';
        navMenu.style.backgroundColor = '#ffffff';
        navMenu.style.padding = '20px';
        navMenu.style.boxShadow = '0 10px 15px rgba(0,0,0,0.1)';
      }
    });
  }

  // Auto-fill doctor and department in appointment form when clicked from doctor cards
  const bookDocBtns = document.querySelectorAll('.book-doc-btn');
  const deptSelect = document.getElementById('dept-select');
  const docSelect = document.getElementById('doctor-select');

  bookDocBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const doc = btn.getAttribute('data-doc');
      const dept = btn.getAttribute('data-dept');

      if (deptSelect && dept) {
        deptSelect.value = dept;
      }
      if (docSelect && doc) {
        for (let i = 0; i < docSelect.options.length; i++) {
          if (docSelect.options[i].value.includes(doc)) {
            docSelect.selectedIndex = i;
            break;
          }
        }
      }
    });
  });

  // Appointment Form Submission Handler
  const appointmentForm = document.getElementById('appointment-form');
  const bookingFeedback = document.getElementById('booking-feedback');

  if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const patientName = document.getElementById('patient-name').value;
      const apptDate = document.getElementById('appointment-date').value;
      const dept = deptSelect ? deptSelect.value : '';
      const doctor = docSelect ? docSelect.value : '';

      if (bookingFeedback) {
        bookingFeedback.className = 'booking-feedback success';
        bookingFeedback.innerHTML = `
          ✅ <strong>Appointment Confirmed for ${patientName}!</strong><br>
          Department: ${dept} | Specialist: ${doctor}<br>
          Date: ${apptDate}. A confirmation SMS with OPD token has been sent.
        `;
      }
      appointmentForm.reset();

      setTimeout(() => {
        if (bookingFeedback) bookingFeedback.innerHTML = '';
      }, 7000);
    });
  }
});
