import styles from '../../styles/Feed.module.css';
import { useRouter } from 'next/router';

export const Feed = ({ articles, pageNumber }) => {
    const router = useRouter();
    return (
        <div>
            <div className={styles.main}>
           <div> <h1 className = {styles.heading}>The e-Times</h1><br></br>
            <p>One click update of all current affairs</p>
            <br></br>
            <hr></hr>
            <br></br>
            </div>
                {articles.map((article, index) => (
                    <div key={index} className={styles.post}>
                        <h1 onClick={() => (window.location.href = article.url)}>{article.title}</h1>
                        <p>{article.description}</p>
                        {!!article.urlToImage && <img src={article.urlToImage} />}
                        <hr></hr>
                    </div>
                ))}
            </div>
            <div className={styles.paginator}>
                <div
                    className={pageNumber === 1 ? styles.disabled : styles.active}
                    onClick={() => {
                        if (pageNumber > 1) {
                            router.push(`/feed/${pageNumber - 1}`)
                        }
                    }}
                >
                    Previous Page
                </div>
                <div>#{pageNumber}</div>
                <div
                    className={pageNumber === 5 ? styles.disabled : styles.active}
                    onClick={() => {
                        if (pageNumber < 5) {
                            router.push(`/feed/${pageNumber + 1}`)
                        }
                    }}
                >
                    Next Page
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps = async pageContext => {
    const pageNumber = pageContext.query.id;

    if (!pageNumber || pageNumber < 1 || pageNumber > 5) {
        return {
            props: {
                articles: [],
                pageNumber: 1,
            },
        };
    }

    const apiResponse = await fetch(
        "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=c6713501e7e04c08bf4b95400824bfdf"
    );
    
    const json = await apiResponse.json();
    const { articles } = json;

    return {
        props: {
            articles,
            pageNumber: Number.parseInt(pageNumber),
        },
    };
};

export default Feed;