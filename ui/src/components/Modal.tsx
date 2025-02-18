import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    {/* Modal Header */}
                    <div className="modal-header" style={{ padding: '10px 15px' }}>
                        <h5 className="modal-title" id="exampleModalLabel" style={{ color: 'black' }}>{title}</h5>
                        <button type="button" className="close" onClick={onClose} data-dismiss="modal" aria-label="Close" style={{ position: 'absolute', top: '5px', right: '0px' }}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    {/* Modal Body */}
                    <div className="modal-body">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
