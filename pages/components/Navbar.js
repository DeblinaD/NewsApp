import { useRouter } from 'next/router';
import styles from '../../styles/Navbar.module.css';

const Navbar = () => {
    const router = useRouter();

    return (
        <div className={styles.main}>
        
            <div onClick={() => router.push('/feed/1')}>HOME</div>
            <div onClick={() => (window.location.href = 'https://www.linkedin.com/in/deblinad/')}>Know the Developer</div>
        </div>
    )
}

export default Navbar