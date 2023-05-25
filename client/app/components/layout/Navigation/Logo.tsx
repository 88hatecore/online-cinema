import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

import logoImage from "@/assets/images/88hatecore.svg";

const Logo: FC = () => {
	return (
		<Link href="/">
			<a className="px-layout mb-10 block">
				<Image
					src={logoImage}
					width={247}
					height={34}
					alt="Logo Cinema"
					draggable={false}
				/>
			</a>
		</Link>
	);
};

export default Logo;
