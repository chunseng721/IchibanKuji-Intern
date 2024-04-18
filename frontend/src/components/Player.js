import React, { useState, useEffect } from "react";
import { Button } from 'react-bootstrap'

const useAudio = (url) => {
  const [audio] = useState(new Audio(url))
  const [playing, setPlaying] = useState(false)

  const toggle = () => setPlaying(true)

  useEffect(() => {
      playing ? audio.play() : audio.pause()
    },
    [playing]
  )

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false))
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [playing, toggle]
};

const Player = ({ url }) => {
  const [playing, toggle] = useAudio(url);

  return (
    <>
      <Button onMouseUp={toggle}></Button>
      </>
  );
};

export default Player