export class AssignmentModel {
  _id: string;
  nom: string;
  dateDeRendu: Date;
  rendu?: boolean;
  idMatiere: string;
  idEleve: string;
  note: number;
  remarques: string;
}
