export const shortenPubkey = (pubkey: string) => {
  return (
    pubkey.slice(0, 6) + "..." + pubkey.slice(pubkey.length - 6, pubkey.length)
  );
};
