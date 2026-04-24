import nodemailer from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

let transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo> | null = null

function createTransporter() {
  const host = process.env.SMTP_HOST || 'smtp.office365.com'
  const port = Number(process.env.SMTP_PORT || '587')
  const secure = port === 465
  const authMethod = (process.env.SMTP_AUTH_METHOD || 'password').toLowerCase()

  const config: SMTPTransport.Options = {
    host,
    port,
    secure,
    requireTLS: !secure,
    tls: {
      minVersion: 'TLSv1.2',
    },
  }

  if (authMethod === 'oauth2') {
    const user = process.env.SMTP_USER
    const clientId = process.env.OAUTH_CLIENT_ID
    const clientSecret = process.env.OAUTH_CLIENT_SECRET
    const refreshToken = process.env.OAUTH_REFRESH_TOKEN
    const accessToken = process.env.OAUTH_ACCESS_TOKEN

    if (!user || !clientId || !clientSecret || !refreshToken) {
      throw new Error('Missing OAuth2 SMTP settings. Set SMTP_USER, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET, OAUTH_REFRESH_TOKEN.')
    }

    config.auth = {
      type: 'OAuth2',
      user,
      clientId,
      clientSecret,
      refreshToken,
      ...(accessToken ? { accessToken } : {}),
    }
  } else {
    const user = process.env.SMTP_USER
    const pass = process.env.SMTP_PASS

    if (!user || !pass) {
      throw new Error('Missing SMTP_USER or SMTP_PASS for password-based SMTP login')
    }

    config.auth = {
      user,
      pass,
    }
  }

  return nodemailer.createTransport(config)
}

function getTransporter() {
  if (!transporter) {
    transporter = createTransporter()
  }
  return transporter
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function studentTypeLabel(studentType: string) {
  if (studentType === 'LOCAL') return 'Local'
  if (studentType === 'INTERNATIONAL') return 'International'
  return 'Online'
}

export async function sendEnquiryEmail(data: {
  firstName: string
  lastName: string
  email: string
  phone?: string
  courseInterest: string
  studentType: string
  message?: string
}) {
  const { firstName, lastName, email, phone, courseInterest, studentType, message } = data
  const activeTransporter = getTransporter()

  const fromAddress = process.env.SMTP_FROM || process.env.EMAIL_FROM || process.env.SMTP_USER
  const fromName = process.env.SMTP_FROM_NAME || process.env.NEXT_PUBLIC_SITE_NAME || 'Global Cafe Business School'
  const adminInbox = process.env.ADMIN_NOTIFY_EMAIL || process.env.SMTP_USER
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  if (!fromAddress || !adminInbox) {
    throw new Error('Missing email sender (SMTP_FROM) or recipient (ADMIN_NOTIFY_EMAIL) configuration')
  }

  const safeFirstName = escapeHtml(firstName)
  const safeLastName = escapeHtml(lastName)
  const safeEmail = escapeHtml(email)
  const safePhone = phone ? escapeHtml(phone) : ''
  const safeCourse = escapeHtml(courseInterest)
  const safeMessage = message ? escapeHtml(message) : ''

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #6B3D2D;">New Course Enquiry</h2>
      
      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <p><strong>Name:</strong> ${safeFirstName} ${safeLastName}</p>
        <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
        ${safePhone ? `<p><strong>Phone:</strong> ${safePhone}</p>` : ''}
        <p><strong>Course Interest:</strong> ${safeCourse}</p>
        <p><strong>Student Type:</strong> ${studentTypeLabel(studentType)}</p>
      </div>

      ${safeMessage ? `
        <div style="margin-bottom: 20px;">
          <h3 style="color: #6B3D2D;">Message:</h3>
          <p style="white-space: pre-wrap;">${safeMessage}</p>
        </div>
      ` : ''}

      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
      <p style="color: #999; font-size: 12px;">This is an automated message from Global Café Business School.</p>
    </div>
  `

  try {
    // Send to admin
    await activeTransporter.sendMail({
      from: `${fromName} <${fromAddress}>`,
      to: adminInbox,
      subject: `New Course Enquiry: ${courseInterest}`,
      replyTo: email,
      html: htmlContent,
    })

    // Send confirmation to user
    await activeTransporter.sendMail({
      from: `${fromName} <${fromAddress}>`,
      to: email,
      subject: 'We Received Your Enquiry — Global Café Business School',
      replyTo: adminInbox,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6B3D2D;">Thank You, ${safeFirstName}!</h2>
          <p>We've received your enquiry about <strong>${safeCourse}</strong>.</p>
          <p>Our admissions team will contact you within 24 hours at <strong>${safeEmail}</strong>${safePhone ? ` or ${safePhone}` : ''}.</p>
          <p>In the meantime, feel free to explore our programmes at <a href="${siteUrl}/courses">our website</a>.</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #999; font-size: 12px;">Global Café Business School</p>
        </div>
      `,
    })

    return true
  } catch (error) {
    console.error('Email send error:', error)
    throw error
  }
}
