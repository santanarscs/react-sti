export default interface IMovimentation {
  id: string;
  date: string;
  user?: string;
  section: {
    name: string;
  };
}
