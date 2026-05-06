import { useState } from 'react';
import './Contact.scss';

const Contact = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    website: '',
    startedAt: Date.now(),
  });

  const [loading, setLoading] = useState(false);

  const nameRegex = /^[A-Za-zА-Яа-яІіЇїЄєҐґ' -]+$/;
  const phoneRegex = /^\+380\d{9}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    if (!nameRegex.test(form.firstName)) {
      return 'First name is invalid';
    }

    if (!nameRegex.test(form.lastName)) {
      return 'Last name is invalid';
    }

    if (!phoneRegex.test(form.phone)) {
      return 'Phone must be +380XXXXXXXXX';
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validate();
    if (error) {
      alert(error);
      return;
    }

    // anti-spam (too fast)
    if (Date.now() - form.startedAt < 2000) {
      return alert('Too fast submission');
    }

    try {
      setLoading(true);

      const res = await fetch('http://localhost:3001/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fName: form.firstName,
          lName: form.lastName,
          phone: form.phone,
          email: form.email,
          message: form.message,
          website: form.website,
          startedAt: Date.now(),
        }),
      });
      if (!res.ok) {
        throw new Error('Failed');
      }

      alert('Request sent successfully ✅');

      setForm({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
        website: '',
        startedAt: Date.now(),
      });

    } catch (err) {
      alert('Something went wrong ❌');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="contact">
      <div className="contact__wrapper">
        <section className="contact__content">
          <h1>Contact us</h1>
          <p>Subheading for description or instructions</p>

          <form className="contact__form" onSubmit={handleSubmit}>
            <label>
              First name
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="Jane"
              />
            </label>

            <label>
              Last name
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Smitherton"
              />
            </label>

            <label>
              Email address
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="email@janesfakedomain.net"
              />
            </label>

            <label>
              Phone number
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+380XXXXXXXXX"
              />
            </label>

            <label>
              Your message
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Enter your question or message"
              />
            </label>

            {/* honeypot */}
            <input
              name="website"
              value={form.website}
              onChange={handleChange}
              className="hidden-field"
              autoComplete="off"
            />

            <button type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Submit'}
            </button>
          </form>
        </section>

        <img
          className="contact__image"
          src="/contact.png"
          alt="Portrait"
        />
      </div>
    </main>
  );
};

export default Contact;