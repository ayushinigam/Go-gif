import {MIN_WIDTH_DESKTOP, MAX_WIDTH_DESKTOP, SCROLL_OFFSET, APP_MARGIN_HORIZONTAL} from '../constants';
/**
 * getNoOfColumns: returns the no of columns based on the screen viewport width
 */
export const getNoOfColumns = () => {
    const currentScreenWidth = window.innerWidth;    
    let noOfColumns = 2; // Minimum no of columns
    if(currentScreenWidth > MAX_WIDTH_DESKTOP) {        
        noOfColumns = 6;
    }    
    else if(currentScreenWidth >= MIN_WIDTH_DESKTOP) {
        noOfColumns = 4;
    }  
    return noOfColumns;
}

/**
 * initialiseDataArray: returns an array with filled initial value
 * to store data and total height of each column
 */
export const initialiseDataArray = () => {
    const noOfColumns = getNoOfColumns();
    const arr = new Array(noOfColumns).fill(null);
    return arr.map(() => ( {data: [], totalHeight: 0})); 
}

/**
 * findIndexOfLowestHeightColumn: returns the index of the column with the lowest height
 */
export const findIndexOfLowestHeightColumn = (heightArray) => heightArray.indexOf(Math.min(...heightArray));

/**
 * formatData: returns formatted data from the api according to column structure 
 * defined in 'initialiseDataArray'
 */
export const formatGiphyData = (dataFromGiphyAPI = [], gridData) => {
    dataFromGiphyAPI.forEach( gifData => {
        const columnHeightArray = gridData.map(g => g.totalHeight);
        const currentColumnIndex = findIndexOfLowestHeightColumn(columnHeightArray);
        gridData[currentColumnIndex].data.push({
            moving: gifData.images.fixed_width,
            still: gifData.images.fixed_width_still,
            key: gifData.id,
            title: gifData.title
        });
        gridData[currentColumnIndex].totalHeight += Number(gifData.images.fixed_width.height);
    });
  return gridData;
}

export const isScrollBottom = () => (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - SCROLL_OFFSET);
export const getCellWidth = (gridLength) => ((window.innerWidth-(2*APP_MARGIN_HORIZONTAL)) / gridLength);