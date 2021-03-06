import { object, string, number, array } from "yup";

const payload = {
    body: object({
        title: string().required("Title is required"),
        gameConsole: string().required("console is required"),
        genres: array(),
        description: string(),
        coverImage: string().required("cover image is required"),
        rating: number().required("rating is required").positive().integer(),
        releaseDate: string().required("release date is required"),
    }),
};

export const createGameSchema = object({
    ...payload,
});
