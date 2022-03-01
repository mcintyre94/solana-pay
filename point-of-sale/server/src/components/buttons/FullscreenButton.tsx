import React, { FC } from 'react';
import { useFullscreen } from '../../hooks/useFullscreen';
import MaximizeIcon from '../../images/MaximizeIcon.svg';
import MinimizeIcon from '../../images/MinimizeIcon.svg'
import css from './FullscreenButton.module.css';

export const FullscreenButton: FC = () => {
    const { fullscreen, toggleFullscreen } = useFullscreen();

    return (
        <button className={css.button} type="button" onClick={toggleFullscreen}>
            {fullscreen ? <MinimizeIcon /> : <MaximizeIcon />}
        </button>
    );
};
