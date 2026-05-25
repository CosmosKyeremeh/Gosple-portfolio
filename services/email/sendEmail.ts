import { Resend } from 'resend'

interface SendEmailPayload {
  name:    string
  email:   string
  subject?: string
  message: string
}

export async function sendContactEmail(payload: SendEmailPayload) {
  const resend    = new Resend(process.env.RESEND_API_KEY)
  const recipient = process.env.CONTACT_EMAIL_RECIPIENT

  if (!recipient) throw new Error('CONTACT_EMAIL_RECIPIENT is not set.')

  const { name, email, subject, message } = payload

  return resend.emails.send({
    from:    'Portfolio Contact <onboarding@resend.dev>',
    to:      recipient,
    replyTo: email,
    subject: subject ? `[Portfolio] ${subject}` : `[Portfolio] New message from ${name}`,
    html: `
      <div style="font-family:monospace;max-width:600px;padding:32px;background:#070913;
                  color:#cbd5e1;border:1px solid #1e293b;border-radius:12px;">
        <h2 style="color:#93c5fd;margin-bottom:24px;">New Portfolio Message</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:8px 0;color:#475569;width:90px;">From</td>
            <td style="padding:8px 0;color:#e2e8f0;">${name}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#475569;">Reply-to</td>
            <td style="padding:8px 0;color:#93c5fd;">${email}</td>
          </tr>
          ${subject
            ? `<tr><td style="padding:8px 0;color:#475569;">Subject</td>
               <td style="padding:8px 0;color:#e2e8f0;">${subject}</td></tr>`
            : ''}
        </table>
        <hr style="border-color:#1e293b;margin:20px 0;"/>
        <div style="background:#0f172a;padding:16px;border-radius:8px;
                    border-left:2px solid #3b82f6;">
          <p style="white-space:pre-wrap;color:#94a3b8;line-height:1.7;margin:0;">
            ${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
          </p>
        </div>
        <p style="color:#334155;font-size:11px;margin-top:24px;">
          Sent from gosple-portfolio · Hit reply to respond directly.
        </p>
      </div>
    `,
  })
}