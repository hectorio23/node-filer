
class Folder {
    constructor(name) {
        this.hash = crypto.randomUUID(); 
        this.name = name;
        this.contents = [];
        this.type = "folder";
    }

    getContents() {
        return this.contents;
    }

    addItem(item) {
        if (item.type == "folder" || item.type == "document") {
            this.contents.push(item);
        } else {
            throw new Error("Only Folder or Document instances can be added.");
        }
    }
}

export { Folder };
