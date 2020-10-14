interface IMovimentation {
  id: string;
  date: Date;
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

export default interface IEquipament {
  id: string;
  description: string;
  bpm: string;
  service_tag: string;
  movimentations?: IMovimentation[];
}
