window.onload = () => {
    const form = document.getElementById("contactForm") as HTMLFormElement;

    form?.addEventListener("submit", async (event) => {
      event.preventDefault(); // Prevent the default form submission

      const formData = new FormData(form);

      // Prepare the form data to be sent
      const data = {
        name: formData.get("name")?.toString() ?? "",
        email: formData.get("email")?.toString() ?? "",
        message: formData.get("message")?.toString() ?? "",
      };

      // Send the form data to the server endpoint
      try {
        const response = await fetch("/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok && result.success) {
          alert("Message sent successfully!");
        } else {
          alert("There was an error sending the message: " + (result.error || "Unknown error"));
        }
      } catch (error) {
        alert("Failed to send message: " + error);
      }
    });
  };