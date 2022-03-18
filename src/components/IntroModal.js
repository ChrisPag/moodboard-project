import Modal from 'react-modal';
import { useState, useEffect } from 'react';

function IntroModal() {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        setModalIsOpen(true);
    }, []);

    let modalStyles = {overlay: {zIndex: 10}};
    return ( 
        <div className="introModal">
            <Modal className="modal" isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} 
            closeTimeoutMS={500} style={ modalStyles } ariaHideApp={false}>
                <div>
                    <img src='modal.gif' alt="modal gif"></img>
                    <div className='modalText'>
                    <p>Find the images that match your mood.</p>
                    <p>Create your own beautiful moodboards.</p>
                    </div>
                    <button onClick={() => setModalIsOpen(false)} id="modalGotIt" className="btn">Got it!</button>
                </div>
            </Modal>
        </div>
    );
}

export default IntroModal;