const ROWS_MAX = 100;
const COL_MAX = 100;
const timeouts = [];

class SheetDataStore {
    cells = [];
}

class InputValueData {
    constructor(id, value, equation, builtInfunc) {
        this.id = id;
        this.displayValue = value;
        this.equation = equation;
        this.builtInFunction =  builtInfunc
    }

}

class ExcellApp {
    app;
    alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ]
    operators = ['+', '-', '*', '/', '%']
    
    constructor(name) {
        this.sheetName = name;
    }

    init() {
        this.logTime('Start:');
        
        app = document.getElementById('app');

        this.drawAppContent();

        this.hookUpEvents();

        this.logTime('End:  ');
    }

    drawAppContent() {

        let appMain = this.createElement('div');
        appMain.id='app-main'

        this.drawHeader(appMain);

        let mainContent = this.createElement('div');
        mainContent.id='main-content'

        let sheetSectionContent = this.createElement('div');
        sheetSectionContent.id='sheet-section'

        let sheetContent = this.createElement('div');
        sheetContent.setAttribute('class', 'sheet-content');
        sheetContent.id='sheet-content'


        let columns = this.buildSheetContentColumn();
        let sheetBaseMatrix = this.buildSheetContentRows(columns);
        let sheetContentRowIndex = this.buildSheetContentRowIndex();
        let sheetContentColIndex = this.buildSheetContentColIndex();
        
        // The adding position matters here as it has a basic layout
        sheetContent.appendChild(sheetContentRowIndex);
        sheetContent.appendChild(sheetBaseMatrix);
        sheetSectionContent.appendChild(sheetContentColIndex);
        sheetSectionContent.appendChild(sheetContent);
        mainContent.appendChild(sheetSectionContent);        
        appMain.appendChild(mainContent);
        app.appendChild(appMain);
    }

    
    drawHeader(appMain) {
        let mainHeader = this.createElement('section');
        mainHeader.setAttribute('class', 'app-header');
        mainHeader.id='app-header'

        let refreshPageBtn = this.createElementWithValue('button', 'refresh');
        this.setCssClass(refreshPageBtn, 'button-success pure-button');
        refreshPageBtn.id='app-refresh'

        let refreshingContent = this.createElement('div');
        refreshingContent.id = 'loading'
        
        mainHeader.appendChild(refreshPageBtn);
        mainHeader.appendChild(refreshingContent);
        appMain.appendChild(mainHeader);
    }

    buildSheetContentColIndex() {
        let sheetContentColIndex = this.createElement('div');
        this.setCssClass(sheetContentColIndex, 'sheet-content--col-index');
        sheetContentColIndex.id = 'sheet-content-col-index';
        
        let colHeadIndex = this.createElement('div');
        this.setCssClass(colHeadIndex, 'sheet-content--col-head-index');
        colHeadIndex.id = 'sheet-content-col-head-index';
        sheetContentColIndex.appendChild(colHeadIndex);

        // Create Sheet Content head columns [A,B,C...]
        for (let index = 1; index <= COL_MAX; index++) {
            let letter = this.pickAplhabetLetterBasedOn(index);
            let colIndex = this.createElementWithValue('div', letter);
            colIndex.id = `${index}-${letter}`;
            this.setCssClass(colIndex, 'sheet--col-index');
            sheetContentColIndex.appendChild(colIndex);
        }
        return sheetContentColIndex;
    }

    buildSheetContentRowIndex() {
        let sheetContentRowIndex = this.createElement('div');
        sheetContentRowIndex.id = 'sheet-content-row-index';

        // Create Sheet Content head rows [1,2,3...]
        for (let index = 1; index <= ROWS_MAX; index++) {
            let rowIndex = this.createElementWithValue('div', index);
            this.setCssClass(rowIndex, 'sheet--row-index');

            sheetContentRowIndex.appendChild(rowIndex);
        }
        return sheetContentRowIndex;
    }

    buildSheetContentColumn() {
        let columns = this.createElement('div');
        columns.setAttribute('class', 'row-column');

        for (let index = 1; index <= COL_MAX; index++) {
            let input = this.createElement('input');
            let letter = this.pickAplhabetLetterBasedOn(index);
            input.id = letter;
            this.setCssClass(input, 'sheet--input');

            columns.appendChild(input);
        }
        return columns;
    }

    buildSheetContentRows(columns) {
        let sheetBaseMatrix = this.createElement('div');
        sheetBaseMatrix.id = 'sheet-base-matrix';
        
        this.buldSheetRowsAndColumns(columns, sheetBaseMatrix);
        
        return sheetBaseMatrix;
    }

    buldSheetRowsAndColumns(columns, sheetBaseMatrix) {
        for (let index = 1; index <= ROWS_MAX; index++) {
            let rowIndex = index;
            let row = this.createElement('div');
            row.id = rowIndex;
            this.setCssClass(row, 'row-index');

            // Add columns to the current row
            let rowColumns = columns.cloneNode(true);
            row.innerHTML = rowColumns.innerHTML;
            sheetBaseMatrix.appendChild(row);
        }
    }

    hookUpEvents() {
        var inputs = document.getElementsByTagName('input');
        for (let index = 0; index < inputs.length; index++) {
            inputs[index].addEventListener('blur', this.saveDataToStore);
            inputs[index].addEventListener('focus', this.retrieveDataFromToStore);
        }

        document.getElementById('app-refresh').addEventListener('click', this.refreshSheetContent.bind(this))
    }

    removeEvents() {
        var inputs = document.getElementsByTagName('input');
        for (let index = 0; index < inputs.length; index++) {
            inputs[index].removeEventListener('blur', this.saveDataToStore);
            inputs[index].removeEventListener('focus', this.retrieveDataFromToStore);
        }

        for (var i=0; i<timeouts.length; i++) {
            clearTimeout(timeouts[i]);
        }

        document.getElementById('app-refresh').removeEventListener('click', this.refreshSheetContent.bind(this))
    }

    saveDataToStore(e) {
        let id = e.target.id;
        let parentId = e.target.parentElement.id;
        let key = `${id}${parentId}`;

        if(!e.target.value){
            return true;
        }

        let builtInFunc = '';
        let value = e.target.value;
        let equation = e.target.value;
        if(value.startsWith('=')) {
            // This is too simple, requires way more work
            value = eval(value.substring(1, value.length)); //The Evill!!! 
            e.target.value = value ? value : '';
        }

        let inputValue = new InputValueData(key, value, equation, builtInFunc);

        store.cells[key] = inputValue;
        console.log(key, value);
        console.log(key, e.target.value);
    }

    retrieveDataFromToStore(e) {
        let id = e.target.id;
        let parentId = e.target.parentElement.id;
        let key = `${id}${parentId}`;

        let inputData = store.cells[key];
        if(!inputData) {
            return true;
        }

        if(inputData.equation) {
            e.target.value = inputData.equation;
            return true;
        }

        e.target.value = inputData.displayValue ? inputData.displayValue : '';
    }

    refreshSheetContent() {
        // Remove event listeners and timeouts before clean the grid
        this.removeEvents();

        let loading = document.getElementById('loading');
        this.setCssClass(loading,  'loading');
        
        // Had to put a timer here as we wouldn't see the loading icon Effect
        timeouts.push(setTimeout(function(){ loading.removeAttribute('class') }, 300));

        let sheetBaseMatrix = document.getElementById('sheet-base-matrix');
        sheetBaseMatrix.innerHTML = '<pre class="p-1"> loading...</pre>';

        let tmp = this.createElement('div');
        this.buldSheetRowsAndColumns(this.buildSheetContentColumn(), tmp);        

        // Had to put a timer here as we wouldn't see the Refresh Effect
        timeouts.push(setTimeout(function() { 
            sheetBaseMatrix.innerHTML = tmp.innerHTML; 
            this.rePopulateUserDataFromStore();    
            this.hookUpEvents();
        }.bind(this), 100));

    }

    rePopulateUserDataFromStore() {
        for (let key in store.cells) {
            const item = store.cells[key];
            const letterReg = /[A-Z]/g;
            const numbersReg = /[0-9]/g;

            const columnIndex = key.match(letterReg).join();
            const rowIndex = key.match(numbersReg).join();

            let parent = document.getElementById(rowIndex);
            parent.children[columnIndex].value = item.displayValue;
        };
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

    setCssClass(el, cssClass) {
        el.setAttribute('class', cssClass);
    }

    pickAplhabetLetterBasedOn(index) {
        if(index < 26){
            return this.alphabet[index-1];
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

/**
 * Setting up Application and Store
 */
store = new SheetDataStore();
app = new ExcellApp('Demo');