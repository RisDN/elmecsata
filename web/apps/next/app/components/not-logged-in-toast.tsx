"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";


const NotLoggedInToast = () => {

    const [isShown, setIsShown] = useState<boolean>(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const message = urlParams.get('message');
        if (!isShown && (message === 'notloggedin')) {
            setIsShown(true);
            toast.error('Kérlek jelentkezz be a kvíz létrehozásához!');
            urlParams.delete('message');
            window.history.replaceState({}, document.title, window.location.pathname + '?' + urlParams.toString());
        }

    }, [isShown]);

    return null;
};


export default NotLoggedInToast;