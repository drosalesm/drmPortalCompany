// /src/pages/api/send-email.ts
import { SocialNetworks } from '@data'; // Import your data.json


export async function POST({ request }: { request: Request }) {
    try {
      console.log("Received request to send email"); // Log when the request is received
  
      const { name, email, message } = await request.json();
  

      const { urlService, methodService, ContentType,Athorization,emailTo } = SocialNetworks.formData;

  
      const response = await fetch(`${urlService}`, {
        method: `${methodService}`,
        headers: {
          'Authorization':  `${Athorization}`,
          'Content-Type': `${ContentType}`
        },
        body: JSON.stringify({
          from: 'drmSoftwareDevelopme@resend.dev',
          to: `${emailTo}`,
          subject: `Tienes un nuevo mensaje de: ${name}`,
          html: `<h2>Message:</h2><p>${message}</p><p>Correo: ${email}</p>`
        }),
      });
  
      console.log("Response status from Resend API:", response.status); // Log the response status from the API
  
      if (!response.ok) {
        const errorResponse = await response.json();
        console.log("Resend API error response:", errorResponse); // Log the error response
        throw new Error("Error sending email");
      }
  
      console.log("Email sent successfully"); // Log success
  
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("Error sending email:", error); // Log the error if it happens
  
      return new Response(
        JSON.stringify({ success: false, error: (error as Error).message }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }
  