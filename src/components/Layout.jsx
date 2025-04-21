export default function Layout(props) {
  const { children } = props
  const header = (
    <header>
      <h1 className="text-gradient">Velogram</h1>
      <p><strong>Your 3-Day-a-Week Beginner Base Training Plan</strong></p>
    </header>
  ) 

  const footer = (
    <footer>
      <p>Built by <a href="https://www.nunorsoares.com" target="_blank">NunoRSoares</a><br />
      Styled with <a href="https:www.fantacss.smoljames.com" 
      target="_blank">FantaCSS</a>
      </p>
    </footer>
  )

  return (
    <>
      {header}
      {children}
      {footer}
    </>
  )
}
