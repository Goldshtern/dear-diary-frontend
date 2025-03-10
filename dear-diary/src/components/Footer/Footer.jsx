import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <ul className="footer__content">
        <li className="footer__content-item footer__content-name">
          Designed by Aleksandr Goldshtern
        </li>
        <li className="footer__content-item footer__content-title">
          &copy; MyDearDiary
        </li>
        <li className="footer__content-item footer__content-year">2024</li>
      </ul>
    </footer>
  );
}

export default Footer;
