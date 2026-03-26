import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

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

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #6B3D2D;">New Course Enquiry</h2>
      
      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        <p><strong>Course Interest:</strong> ${courseInterest}</p>
        <p><strong>Student Type:</strong> ${studentType === 'LOCAL' ? 'Local' : studentType === 'INTERNATIONAL' ? 'International' : 'Online'}</p>
      </div>

      ${message ? `
        <div style="margin-bottom: 20px;">
          <h3 style="color: #6B3D2D;">Message:</h3>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      ` : ''}

      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
      <p style="color: #999; font-size: 12px;">This is an automated message from Global Café Business School.</p>
    </div>
  `

  try {
    // Send to admin
    await transporter.sendMail({
      from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM}>`,
      to: process.env.SMTP_FROM,
      subject: `New Course Enquiry: ${courseInterest}`,
      html: htmlContent,
    })

    // Send confirmation to user
    await transporter.sendMail({
      from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM}>`,
      to: email,
      subject: 'We Received Your Enquiry — Global Café Business School',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6B3D2D;">Thank You, ${firstName}!</h2>
          <p>We've received your enquiry about <strong>${courseInterest}</strong>.</p>
          <p>Our admissions team will contact you within 24 hours at <strong>${email}</strong>${phone ? ` or ${phone}` : ''}.</p>
          <p>In the meantime, feel free to explore our programmes at <a href="http://localhost:3000/courses">our website</a>.</p>
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
