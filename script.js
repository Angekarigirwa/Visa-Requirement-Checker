document.getElementById('visaForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const passport = document.getElementById('nationality').value;
  const destination = document.getElementById('destination').value;
  const resultBox = document.getElementById('result');

  resultBox.innerHTML = '<p>Checking visa requirement...</p>';

  const url = 'https://visa-requirement.p.rapidapi.com/';
  const options = {
    method: 'POST',
    headers: {
      'x-rapidapi-key': 'f5e46eee3amshb3181a9e235e161p13dbb6jsnd4c1d1bc797e',
      'x-rapidapi-host': 'visa-requirement.p.rapidapi.com',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      passport: passport,
      destination: destination
    })
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (data.error) {
      resultBox.innerHTML = `<p style="color: red;">${data.message || "Error retrieving visa information."}</p>`;
      return;
    }

    resultBox.innerHTML = `
      <div class="visa-card">
        <h2>Visa Requirement</h2>
        <p><strong>From:</strong> ${data.passport_of}</p>
        <p><strong>To:</strong> ${data.destination}</p>
        <p><strong>Visa Type:</strong> ${data.visa}</p>
        <p><strong>Stay Duration:</strong> ${data.stay_of}</p>
        <p><strong>Passport Validity:</strong> ${data.pass_valid}</p>
        ${data.except_text ? `<p><strong>Exception:</strong> ${data.except_text}</p>` : ""}
        <p><strong>Currency:</strong> ${data.currency}</p>
        <p><strong>Capital:</strong> ${data.capital}</p>
        <p><strong>Timezone:</strong> UTC ${data.timezone}</p>
        <p><strong>Embassy Info:</strong> <a href="${data.embassy}" target="_blank">Visit</a></p>
        <p><strong>Visa Link:</strong> <a href="${data.link}" target="_blank">Apply</a></p>
      </div>
    `;
  } catch (error) {
    resultBox.innerHTML = '<p style="color:red;">Error retrieving visa information.</p>';
    console.error(error);
  }
});
