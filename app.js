const ROWS_MAX = 100;
const COL_MAX = 100;

class ExcellApp {
    app;
    constructor(name) {
        this.sheetName = name;
    }

    init() {
        console.debug("App stated...");
        app = document.getElementById("app");
        this.drawSheet();
    }

    drawSheet() {

        let sheetMatrix = this.createElement('div');
        let columns = this.createElement('div');
        columns.setAttribute('class', "row-column");

        for (let index = 1; index <= COL_MAX; index++) {
            let colIndex = this.createElement('div');
            colIndex.id=`c${index}`;
            colIndex.setAttribute('class', "col-inner");

            let input = this.createElement('input');
            input.id=`i${index}`;
            input.setAttribute('class', "sheet--input");

            colIndex.appendChild(input);
            columns.appendChild(colIndex);
        }

        for (let index = 1; index <= ROWS_MAX; index++) {
            let rowIndex = `r${index}`;

            let colIndex = this.createElementWithValue('div', index);
            colIndex.id=`r${index}-c${0}`;
            colIndex.setAttribute('class', "col-index");           
            
            let row = this.createElement('div');
            row.id=rowIndex;
            row.setAttribute('class', "row-index");
            row.appendChild(colIndex);

            // Add columns to the current row
            let rowColumns = columns.cloneNode(true)
            rowColumns.id = `${rowIndex}-${rowColumns.id}`

            row.appendChild(columns.cloneNode(true));

            sheetMatrix.appendChild(row);
        }

        app.appendChild(sheetMatrix);
    }

    createElementWithValue(type, value) {
        let node = this.createElement(type);
        let textnode = document.createTextNode(value);
        node.appendChild(textnode);
        return node;
    }

    createElement(type) {
        return document.createElement(type);
    }
}

class SheetStore {
    cells = []
  }

app = new ExcellApp("Demo");