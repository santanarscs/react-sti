import IGraduation from './IGraduation';
import ISpecialty from './ISpecialty';
import IBoard from './IBoard';
import ISection from './ISection';

export default interface IUser {
  id: string;
  _id: string;
  name: string;
  email: string;
  password: string;
  specialty: ISpecialty;
  board: IBoard;
  graduation: IGraduation;
  section: ISection;
  saram: string;
  full_name: string;
  situation: string;
  phone: string;
  birthday: Date;
  last_promotion: Date;
  sequence: string;
  provider: boolean;
  avatar?: string;
}
