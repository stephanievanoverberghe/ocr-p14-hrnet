import PropTypes from 'prop-types';

function Modal({ isOpen, onClose, message }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-lg font-semibold">{message}</p>
                <button className="mt-4 bg-[#5a6f07] text-white px-4 py-2 rounded" onClick={onClose}>
                    OK
                </button>
            </div>
        </div>
    );
}

// Définition des PropTypes
Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
};

export default Modal;
