import Head from 'next/head';
import styles from '../styles/Home.module.css';

const hearts = [
    { left: '10%', size: '1.2rem', duration: '7s', delay: '0s' },
    { left: '20%', size: '1.8rem', duration: '9s', delay: '1s' },
    { left: '35%', size: '1.4rem', duration: '8s', delay: '2.5s' },
    { left: '50%', size: '2rem', duration: '10s', delay: '0.5s' },
    { left: '65%', size: '1.3rem', duration: '7.5s', delay: '3s' },
    { left: '80%', size: '1.6rem', duration: '9.5s', delay: '1.5s' },
    { left: '90%', size: '1.1rem', duration: '8.5s', delay: '4s' },
];

function Home() {
    return (
        <>
            <Head>
                <title>Para Jussilea, com amor</title>
                <meta
                    name="description"
                    content="Uma dedicatória cheia de amor e carinho para Jussilea."
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <main className={styles.container}>
                <div className={styles.hearts} aria-hidden="true">
                    {hearts.map((heart, index) => (
                        <span
                            key={index}
                            className={styles.heart}
                            style={{
                                left: heart.left,
                                fontSize: heart.size,
                                animationDuration: heart.duration,
                                animationDelay: heart.delay,
                            }}
                        >
                            💗
                        </span>
                    ))}
                </div>

                <article className={styles.card}>
                    <h1 className={styles.title}>Para você, meu amor</h1>

                    <p className={styles.message}>
                        Com muito amor e carinho coloco uma frase para você, meu amor,{' '}
                        <span className={styles.highlight}>Jussilea</span>.
                        <br />
                        Visualize e veja minha caminhada para o sucesso!
                    </p>

                    <hr className={styles.divider} />

                    <p className={styles.signature}>
                        Eu amo você
                        <span className={styles.pulse} aria-label="coração">
                            💗
                        </span>
                        !
                    </p>
                </article>
            </main>
        </>
    );
}

export default Home;
