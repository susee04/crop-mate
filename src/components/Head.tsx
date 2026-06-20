interface HeadProps {
  title?: string;
  description?: string;
}

export const Head = ({ title, description }: HeadProps) => {
  const defaultTitle = "Crop Mate - Your AI Farming Assistant";
  const defaultDescription = "Get expert advice on crops, pests, soil, weather, and government schemes in your language.";
  const siteTitle = title ? `${title} | Crop Mate` : defaultTitle;

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{siteTitle}</title>
      <meta name="description" content={description || defaultDescription} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description || defaultDescription} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={description || defaultDescription} />

      {/* Fonts */}
      <link rel="preconnect" href="https://static.parastorage.com" />
    </>
  );
};
