import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// NOTE: Since you are on a free Resend plan, you must use onboarding@resend.dev as the sender
// unless you have verified a custom domain. You can only send to your own verified email for now.
const FROM_EMAIL = "Loop & Bloom <onboarding@resend.dev>";

export async function sendOrderConfirmation(order) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("⚠️ RESEND_API_KEY not set. Skipping email.");
    return;
  }

  try {
    // Build the items HTML
    const itemsHtml = order.items.map(item => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">
          <img src="${item.image}" width="50" style="border-radius: 4px;" /><br/>
          <strong>${item.name}</strong>
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">$${item.price.toFixed(2)}</td>
      </tr>
    `).join("");

    const htmlContent = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #2C2C2C;">
        <h1 style="font-family: Georgia, serif; font-size: 28px; text-align: center; margin-bottom: 5px;">Thank you.</h1>
        <p style="text-align: center; font-family: Georgia, serif; font-style: italic; font-size: 20px; color: #8B6F47; margin-top: 0;">
          Wrapped with love.
        </p>
        
        <p>Hi ${order.name.split(" ")[0] || "there"},</p>
        <p>Your order <strong>${order.orderNumber}</strong> has been received and is being carefully wrapped.</p>

        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <thead>
            <tr style="background-color: #FBF9F4; text-align: left;">
              <th style="padding: 10px;">Item</th>
              <th style="padding: 10px; text-align: center;">Qty</th>
              <th style="padding: 10px; text-align: right;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <h3 style="text-align: right; margin-top: 20px;">Total: $${order.total.toFixed(2)}</h3>

        <p style="margin-top: 30px; font-size: 14px; color: #666;">
          We'll send you another email when your order ships. 
          If you have any questions, simply reply to this email.
        </p>
        
        <p style="font-size: 14px; color: #666; margin-top: 40px; text-align: center;">
          © ${new Date().getFullYear()} Loop & Bloom. Made with care.
        </p>
      </div>
    `;

    const data = await resend.emails.send({
      from: FROM_EMAIL,
      to: order.email,
      subject: `Your Loop & Bloom order ${order.orderNumber}`,
      html: htmlContent,
    });

    console.log(`✅ Confirmation email sent for order ${order.orderNumber}:`, data);
  } catch (error) {
    console.error("❌ Failed to send email:", error);
  }
}