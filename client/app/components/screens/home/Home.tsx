import { FC } from "react";

import Gallery from "@/components/ui/gallery/Gallery";
import Heading from "@/components/ui/heading/Heading";
import SubHeading from "@/components/ui/heading/SubHeading";
import Slider from "@/components/ui/slider/Slider";

import Meta from "@/utils/meta/Meta";

import { IHome } from "./home.interface";

const Home: FC<IHome> = ({ slides, actors, trendingMovies }) => {
	return (
		<Meta
			title="Watch movies online"
			description="Watch MovieApp movies and TV shows online or stream right to your browser."
		>
			<Heading
				title="Watch movies online"
				className="text-gray-300 mb-8 text-xl"
			/>

			{slides.length && <Slider slides={slides} />}

			<div className="my-10">
				<SubHeading title="Trending now" />
				{trendingMovies.length && <Gallery items={trendingMovies} />}
			</div>

			<div>
				<SubHeading title="Best actors" />
				{actors.length && <Gallery items={actors} />}
			</div>
		</Meta>
	);
};

export default Home;
