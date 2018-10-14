export class VariableEnv {
    NomVariable: string;
    Valeur: string;


    constructor(nom?: string, valeur?: string) {
        if (nom && valeur) {
            this.NomVariable = nom;
            this.Valeur = valeur;
        }

    }

    reset() {
        this.NomVariable = null;
        this.Valeur = null;
    }
}
