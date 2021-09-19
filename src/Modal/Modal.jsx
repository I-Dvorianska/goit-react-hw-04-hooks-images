import { useEffect } from 'react';
import './Modal.css';
import PropTypes from 'prop-types';



function Modal({ onCloseModal,  children }) {
   
  const onEscClick = (e) => {
    if (e.code === 'Escape') {
      onCloseModal();
      window.removeEventListener('keydown',onEscClick)
      }
  }
  const handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      onCloseModal();
      }
    };
  
   useEffect(() => {
    window.addEventListener('keydown', onEscClick) 
   })
   
  return <div className="Overlay" onClick={handleBackdropClick}>
    <div className="Modal">
    {children}
    </div>
    </div>
};

Modal.propTypes = {
  children: PropTypes.node,
  onCloseModal: PropTypes.func
  }

export default Modal;