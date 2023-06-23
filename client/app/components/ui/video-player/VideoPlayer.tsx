import cn from "classnames";
import { FC } from "react";

import { useAuth } from "@/hooks/useAuth";

import MaterialIcon from "../MaterialIcon";

import AuthPlaceholder from "./AuthPlaceholder/AuthPlaceholder";
import styles from "./VideoPlayer.module.scss";
import { useVideo } from "./useVideo";
import { IVideoPlayer } from "./video.interface";

const VideoPlayer: FC<IVideoPlayer> = ({ slug, videoSource }) => {
	const { actions, video, videoRef } = useVideo();

	const { user } = useAuth();
	return (
		<div
			className={cn(styles.wrapper, {
				"h-96": !user,
			})}
		>
			{user ? (
				<>
					<video
						ref={videoRef}
						className={styles.video}
						src={`${videoSource}#t=5`}
						preload="metadata"
					/>
					<div className={styles.progressBarContainer}>
						<div
							style={{ width: `${video.progress}%` }}
							className={styles.progressBar}
						/>
					</div>

					<div className={styles.controls}>
						<div>
							<button onClick={actions.backward}>
								<MaterialIcon name="MdHistory" />
							</button>

							<button onClick={actions.toggleVideo}>
								<MaterialIcon
									name={video.isPlaying ? "MdPause" : "MdPlayArrow"}
								/>
							</button>

							<button onClick={actions.forward}>
								<MaterialIcon name="MdUpdate" />
							</button>

							<div className={styles.timeControls}>
								<p className={styles.controlsTime}>
									{Math.floor(video.currentTime / 60) +
										":" +
										("0" + Math.floor(video.currentTime % 60)).slice(-2)}
								</p>
								<p> / </p>
								<p>
									{Math.floor(video.videoTime / 60) +
										":" +
										("0" + Math.floor(video.videoTime % 60)).slice(-2)}
								</p>
							</div>
						</div>
						<div>
							<button onClick={actions.fullScreen}>
								<MaterialIcon name="MdFullscreen" />
							</button>
						</div>

						{/* change volume */}
						{/* change quality */}
					</div>
				</>
			) : (
				<AuthPlaceholder slug={slug} />
			)}
		</div>
	);
};

export default VideoPlayer;
