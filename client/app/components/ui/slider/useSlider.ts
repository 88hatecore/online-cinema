import { useState } from "react";

export const useSlider = (length: number) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [slideIn, setSlideIn] = useState(true);

	const isExistsNext = currentIndex + 1 < length;
	const isExistsPrev = currentIndex ? currentIndex - 1 < length : false;

	const handleArrowClick = (direction: "next" | "prev") => {
		const newIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;
		setSlideIn(false);

		setTimeout(() => {
			setCurrentIndex(newIndex);
			setSlideIn(true);
		}, 300);
	};

	return {
		slideIn,
		index: currentIndex,
		isNext: isExistsNext,
		isPrev: isExistsPrev,
		handleClick: handleArrowClick,
	};
};
