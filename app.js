const ROWS_MAX = 100;
const COL_MAX = 100;

class ExcellApp {
    app;
    alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" ]
    
    constructor(name) {
        this.sheetName = name;
    }

    init() {
        console.debug("App stated...");
        this.logTime('Start:');
        
        app = document.getElementById("app");
        this.drawAppContent();

        this.hookUpInputEvent(); 

        this.logTime('End:  ');
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
            let letter = this.pickAplhabetLetterBasedOn(index);
            let colIndex = this.createElementWithValue('div', letter);
            colIndex.id = `${index}-${letter}`;
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

    buildSheetContentColumn() {
        let columns = this.createElement('div');
        columns.setAttribute('class', "row-column");

        for (let index = 1; index <= COL_MAX; index++) {
            // let colIndex = this.createElement('div');
            // colIndex.id = `c${index}`;
            // colIndex.setAttribute('class', "col-inner");
            // colIndex.appendChild(input);

            let input = this.createElement('input');
            input.id = `i${index}`;
            input.setAttribute('class', "sheet--input");

            columns.appendChild(input);
        }
        return columns;
    }

    buildSheetContentRows(columns) {
        let sheetBaseMatrix = this.createElement('div');
        sheetBaseMatrix.id = "sheet-base-matrix";
        
        for (let index = 1; index <= ROWS_MAX; index++) {
            let rowIndex = `r${index}`;
            let row = this.createElement('div');
            row.id = rowIndex;
            row.setAttribute('class', "row-index");

            // Add columns to the current row
            let rowColumns = columns.cloneNode(true);
            rowColumns.id = `c${rowIndex}`;

            row.innerHTML = rowColumns.innerHTML;
            sheetBaseMatrix.appendChild(row);
        }
        return sheetBaseMatrix;
    }

    saveDataToStore(e) {
        let id = e.target.id;
        let parentId = e.target.parentElement.id;
        let key = `${parentId}-${id}`;

        store.cells[key] = e.target.value;
        console.log(key, e.target.value);
    }

    hookUpInputEvent() {
        var inputs = document.getElementsByTagName('input');
        for (let index = 0; index < inputs.length; index++) {
            inputs[index].addEventListener('input', this.saveDataToStore);
        }
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

    pickAplhabetLetterBasedOn(index) {
        if(index < 26){
            return this.alphabet[index];
        }
        
        let n =  Math.floor( index / this.alphabet.length );
        let nextLetterIndex = Math.ceil(index - (this.alphabet.length * n));
        
        let nextLetter = this.alphabet[nextLetterIndex];
        let firstLetter = this.alphabet[n-1]; //Not calculating it yet

        return `${firstLetter}${nextLetter}`;
    }

    logTime(msg) {
        let date = new Date();
        let mm = date.getUTCMinutes();
        let ss = date.getSeconds();
        let ms = date.getMilliseconds();
        console.debug(msg, `${mm}:${ss}-${ms}`);
    }
}

class SheetDataStore {
    cells = []
  }
  
store = new SheetDataStore();
app = new ExcellApp("Demo");