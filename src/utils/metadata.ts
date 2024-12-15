export const truncateString = (str: string, maxLength: number = 64): string => {
  if (str.length <= maxLength) return str;
  return str.substring(0, maxLength - 3) + "...";
};

export const createNFTMetadata = (
  policyId: string,
  name: string,
  description: string,
  imageUrl: string
) => {
  const truncatedName = truncateString(name, 32);

  return {
    "721": {
      [policyId]: {
        [truncatedName]: {
          description: truncateString(description, 64),
          image: imageUrl,
          mediaType: "image/png",
          name: truncatedName,
        },
      },
    },
  };
};

