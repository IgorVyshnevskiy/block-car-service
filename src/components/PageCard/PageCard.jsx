import css from './PageCard.module.css'

function PageCard({children}) {
  return (
    <main className={css.container}>
      {children}
    </main>
  )
}

export default PageCard
