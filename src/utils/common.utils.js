import {
  MIN_WIDTH_DESKTOP, MAX_WIDTH_DESKTOP, SCROLL_OFFSET, APP_MARGIN_HORIZONTAL,
} from '../constants';
/**
 * getNoOfColumns: returns the no of columns based on the screen viewport width
 */
export const getNoOfColumns = () => {
  const currentScreenWidth = window.innerWidth;
  let noOfColumns = 2; // Minimum no of columns
  if (currentScreenWidth > MAX_WIDTH_DESKTOP) {
    noOfColumns = 6;
  } else if (currentScreenWidth >= MIN_WIDTH_DESKTOP) {
    noOfColumns = 4;
  }
  return noOfColumns;
};

/**
 * initialiseDataArray: returns an array with filled initial value
 * to store data and total height of each column
 */
export const initialiseDataArray = () => {
  const noOfColumns = getNoOfColumns();
  const arr = new Array(noOfColumns).fill(null);
  return arr.map(() => ({ data: [], totalHeight: 0 }));
};

/**
 * findIndexOfLowestHeightColumn: returns the index of the column with the lowest height
 */
export const findIndexOfLowestHeightColumn = heightArray => heightArray.indexOf(Math.min(...heightArray));

/**
 * formatData: returns formatted data from the api according to column structure
 * defined in 'initialiseDataArray'
 */
export const formatGiphyData = (dataFromGiphyAPI = [], initialGridData) => {
  const gridData = initialGridData;
  dataFromGiphyAPI.forEach((gifData) => {
    const columnHeightArray = gridData.map(g => g.totalHeight);
    const currentColumnIndex = findIndexOfLowestHeightColumn(columnHeightArray);
    gridData[currentColumnIndex].data.push({
      moving: gifData.images.fixed_width,
      still: gifData.images.fixed_width_still,
      key: gifData.id,
      title: gifData.title,
    });
    const currentColumHeight = gridData[currentColumnIndex].totalHeight;
    gridData[currentColumnIndex].totalHeight = currentColumHeight + Number(gifData.images.fixed_width.height);
  });
  return gridData;
};

export const isScrollBottom = () => {
  const height = document.body.offsetHeight;
  return (window.innerHeight + window.scrollY) >= (height - SCROLL_OFFSET);
};
export const getCellWidth = gridLength => {
    const appMargin = gridLength > 2 ? (2 * APP_MARGIN_HORIZONTAL) : 0;
    return ((window.innerWidth - appMargin) / gridLength)
};
