import { AppProps } from 'next/app';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { TorusWalletAdapter } from '@solana/wallet-adapter-torus';
import { PublicKey } from '@solana/web3.js';
import React, { FC, useMemo } from 'react';
import { useRouter } from 'next/router'
import { DEVNET_ENDPOINT } from '../utils/constants';
import { ConfigProvider } from '../components/contexts/ConfigProvider';
import { FullscreenProvider } from '../components/contexts/FullscreenProvider';
import { PaymentProvider } from '../components/contexts/PaymentProvider';
import { ThemeProvider } from '../components/contexts/ThemeProvider';
import { TransactionsProvider } from '../components/contexts/TransactionsProvider';
import SolanaPayLogo from '../images/SolanaPayLogo.svg';
import { SOLIcon } from '../images/SOLIcon';
import css from './RootRoute.module.css';

const App: FC<AppProps> = ({ Component, pageProps }) => {
    // If you're testing without a mobile wallet, set this to true to allow a browser wallet to be used
    const connectWallet = true;
    const wallets = useMemo(
        () => (connectWallet ? [new PhantomWalletAdapter(), new TorusWalletAdapter()] : []),
        [connectWallet]
    );

    const router = useRouter()
    const params = router.query

    const { recipient, label } = useMemo(() => {
        let recipient: PublicKey | undefined, label: string | undefined;

        const recipientParam = params['recipient'] as string;
        const labelParam = params['label'] as string;
        if (recipientParam && labelParam) {
            try {
                recipient = new PublicKey(recipientParam);
                label = labelParam;
            } catch (error) {
                console.error(error);
            }
        }

        return { recipient, label };
    }, [params]);

    console.log({ recipient, label })

    const link = useMemo(() => new URL('/api'), []);

    return (
        <ThemeProvider>
            <FullscreenProvider>
                {recipient && label ? (
                    <ConnectionProvider endpoint={DEVNET_ENDPOINT}>
                        <WalletProvider wallets={wallets} autoConnect={connectWallet}>
                            <WalletModalProvider>
                                <ConfigProvider
                                    link={link}
                                    recipient={recipient}
                                    label={label}
                                    symbol="SOL"
                                    icon={<SOLIcon />}
                                    decimals={9}
                                    minDecimals={1}
                                    connectWallet={connectWallet}
                                >
                                    <TransactionsProvider>
                                        <PaymentProvider>
                                            <Component {...pageProps} />;
                                        </PaymentProvider>
                                    </TransactionsProvider>
                                </ConfigProvider>
                            </WalletModalProvider>
                        </WalletProvider>
                    </ConnectionProvider>
                ) : (
                    <div className={css.logo}>
                        <SolanaPayLogo width={240} height={88} />
                    </div>
                )}
            </FullscreenProvider>
        </ThemeProvider>
    );
};

export default App;
