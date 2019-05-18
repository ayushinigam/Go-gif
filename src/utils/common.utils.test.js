import { formatGiphyData, getNoOfColumns, findIndexOfLowestHeightColumn } from './common.utils';
import { MIN_WIDTH_DESKTOP, MAX_WIDTH_DESKTOP } from '../constants';

describe('getNoOfColumns', () => {
  it('should return 2 when device smaller than desktop', () => {
    global.innerWidth = MIN_WIDTH_DESKTOP - 100;
    expect(getNoOfColumns()).toEqual(2);
  });
  it('should return 4 when device is desktop', () => {
    global.innerWidth = MIN_WIDTH_DESKTOP;
    expect(getNoOfColumns()).toEqual(4);
  });
  it('should return 6 when device is large desktop', () => {
    global.innerWidth = MAX_WIDTH_DESKTOP + 100;
    expect(getNoOfColumns()).toEqual(6);
  });
});

describe('findIndexOfLowestHeightColumn', () => {
  it('should return the index of the column with minimum height', () => {
    const heightArray = [300, 202, 901, 878];
    expect(findIndexOfLowestHeightColumn(heightArray)).toEqual(1);
  });
  it('should return the index of the first column when all the columns are of same height', () => {
    const heightArray = [10, 10, 10, 10];
    expect(findIndexOfLowestHeightColumn(heightArray)).toEqual(0);
  });
});

describe('formatGiphyData', () => {
  const intialGridData = [{ data: [], totalHeight: 0 }, { data: [], totalHeight: 0 }];
  it('should return an array of fomatted data', () => {
    const dataFromApi = [
      {
        images: {
          fixed_width: {
            url: 'test1', height: 10, key: 1, title: '',
          },
          fixed_width_still: {
            url: 'test1/still', height: 10, key: 2, title: '',
          },
        },
      },
      {
        images: {
          fixed_width: {
            url: 'test2', height: 10, key: 3, title: '',
          },
          fixed_width_still: {
            url: 'test2/still', height: 10, key: 4, title: '',
          },
        },
      },
    ];
    const expectedOutput = [
      {
        data: [{
          key: undefined,
          moving: {
            height: 10, key: 1, title: '', url: 'test1',
          },
          still: {
            height: 10, key: 2, title: '', url: 'test1/still',
          },
          title: undefined,
        }],
        totalHeight: 10,
      },
      {
        data: [{
          key: undefined,
          moving: {
            height: 10, key: 3, title: '', url: 'test2',
          },
          still: {
            height: 10, key: 4, title: '', url: 'test2/still',
          },
          title: undefined,
        }],
        totalHeight: 10,
      },
    ];
    expect(formatGiphyData(dataFromApi, intialGridData)).toEqual(expectedOutput);
  });
  it('should return not fail if data from api is empty', () => {
    expect(formatGiphyData(undefined, intialGridData)).toEqual(intialGridData);
  });
});
