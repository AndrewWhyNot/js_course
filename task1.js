
function binToDecimal(binNum) {
    if (typeof(binNum) != 'string')
        return undefined;
    for (let i = 0; i < binNum.length; i++) {
        if (binNum[i] != '1' && binNum[i] != '0')
            return undefined;
    }
    
    if (binNum[0] == '1') {
        // -1
        let ind = binNum.length - 1;
        while (binNum[ind] != '1' && ind >= 1) {
            binNum = binNum.slice(0, ind) + '1' + binNum.slice(ind+1);
            ind--;
        }
        if (ind >= 1) {
            binNum = binNum.slice(0, ind) + '0' + binNum.slice(ind+1);
        }
        // invert
        for (let i = 1; i < binNum.length; i++) {
            binNum = binNum.slice(0, i) + String((Number(binNum[i])+1) % 2) + binNum.slice(i+1)
        }
    }
    
    let sign = Number(binNum[0]) == 0 ? 1 : -1;
    
    binNum = binNum.substring(1);
    while (binNum.indexOf('0') == 0) {
        binNum = binNum.substring(1);
    }
        
    let num = 0;
    let pow = 1;
    for (let i = 0; i < binNum.length; i++) {
        num += Number(binNum[binNum.length-1 - i])*pow;
        if (num >= Number.MAX_SAFE_INTEGER)
            return undefined;
        pow *= 2;
    }
    
    num *= sign;
    
    return num;
}

if (process.argv.length != 3) {
    console.log('No binary number passed!');
} else {
    console.log(binToDecimal(process.argv[2]));
}


