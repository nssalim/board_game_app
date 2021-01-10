import Square from './square-model';

class GridClass {
    constructor(rows, columns) {
        this.columns = columns;
        this.rows = rows;
        this.gridState = null;
    }


    initialiseState() {
        const grid = this.rows.map(row => {
            return this.columns.map(column => {
                // decide if that square (i.e., combination column, row) has a piece
                if (this._hasPiece({ column, row })) {
                    return new Square({ column, row }, true);
                } else {
                    return new Square({ column, row }, false);
                }
            });
        });
        this.gridState = grid;
        this.setLegalMoves();
    }

    _hasPiece(location) {
        if ((location.column % 2 !== 0) && (location.row % 2 === 0) && (location.row < 3 || location.row > 4)) {
            return true;
        }
        if ((location.column % 2 === 0) && (location.row % 2 !== 0) && (location.row < 3 || location.row > 4)) {
            return true;
        }
        return false;
    }

    setLegalMoves() {
        for (const row of this.gridState) {
            for (const square of row) {
                if (square.piece) {
                    square.setPieceLegalMoves(this.gridState);
                }
            }
        }
    }
};



export default GridClass;