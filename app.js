const ROWS_MAX = 100;
const COL_MAX = 100;

class ExcellApp {
    app;
    constructor(name) {
        this.sheetName = name;
    }

    init() {
        console.debug("App stated...");
        this.logTime('Start building app');
        
        app = document.getElementById("app");
        this.drawAppContent();

        this.logTime('Finising building app');
    }

    drawAppContent() {

        let appMain = this.createElement('div');
        appMain.id="app-main"

        let mainContent = this.createElement('div');
        mainContent.id="main-content"

        let sheetSectionContent = this.createElement('div');
        sheetSectionContent.id="sheet-section"

        let sheetContent = this.createElement('div');
        sheetContent.id="sheet-content"

        let columns = this.buildSheetContentColumn();
        let sheetBaseMatrix = this.buildSheetContentRows(columns);
        let sheetContentRowIndex = this.buildSheetContentRowIndex();
        let sheetContentColIndex = this.buildSheetContentColIndex();
        
        sheetContent.appendChild(sheetContentRowIndex);
        sheetContent.appendChild(sheetBaseMatrix);
        sheetSectionContent.appendChild(sheetContentColIndex);
        sheetSectionContent.appendChild(sheetContent);
        mainContent.appendChild(sheetSectionContent);        
        appMain.appendChild(mainContent);
        app.appendChild(appMain);
    }

    buildSheetContentColIndex() {
        let sheetContentColIndex = this.createElement('div');
        sheetContentColIndex.id = "sheet-content-col-index";
        let colHeadIndex = this.createElement('div');
        colHeadIndex.id = "sheet-content-col-head-index";
        sheetContentColIndex.appendChild(colHeadIndex);

        // Create Content head columns [A,B,C...]
        for (let index = 1; index <= COL_MAX; index++) {
            let colIndex = this.createElementWithValue('div', index);
            colIndex.id = `sc${index}`;
            colIndex.setAttribute('class', "sheet--col-index");
            sheetContentColIndex.appendChild(colIndex);
        }
        return sheetContentColIndex;
    }

    buildSheetContentRowIndex() {
        let sheetContentRowIndex = this.createElement('div');
        sheetContentRowIndex.id = "sheet-content-row-index";
        // Create Content head rows [1,2,3...]
        for (let index = 1; index <= ROWS_MAX; index++) {

            let rowIndex = this.createElementWithValue('div', index);
            rowIndex.id = `r${index}-c${0}`;
            rowIndex.setAttribute('class', "sheet--row-index");

            sheetContentRowIndex.appendChild(rowIndex);
        }
        return sheetContentRowIndex;
    }

    buildSheetContentRows(columns) {
        let sheetBaseMatrix = this.createElement('div');
        sheetBaseMatrix.id = "sheet-base-matrix";
        // Add rows to main content [1,2,3,4...]
        for (let index = 1; index <= ROWS_MAX; index++) {
            let rowIndex = `r${index}`;

            let row = this.createElement('div');
            row.id = rowIndex;
            row.setAttribute('class', "row-index");

            // Add columns to the current row
            let rowColumns = columns.cloneNode(true);
            rowColumns.id = `c${rowIndex}`;

            row.appendChild(rowColumns);
            sheetBaseMatrix.appendChild(row);
        }
        return sheetBaseMatrix;
    }

    buildSheetContentColumn() {
        let columns = this.createElement('div');
        columns.setAttribute('class', "row-column");

        for (let index = 1; index <= COL_MAX; index++) {
            let colIndex = this.createElement('div');
            colIndex.id = `c${index}`;
            colIndex.setAttribute('class', "col-inner");

            let input = this.createElement('input');
            input.id = `i${index}`;
            input.setAttribute('class', "sheet--input");

            colIndex.appendChild(input);
            columns.appendChild(colIndex);
        }
        return columns;
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

    logTime(msg) {
        let date = new Date();
        let mm = date.getUTCMinutes();
        let ss = date.getSeconds();
        let ms = date.getMilliseconds();
        console.debug(msg, `${mm}:${ss}-${ms}`);
    }
}

class SheetStore {
    cells = []
  }

app = new ExcellApp("Demo");