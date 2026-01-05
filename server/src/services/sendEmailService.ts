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
  console.log("📧 Intentando enviar email a:", email);
  console.log("RESEND KEY:", process.env.RESEND_API_KEY ? "OK" : "MISSING");

  const html = `
    <h2>Avistaje de tu mascota</h2>
    <p><strong>Mascota:</strong>${petName}</p>
    <p><strong>Persona que reporta:</strong> ${reporterName}</p>
    <p><strong>Teléfono:</strong> ${reporterPhone}</p>
    <p><strong>Ubicación:</strong> ${location}</p>
  `;

  const response = await resend.emails.send({
    from: "Petfinder <onboarding@resend.dev>",
    to: "fakuj305@gmail.com",
    subject: "VIeron a tu mascota",
    html,
  });

  console.log("📨 Resend response:", response);
}
