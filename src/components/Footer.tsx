import { DEVELOPER_GITHUB_URL, DEVELOPER_NAME } from '../constants.ts'

export function Footer() {
  return (
    <footer className="site-footer">
      <p className="site-footer-text">
        Desenvolvido por {DEVELOPER_NAME} ·{' '}
        <a
          className="site-footer-link"
          href={DEVELOPER_GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </p>
    </footer>
  )
}
