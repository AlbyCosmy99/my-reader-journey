import './Footer.css';

export default function Footer() {
  return (
    <footer className="app-footer">
      <p className="footer-line">© {new Date().getFullYear()} MyReaderJourney</p>
      <p className="footer-line">
        Designed and developed by{' '}
        <a
          href="https://www.linkedin.com/in/andrei-albudev/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          <strong>Albu Cosmin Andrei</strong>
        </a>
      </p>
      <p className="footer-line tech">Built with React + Bootstrap</p>
    </footer>
  );
}
