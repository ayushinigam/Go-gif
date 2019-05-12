import {formatData} from './common.utils';
import { exportAllDeclaration } from '@babel/types';

describe('formatData', () => {
    it('should return an array of fomatted data', () => {
        const inputData = [
            {
                images: {
                    fixed_width: {url: 'test1'},
                    fixed_width_still: {url: 'test1/still'}
                }
            },
            {
                images: {
                    fixed_width: {url: 'test2'},
                    fixed_width_still: {url: 'test2/still'}
                }
            }
        ];
        const expectedOutput = [{"moving": {"url": "test1"}, "still": {"url": "test1/still"}}, {"moving": {"url": "test2"}, "still": {"url": "test2/still"}}];
        expect(formatData(inputData)).toEqual(expectedOutput);
    })
})