import { toast } from "react-toastify";

// create toast
export const createTost = (type, msg) => {

    switch (type) {

        case 'error':
            return toast.error(msg)

        case 'success':
            return toast.success(msg)

        default:
            break;
    }

}

