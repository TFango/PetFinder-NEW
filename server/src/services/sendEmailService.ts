import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailData {
  petName: string;
  reporterName: string;
  reporterPhone: string;
  location: string;
}

export async function sendEmail(email: string, data: EmailData) {
  const { petName, reporterName, reporterPhone, location } = data;

  const html = `
    <h2>Avistaje de tu mascota</h2>
    <p><strong>Mascota:</strong>${petName}</p>
    <p><strong>Persona que reporta:</strong> ${reporterName}</p>
    <p><strong>Teléfono:</strong> ${reporterPhone}</p>
    <p><strong>Ubicación:</strong> ${location}</p>
  `;

  resend.emails.send({
    from: "Petfinder <onboarding@resend.dev>",
    to: email,
    subject: "VIeron a tu mascota",
    html,
  });
}
