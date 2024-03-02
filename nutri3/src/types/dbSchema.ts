export type FoodEntry = {
    nutriments: string;
    user: User;
};

// Team Member
export type User = {
    id: string;
    ageBorn: string;
    height: string;
    weight: string;
    nutriSkils: string;
};