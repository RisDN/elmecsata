export interface Continent {
    id: number;
    name: string;
}

export interface Country {
    id: number;
    continent: Continent;
    country: string;
    country_code: string;
}

export interface ContinentData {
    continent: {
        id: number | null;
        name: 'Amerika' | 'Európa' | 'Ázsia' | 'Afrika' | 'Óceánia';
    };
    items: Country[];
}
