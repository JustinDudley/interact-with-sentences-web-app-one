import { Tableau } from './Tableau';

export interface GetTableauProps {
   tableau: Tableau | null;
   setTableau: React.Dispatch<React.SetStateAction<Tableau | null>>;
   letterPair: string;
   setLetterPair: React.Dispatch<React.SetStateAction<string>>;
}
