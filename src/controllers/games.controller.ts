import { Request, Response } from "express";
import { createGame, findGame, getGames } from "../services/game.service";
import log from "../logger";
import { get } from "lodash";
import Game from "../models/game.model";

export const createGameHandler = async (req: Request, res: Response) => {
    try {
        const game = await createGame(req.body);
        return res.send(game);
    } catch (error) {
        log.error(error);
        return res.status(409).send({ message: "Conflict detected" });
    }
};

export const getGamesHandler = async (req: Request, res: Response) => {
    const pageSize: number = +req.query.pagesize!;
    const currentPage: number = +req.query.currentpage!;
    const gameConsole: string = req.query.gameconsole! as string;
    const sortBy: string = req.query.sortby! as string;
    const orderBy: string = req.query.orderby! as string;
    const search: string = req.query.search! as string;
    if (pageSize && currentPage) {
        const gamesData = await getGames({
            gameConsole: gameConsole,
            pageSize: pageSize,
            currentPage: currentPage,
            sortBy: sortBy,
            orderBy: orderBy,
            search: search,
        });
        return res.send({
            games: gamesData.games,
            maxGames: gamesData.maxGames,
        });
    }
    return res.sendStatus(404).send({ message: "Fetching games failed!" });
};

export const getGameHandler = async (req: Request, res: Response) => {
    const gameId = get(req, "params.gameId");
    try {
        const foundGame = await findGame({ _id: gameId });
        if (!foundGame) {
            return res.sendStatus(404).send({ message: "Game not found!" });
        }
        return res.send({
            game: {
                ...foundGame,
                id: foundGame._id,
            },
        });
    } catch (error) {
        return res.sendStatus(404).send({ message: "Game not found!" });
    }
};
