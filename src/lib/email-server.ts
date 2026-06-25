import { createServerFn } from "@tanstack/react-start";

// Load .env file natively in Node environments if available
if (typeof process !== "undefined" && typeof process.loadEnvFile === "function") {
  try {
    process.loadEnvFile();
  } catch (e) {
    // Silent fail if .env is missing or already loaded
  }
}

export const sendContactEmailFn = createServerFn({ method: "POST" })
  .validator((data: { name: string; email: string; subject: string; message: string; recipientEmail: string }) => data)
  .handler(async ({ data }) => {
    // Read Resend API Key from server environment
    const apiKey = process.env.RESEND_API_KEY || import.meta.env.RESEND_API_KEY || process.env.VITE_RESEND_API_KEY || import.meta.env.VITE_RESEND_API_KEY;
    if (!apiKey) {
      console.warn("RESEND_API_KEY is not defined in environment variables. Email notification skipped.");
      return { success: false, error: "RESEND_API_KEY not configured" };
    }

    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "ByTech Portfolio <onboarding@resend.dev>",
          to: data.recipientEmail || "omkarjadhav1k@gmail.com",
          subject: `[ByTech Contact Form] ${data.subject || "New Message"}`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; line-height: 1.6; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 12px; color: #1e293b;">
              <h2 style="color: #0d9488; margin-top: 0;">New Contact Form Message</h2>
              <p>You received a new inquiry from your developer portfolio website:</p>
              <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
              <p><strong>Name:</strong> ${data.name}</p>
              <p><strong>Email:</strong> <a href="mailto:${data.email}" style="color: #0d9488; text-decoration: none;">${data.email}</a></p>
              <p><strong>Subject:</strong> ${data.subject || "N/A"}</p>
              <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin-top: 15px; border: 1px solid #f1f5f9;">
                <p style="margin: 0; white-space: pre-wrap; font-size: 14px; color: #334155;">${data.message}</p>
              </div>
              <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
              <p style="font-size: 11px; color: #64748b; margin: 0;">This email was sent from your portfolio site via Resend. To receive emails correctly, ensure your sender domain is verified in Resend once in production.</p>
            </div>
          `,
          replyTo: data.email,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Resend API returned an error:", errorText);
        return { success: false, error: errorText };
      }

      const resData = await response.json();
      return { success: true, data: resData };
    } catch (err: any) {
      console.error("Error inside sendContactEmailFn:", err);
      return { success: false, error: err?.message || "Internal server error" };
    }
  });
