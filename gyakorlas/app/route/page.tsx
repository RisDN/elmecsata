"use client";

import { useState } from "react";

const page = () => {

    const [ertek, setErtek] = useState<number>(5);

    return (
        <div>
            <div>{ertek}</div>
            <button onClick={() => setErtek(ertek + 1)}>Hozzáadás</button><br /><br />
            <button onClick={() => setErtek(ertek - 1)}>kivonás</button>
            <div>
                Az érték: {ertek > 0 && "pozitív"}{ertek < 0 && "negatív"}{ertek == 0 && "nulla"}
            </div>
        </div>
    );
};


export default page;