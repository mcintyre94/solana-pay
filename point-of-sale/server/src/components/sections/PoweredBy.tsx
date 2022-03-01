import React, { FC } from 'react';
import SolanaPayLogo from '../../images/SolanaPayLogo.svg';
import css from './PoweredBy.module.css';

export const PoweredBy: FC = () => {
    return (
        <div className={css.root}>
            Powered by <SolanaPayLogo />
        </div>
    );
};
