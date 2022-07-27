import { useRef } from 'react';
// import { useLocation } from 'react-router-dom';

const Navbar = () => {
    const hamRef = useRef();
    // const navRef = useRef();

    const openNav = () => {
        if (hamRef.current.classList.contains('closed')) {
            hamRef.current.classList.remove('closed')
            hamRef.current.classList.add('opened')
        } else {
            hamRef.current.classList.add('closed')
            hamRef.current.classList.remove('opened')
        }
    }
    return (
        <div className="hamburger">
            <button onClick={openNav} className='closed' ref={hamRef}>
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    )
}

export default Navbar