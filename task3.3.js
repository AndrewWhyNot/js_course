
let ind = 0;
let br = {'(' : ')', '{' : '}', '[' : ']'};

function check_brackets(s) {
    let close_br = br[s[ind]];
    if (!close_br) // if current symbol is not a bracket or is a closing one
        return false;
    ind++;
    while (s[ind] != close_br) {
        let res = check_brackets(s);
        if (res == false)
            return false;
    }
    ind++;
    
    return true;
}

if (process.argv.length != 3) {
    console.log('No string passed!');
    return;
}
if (typeof(process.argv[2]) != 'string') {
    console.log('Not a string passed!');
    return;
}

console.log(check_brackets(process.argv[2]));
