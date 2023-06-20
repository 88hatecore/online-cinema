import cn from "classnames";
import { FC } from "react";

import MaterialIcon from "../../MaterialIcon";

import styles from "./SlideArrow.module.scss";

interface ISlideArrow {
	variant: "left" | "rigth";
	clickHandler: () => void;
}

const SlideArrow: FC<ISlideArrow> = ({ clickHandler, variant }) => {
	const isLeft = variant === "left";
	return (
		<button
			onClick={clickHandler}
			className={cn(styles.arrow, {
				[styles.left]: isLeft,
				[styles.right]: !isLeft,
			})}
		>
			<MaterialIcon name={isLeft ? "MdChevronLeft" : "MdChevronRight"} />
		</button>
	);
};

export default SlideArrow;
