import { FC } from 'react';
import { BsFillPauseFill, BsFillPlayFill } from 'react-icons/bs';
import { HiVolumeOff, HiVolumeUp } from 'react-icons/hi';
// import { VIDEO_BUTTON_TYPE } from '../types';

export enum VIDEO_BUTTON_TYPE {
  play = 'play',
  pause = 'pause',
  mute = 'mute',
  unmute = 'unmuted',
}

type Props = {
  onButtonPress: () => void;
  buttonType: VIDEO_BUTTON_TYPE;
  size?: string;
  opacity?: string;
};

const getSelectedButton = (buttonType: VIDEO_BUTTON_TYPE) => {
  return {
    [VIDEO_BUTTON_TYPE.pause]: <BsFillPauseFill />,
    [VIDEO_BUTTON_TYPE.play]: <BsFillPlayFill />,
    [VIDEO_BUTTON_TYPE.mute]: <HiVolumeOff />,
    [VIDEO_BUTTON_TYPE.unmute]: <HiVolumeUp />,
  }[buttonType];
};

const VideoButton: FC<Props> = ({
  onButtonPress,
  buttonType,
  size = ' text-2xl lg:text-4xl',
  opacity = ' opacity-50',
}) => {
  const SelectedButtonType = getSelectedButton(buttonType);
  return (
    <button
      onClick={onButtonPress}
      className={`flex justify-center items-center bg-slate-400 p-2 rounded-full text-white ${size} ${opacity}`}
    >
      {SelectedButtonType}
    </button>
  );
};

export default VideoButton;
