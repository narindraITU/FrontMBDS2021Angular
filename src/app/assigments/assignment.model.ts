import { Eleves } from "../Eleves/eleves.model";
import { Matiere } from "../Matieres/matiere.model";

export class AssignmentModel {
  _id: string;
  nom: string;
  dateDeRendu: Date;
  rendu?: boolean;
  idMatiere: string;
  matiere: Matiere;
  idEleve: string;
  eleve: Eleves;
  note: number | null;
  remarques: string;
}
