const form = document.getElementById("login");
const email = document.getElementById("email");
const password = document.getElementById("password");
const emailHint = document.getElementById("email-hint");
const passwordHint = document.getElementById("password-hint");
const status = document.getElementById("status");
const toggle = document.getElementById("toggle-password");

function setHint(input, hint, message) {
  if (message) {
    input.setAttribute("aria-invalid", "true");
    hint.hidden = false;
    hint.textContent = message;
  } else {
    input.removeAttribute("aria-invalid");
    hint.hidden = true;
    hint.textContent = "";
  }
}

toggle.addEventListener("click", () => {
  const showing = password.type === "text";
  password.type = showing ? "password" : "text";
  toggle.textContent = showing ? "Show" : "Hide";
  toggle.setAttribute("aria-pressed", String(!showing));
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  status.hidden = true;

  const emailValue = email.value.trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
  const passwordOk = password.value.length >= 8;

  setHint(email, emailHint, emailOk ? "" : "Enter a valid email address.");
  setHint(
    password,
    passwordHint,
    passwordOk ? "" : "Password needs at least 8 characters."
  );

  if (!emailOk) {
    email.focus();
    return;
  }
  if (!passwordOk) {
    password.focus();
    return;
  }

  status.hidden = false;
  status.textContent = "Signed in. Opening your workspace…";
});
