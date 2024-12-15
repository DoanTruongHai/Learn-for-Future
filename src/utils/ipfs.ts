export const ipfsToHttp = (ipfsUrl: string): string => {
  // Convert IPFS URL to HTTP gateway URL
  if (ipfsUrl.startsWith("ipfs://")) {
    return ipfsUrl.replace("ipfs://", "");
  }
  return ipfsUrl;
};
