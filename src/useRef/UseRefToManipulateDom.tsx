import { RefObject, useRef, useState } from "react"


function MyInput({ ref }:{ref:RefObject<HTMLInputElement>}) {
  return <input type="text" ref={ref} />
}

const Form = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    inputRef.current?.focus();
  };
  return (
    <div>
      <MyInput ref={inputRef} />
      <button onClick={handleClick}>聚焦</button>
    </div>
  );
};

const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const ref = useRef<HTMLVideoElement>(null)
  const handleClick = () => {
    const nextIsPlaying = !isPlaying
    setIsPlaying(nextIsPlaying);
     if (nextIsPlaying) {
       ref.current?.play();
     } else {
       ref.current?.pause();
     }
  }
  return (
    <>
      <button onClick={handleClick}>{ isPlaying?'暂停':'播放'}</button>
      <video src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" width="250" ref={ref}
        onPlay={() => setIsPlaying(true)}
        onPause={()=>setIsPlaying(false)}
      ></video>
    </>
  );
}

export default Form;