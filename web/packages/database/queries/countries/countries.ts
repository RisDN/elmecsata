import { ContinentData, Country } from '@elmecsata/types';
import { sql } from 'drizzle-orm';
import { db } from '../../mysql';
import { continents, countries } from '../../schema';

export const getCountryByName = async (countryName: string) => {
    const data = await db
        .select()
        .from(countries)
        .where(sql`${countries.country} = ${countryName}`)
        .execute();

    return data[0] as unknown as Country;
};

export const getCountryById = async (countryId: number) => {
    const data = await db
        .select()
        .from(countries)
        .where(sql`${countries.id} = ${countryId}`)
        .execute();

    return data[0] as unknown as Country;
}

export const getCountriesFormatted = async (): Promise<ContinentData[]> => {
    const data = await db
        .select({
            id: countries.id,
            country: countries.country,
            country_code: countries.countryCode,
            continent_id: continents.id,
            continent_name: continents.continent,
        })
        .from(countries)
        .leftJoin(continents, sql`${countries.continent} = ${continents.id}`)
        .execute();

    const groupedByContinent = data.reduce((acc: { [key: string]: ContinentData }, curr) => {
        const continentName = curr.continent_name;
        const continentId = curr.continent_id;

        if (continentName == null) {
            return acc;
        }

        if (!acc[continentName]) {
            acc[continentName] = {
                continent: {
                    id: continentId!,
                    name: continentName,
                },
                items: [],
            };
        }

        acc[continentName].items.push({
            id: curr.id,
            continent: {
                id: continentId!,
                name: continentName,
            },
            country: curr.country,
            country_code: curr.country_code,
        });

        return acc;
    }, {});

    return Object.values(groupedByContinent);
};
