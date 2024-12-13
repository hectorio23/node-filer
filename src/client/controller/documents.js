"use strict";

class Document {
    constructor(name, weight, permission, lastModification, state, owner) {
        this.hash = crypto.randomUUID(); // Identificador único
        this.name = name;
        this.weight = weight;
        this.permission = permission;
        this.lastModification = lastModification;
        this.state = state;
        this.owner = owner;
        this.type = "document";
    }

    getInfo() {
        return {
            hash: this.hash,
            name: this.name,
            weight: this.weight,
            permission: this.permission,
            lastModification: this.lastModification,
            state: this.state,
            owner: this.owner,
            type: this.type,
        };
    }
}

export { Document };
