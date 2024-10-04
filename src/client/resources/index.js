// Autor: Héctor Adán
// GitHub: https://github.com/hectorio23
"strict mode";
 
const mainContent = document.querySelector(".content__files");

const readFile = pathFile => {
    readerTmp = new FileReader(pathFile);

}

const queryResources = () => {
    const headers = ["Name", "Path", "Modified", "Permissions", "Size", ];

    // DATA EXAMPLE
    // TODO: For the moment this data is temporal while the project
    // is on development phase
    const userData = [
        ["Documents", "/", "16-07-24 :12:50", "rw-rw-r--", "3 MB"],
        ["Photos", "/", "29-07-24 :12:50", "rwxr-xr-x", "4 KB"]
    ];

    const content = document.createDocumentFragment();
    const tables = document.createDocumentFragment();

    const tableHead = document.createElement("TABLE");
    tableHead.classList.add("class", "table__head");

    const separator = document.createElement("HR");
    separator.classList.add("content__files--separator");

    const  advice = document.createElement("H4");
    advice.classList.add("class", "advice");
    advice.textContent = "Upss! There's nothing here";
    
    
    if (!true) {
        content.appendChild(advice);
        return content;
    }

    // In case that any directory or resource is, the following code will
    // executes

    // This creates the table's head and adds as a child to the 
    // document fragment.
    // Add something like this:
    //  @----------------------------------------------------------@
    //  |   <table class="table__head">                            |
    //  |       <th class="table__head--item">Name</th>            |
    //  |       <th class="table__head--item">Path</th>            |
    //  |       <th class="table__head--item">Modified</th>        |
    //  |       <th class="table__head--item">Permissions</th>     |
    //  |       <th class="table__head--item">Size</th>            |
    //  |   </table>                                               |
    //  |                                                          |
    //  |   <hr class="content__files--separator"/>                |
    //  @----------------------------------------------------------@
    
    for (let header of headers) {
        let element = document.createElement("TH");
        element.classList.add("table__head--item");
        element.textContent = header;
        tableHead.appendChild(element);
    }
    
    //  @----------------------------------------------------------@
    //  |<table class="table">                                     |
    //  |  <tr class="table_colum">                                |
    //  |      <td class="table__item">Documents/</td>             |
    //  |      <td class="table__item">./</td>                     |
    //  |      <td class="table__item">16-07-24 :12:50</td>        |
    //  |      <td class="table__item">664</td>                    |
    //  |      <td class="table__item">3 MB</td>                   |
    //  |  </tr>                                                   |
    //  |</table>                                                  |
    //  @----------------------------------------------------------@

    // Adds the resources to one table
    let table = document.createElement("TABLE");
    table.classList.add("table");

    for (let resourceData of userData) {

        let rowTable = document.createElement("TR");
        rowTable.classList.add("table_column");

        for (let dataInfo of resourceData) {
            let columnTable = document.createElement("TD");
            columnTable.classList.add("table__item");

            columnTable.textContent = dataInfo;
            rowTable.appendChild(columnTable);
        }

        table.appendChild(rowTable);
        tables.appendChild(table);
    }

    content.appendChild(tableHead);
    content.appendChild(separator);
    content.appendChild(tables);
    return content;



}

function main() {
    content = queryResources();
    mainContent.appendChild(content);

}

main();
