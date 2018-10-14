import { VariableEnv } from "./variable-env";

export class Container {
    Id: string;
    Image: string;
    Nom: string;
    Ram: number;
    Cpu: number;
    CheminHost: string;
    CheminGuest: string;
    PortHost: number;
    PortGuest: number;
    VariablesEnv: Array<VariableEnv>;

    constructor() {
        this.VariablesEnv = [];
    }

    addVariable(variableEnv: any) {
        console.log("container variable a ajouter : ", variableEnv);
        this.VariablesEnv.push(new VariableEnv(variableEnv.NomVariable, variableEnv.Valeur));
        console.log("container variable censé etre ajoutée : ", variableEnv);
        console.log("push : ", this.VariablesEnv);
    }

    reset() {
        this.Image = null;
        this.Nom = null;
        this.Ram = null;
        this.Cpu = null;
        this.CheminHost = null;
        this.CheminGuest = null;
        this.PortHost = null;
        this.PortGuest = null;
        this.VariablesEnv = [];
    }
}
