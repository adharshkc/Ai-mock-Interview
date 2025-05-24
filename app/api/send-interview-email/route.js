import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { email, interviewTime, position } = await request.json();

    if (!email || !interviewTime || !position) {
      return new Response(JSON.stringify({ message: "Missing fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "interviewreviewerprj16@gmail.com",
        pass: "rfqeuajgmvtalgqx ", // Use the App Password here (no spaces)
      },
    });

    await transporter.sendMail({
      from: "interviewreviewerprj16@gmail.com",
      to: email,
      subject: `Your Mock Interview for ${position} is Scheduled`,
      html: `<html>
           <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
      <h1 style="color: #333333;">🎉 Interview Scheduled!</h1>
      <p style="font-size: 16px; color: #555555;">We're excited to inform you that your interview has been scheduled. Below are the details:</p>
      <table style="width: 100%; margin-top: 20px; font-size: 16px; color: #444;">
        <tr>
          <td style="font-weight: bold; padding: 8px 0;">Position:</td>
          <td>${position}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; padding: 8px 0;">Time:</td>
          <td>${new Date(interviewTime).toLocaleString()}</td>
        </tr>
      </table>
      <p style="margin-top: 30px; font-size: 16px; color: #555;">
        Please make sure to be available on time. We wish you the best of luck!
      </p>
      <p style="margin-top: 20px; font-size: 14px; color: #999;">If you have any questions, feel free to reply to this email.</p>
    </div>
  </body>
</html>

      `,
    });

    return new Response(
      JSON.stringify({ message: "Email sent successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
