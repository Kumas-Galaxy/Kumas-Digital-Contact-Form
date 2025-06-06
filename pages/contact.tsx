import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSubmitted(true);
        setForm({ name: "", email: "", message: "" });
      } else {
        const data = await res.json();
        setError(data.error || "Failed to send message.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Contact Us</h1>
      {submitted ? (
        <p>✅ Message sent successfully!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label><br />
            <input type="text" name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div>
            <label>Email</label><br />
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </div>
          <div>
            <label>Message</label><br />
            <textarea name="message" value={form.message} onChange={handleChange} required />
          </div>
          <button type="submit">Send</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      )}
    </div>
  );
}
   
     
     
 
