export default interface IMovimentation {
  id: string;
  date: string;
  user?: {
    name: string;
    graduation: {
      name: string;
    };
  };
  section: {
    name: string;
  };
}
