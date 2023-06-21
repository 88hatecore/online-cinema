import cn from "classnames";
import parse from "html-react-parser";
import { FC } from "react";

const Description: FC<{ text: string; className?: string }> = ({
	text,
	className = "",
}) => {
	return (
		<div
			className={cn("text-lg font-light text-white text-opacity-60", className)}
		>
			<p>{parse(text)}</p>
		</div>
	);
};

export default Description;
