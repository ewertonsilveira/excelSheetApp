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

        let appMain = this.createElement('div');
        appMain.id="app-main"

        let mainContent = this.createElement('div');
        mainContent.id="main-content"

        let sheetSectionContent = this.createElement('div');
        sheetSectionContent.id="sheet-section"

        let sheetContent = this.createElement('div');
        sheetContent.id="sheet-content"

        let sheetContentRowIndex = this.createElement('div');
        sheetContentRowIndex.id="sheet-content-row-index"

        let sheetContentColIndex = this.createElement('div');
        sheetContentColIndex.id="sheet-content-col-index"
        let colHeadIndex = this.createElement('div');
        colHeadIndex.id="sheet-content-col-head-index"
        
        let sheetBaseMatrix = this.createElement('div');
        sheetBaseMatrix.id="sheet-base-matrix"

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

        // Add rows to main content [1,2,3,4...]
        for (let index = 1; index <= ROWS_MAX; index++) {
            let rowIndex = `r${index}`;
            
            let row = this.createElement('div');
            row.id=rowIndex;
            row.setAttribute('class', "row-index");
            
            // Add columns to the current row
            let rowColumns = columns.cloneNode(true)
            rowColumns.id = `c${rowIndex}`
            
            row.appendChild(rowColumns);
            sheetBaseMatrix.appendChild(row);
        }

        // Create Content head rows [A,B,C...]
        for (let index = 1; index <= ROWS_MAX; index++) {

            let colIndex = this.createElementWithValue('div', index);
            colIndex.id=`r${index}-c${0}`;
            colIndex.setAttribute('class', "col-index");           
            
            sheetContentRowIndex.appendChild(colIndex);
        }
        
        sheetContentColIndex.appendChild(colHeadIndex);
        sheetContent.appendChild(sheetContentRowIndex);
        sheetContent.appendChild(sheetBaseMatrix);
        sheetSectionContent.appendChild(sheetContentColIndex);
        sheetSectionContent.appendChild(sheetContent);
        mainContent.appendChild(sheetSectionContent);        
        appMain.appendChild(mainContent);
        app.appendChild(appMain);
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