import { TelegramOptions } from "src/telegram/telegram.interface";

export const getTelegramConfig = (): TelegramOptions => ({
	chatId: "",
	token: "",
});
