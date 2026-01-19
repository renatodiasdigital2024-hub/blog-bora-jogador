import React, { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from './Header'; // React Header
import Footer from './Footer'; // React Footer

interface LayoutProps {
    title?: string;
    description?: string;
    image?: string;
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
    children,
    title,
    description = "Bora Jogador - O melhor do futebol, análises e reviews com inteligência.",
    image = "/images/og-default.jpg"
}) => {
    const pageTitle = title ? `${title} | Bora Jogador` : "Bora Jogador";

    return (
        <>
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={description} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={image} />
                <meta property="og:type" content="website" />
            </Helmet>

            <div className="bg-gray-50 text-gray-900 font-sans min-h-screen flex flex-col">
                <Header />

                <main className="flex-grow min-h-screen">
                    {children}
                </main>

                <Footer />
            </div>
        </>
    );
};

export default Layout;
