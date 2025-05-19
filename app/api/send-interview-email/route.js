import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { email, interviewTime, position } = await request.json();

    if (!email || !interviewTime || !position) {
      return new Response(JSON.stringify({ message: 'Missing fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'Campusconnectsoftware@gmail.com',
        pass: 'nhdnmpwafqpnckvq', // Use the App Password here (no spaces)
      },
    });

    await transporter.sendMail({
      from: 'Campusconnectsoftware@gmail.com',
      to: email,
      subject: `Your Mock Interview for ${position} is Scheduled`,
      html: `
        <h1>Interview Scheduled!</h1>
        <p><strong>Position:</strong> ${position}</p>
        <p><strong>Time:</strong> ${new Date(interviewTime).toLocaleString()}</p>
        <p>You have an interview Scheduled.</p>
      `,
    });

    return new Response(JSON.stringify({ message: 'Email sent successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
