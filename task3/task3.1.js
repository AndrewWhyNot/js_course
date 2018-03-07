
function multiply_string(s, n) {
    let result = '';
    for (let i = 0; i < n; i++) {
        result += s;
    }
    return result;
}

function find_K(s) {
    if (typeof(s) != 'string') {
        console.log('Not a string passed!');
        return;
    }
    if (s.length == 0) {
        console.log('String is empty!');
        return;
    }
    
    let part = s[0];
    while (part.length <= s.length / 2) {
        if (s.length % part.length == 0) {
            if (multiply_string(part, s.length / part.length) == s) {
                console.log('K = ' + String(s.length / part.length));
                return;
            }
        }
        part += s[part.length];
    }
    
    
    
    console.log('K = ' + String(1));
}

if (process.argv.length != 3)
    console.log('No string passed!');
else
    find_K(process.argv[2]);
