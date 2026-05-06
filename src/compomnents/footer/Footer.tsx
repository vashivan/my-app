import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__logo">Site name</div>
      </div>

       <div className="footer__links">
          <div>
            <p>Topic</p>
            <p>Page</p>
            <p>Page</p>
            <p>Page</p>
          </div>

          <div>
            <p>Topic</p>
            <p>Page</p>
            <p>Page</p>
            <p>Page</p>
          </div>

          <div>
            <p>Topic</p>
            <p>Page</p>
            <p>Page</p>
            <p>Page</p>
          </div>
        </div>

      <div className="footer__bottom">
        <div className="footer__socials">
          <span>
            <img src="/facebook.svg" alt="facebook" />
          </span>
          <span>
            <img src="/linkedin.svg" alt="linkedin" />
          </span>
          <span>
            <img src="/youtube.svg" alt="youtube" />
          </span>
          <span>
            <img src="/insta.svg" alt="instagram" />
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;