import { User } from "@elmecsata/typesuser";

export interface Cardprops {
    cim: string;
    szin: "yellow" | "blue" | "red";
    leiras: string;
    likeok: number;
    datum?: Date;
    keszitette: User;
}

function Card(props: Cardprops) {
    return (
        <div className={`bg-${props.szin}-700`}>
            <div>Cim: {props.cim}</div>
            <div>
                Készítő: {props.keszitette.name}
            </div>
            <ul>
                <li>leirás: {props.leiras}</li>
                <li>Likeok: {props.likeok}</li>
                {props.datum && props.datum.getFullYear() === 2024 && <li>Dátum: {props.datum.getFullYear()}</li>}
            </ul>
        </div>
    )
}

export default Card;