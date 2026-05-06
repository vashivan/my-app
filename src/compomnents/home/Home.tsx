import { NavLink } from 'react-router-dom';
import './Home.scss';

const reviews = [
  {
    text: '“A terrific piece of praise”',
    name: 'Name',
    desc: 'Description',
    img: '/contact.png',
  },
  {
    text: '“A fantastic bit of feedback”',
    name: 'Name',
    desc: 'Description',
    img: '/Avatar.svg',
  },
  {
    text: '“A genuinely glowing review”',
    name: 'Name',
    desc: 'Description',
    img: '/Avatar1.svg',
  },
];

const Home = () => {
  return (
    <main className="home">
      <div className="container">
        {/* HERO */}
        <section className="hero">
          <h1>Landing page title</h1>
          <p>And a subheading describing your site, too</p>
          <NavLink to='/contact' className="hero__btn">Send form</NavLink>
        </section>

        {/* IMAGE */}
        <img
          className="heroImage"
          src="/homeimg.png"
          alt=""
        />

        {/* REVIEWS */}
        <section className="reviews">
          <h2>Heading</h2>
          <p className="reviews__sub">
            Subheading to introduce testimonials
          </p>

          <div className="reviews__list">
            {reviews.map((r) => (
              <div className="card" key={r.text}>
                <p className="card__text">{r.text}</p>

                <div className="card__user">
                  <img src={r.img} alt="" />

                  <div>
                    <h4>{r.name}</h4>
                    <p>{r.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;