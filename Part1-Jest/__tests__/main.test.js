const formatVolumeIconPath = require('../assets/scripts/main.js');
 
describe('volume level', () => {
    test('is greater than 66', ()=> {
        for(let i = 67; i <= 100; ++i){
            expect(formatVolumeIconPath(i)).toContain(3);
        }
    });
 
    test('is between 34 and 66', () => {
        for(let i = 34; i <= 66; ++i){
            expect(formatVolumeIconPath(i)).toContain(2);
        }
    });
 
    test('is between 1 and 33', () => {
        for(let i = 1; i <= 33; ++i){
            expect(formatVolumeIconPath(i)).toContain(1);
        }
    });
 
    test('is 0', () => {
        expect(formatVolumeIconPath(0)).toContain(0);
    });
});
