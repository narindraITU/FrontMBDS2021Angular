export class AssignmentModel {
  _id: string;
  nom: string;
  dateDeRendu: Date;
  rendu?: boolean;
  auteur: string;
  titre_matiere: string;
  photo_matiere: string;
  lienphoto_matiere: string;
  nom_prof: string;
  photo_prof: string;
  note: string;
  remarques: string;
}
