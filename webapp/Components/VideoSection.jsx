"use client";

import { useRef, useState } from "react";
import { BsFillPlayFill, BsPauseFill } from "react-icons/bs";
import { Slider } from "@/components/ui/slider";

const VideoSection = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video) {
      setCurrentTime(video.currentTime);
      setProgress((video.currentTime / video.duration) * 100 || 0);
    }
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video) {
      setDuration(video.duration);
    }
  };

  const handleSeek = (value) => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = (value / 100) * video.duration;
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <section className="py-24 bg-gradient-to-r from-blue-400 to-purple-600 lg:rounded-md lg:min-h-screen">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-100">
          See ContractLens in Action
        </h2>
        <div className="relative aspect-[2/1] max-w-4xl mx-auto rounded-lg overflow-hidden group">
          {/* Video */}
          <video
            ref={videoRef}
            src="/videos/contract-lens.mp4"
            className="w-full h-full object-cover rounded-lg group-hover:shadow-lg group-hover:shadow-black/40 transition-shadow duration-300"
            muted
            loop={false}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
          />

          {/* Play-Pause Button */}
          <div
            onClick={handlePlayPause}
            className={`
              absolute inset-0 flex items-center justify-center cursor-pointer
              ${isPlaying ? "group-hover:opacity-100 opacity-0" : "opacity-100"}
              transition-opacity duration-300
            `}
          >
            <div
              className="
                p-5 rounded-full bg-gradient-to-br from-blue-400 to-purple-600
                shadow-md active:shadow-none transform active:scale-90 transition-transform duration-150
              "
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <BsPauseFill className="w-12 h-12 text-white" />
              ) : (
                <BsFillPlayFill className="w-12 h-12 text-white" />
              )}
            </div>
          </div>

          {/* Progress Bar & Timing */}
          <div
            className="
              absolute bottom-4 left-0 right-0 flex flex-col items-center
              group-hover:opacity-100 opacity-0 transition-opacity duration-300
            "
          >
            <div className="flex justify-between w-2/3 text-sm text-white mb-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <Slider
              value={[progress]}
              onValueChange={(values) => handleSeek(values[0])}
              max={100}
              className="w-2/3"
              trackClass="h-2 rounded bg-gray-300"
              rangeClass="h-2 rounded bg-gradient-to-r from-blue-400 to-purple-600"
              thumbClass="w-4 h-4 bg-blue-500 shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
