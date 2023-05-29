export const converMongoDate = (data: string) =>
	new Date(data).toLocaleDateString("ru");
