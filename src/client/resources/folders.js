
class Folder {
    constructor(name) {
        this.hash = crypto.randomUUID(); // Identificador único
        this.name = name;
        this.contents = []; // Contendrá objetos `Folder` o `Document`
        this.type = "folder";
    }

    getContents() {
        return this.contents;
    }

    addItem(item) {
        console.log(item)
        if (item.type == "folder" || item.type == "document") {
            this.contents.push(item);
        } else {
            throw new Error("Only Folder or Document instances can be added.");
        }
    }
}

export { Folder };
