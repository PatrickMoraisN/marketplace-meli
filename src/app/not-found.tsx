import Link from 'next/link'
import { SearchHeader } from '../shared/ui'
import styles from './not-found.module.scss'

export default function NotFound() {
  return (
    <>
      <SearchHeader />
      <main className={styles.notFound}>
        <h1>Página não encontrada</h1>
        <p>O conteúdo que você procura não existe ou foi movido.</p>
        <Link href="/" className={styles.backLink}>
          Voltar para a página inicial
        </Link>
      </main>
    </>
  )
}
