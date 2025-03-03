export interface Echange {
    id: number;
    statut: string;  // "EN_ATTENTE", "ACCEPTE", "REFUSE"
    dateDemande: string;  // Date de la demande d'échange
    objetOffert: {
      id: number;
      nom: string;
      description: string;
    };
    objetDemande: {
      id: number;
      nom: string;
      description: string;
    };
    demandeur: {
      id: number;
      nom: string;
    };
    receveur: {
      id: number;
      nom: string;
    };
}
  