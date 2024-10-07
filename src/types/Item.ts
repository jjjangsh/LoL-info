export type Items = {
  name: string;
  plaintext: string;
  image: {
    full: string;
  };
  consumed?: boolean;
  inStore?: boolean;
};
