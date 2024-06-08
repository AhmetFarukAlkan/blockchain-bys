import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

function ToastMessage(props) {
    const {
        text,
        duration,
        newWindow,
        close,
        gravity,
        position,
        backgroundColor,
        stopOnFocus
    } = props ?? {};

    return Toastify({
        text: text ?? 'Başarıyla değiştirildi...',
        duration: duration ?? 3000,
        newWindow: newWindow ?? true,
        close: close ?? true,
        gravity: gravity ?? 'top',
        position: position ?? 'right',
        backgroundColor: backgroundColor ?? 'linear-gradient(to right, #37ecba, #72afd3)',
        stopOnFocus: stopOnFocus ?? true
    }).showToast();
}

export default ToastMessage;

