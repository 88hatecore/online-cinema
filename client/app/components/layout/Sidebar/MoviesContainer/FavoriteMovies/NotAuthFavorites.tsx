import { FC } from "react";

const NotAuthFavorites: FC = () => {
	return (
		<div className="mt-11 bg-gray-700 bg-opacity-20 py-3 px-5 rounded-lg text-white text-opacity-80">
			For viewing favorites please autorize!
		</div>
	);
};

export default NotAuthFavorites;
