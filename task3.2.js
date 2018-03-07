
let words = {};

function processLine(s) {
    s.split(' ').forEach(function(word) {
                         words[word] = words[word] != undefined ? words[word] + 1 : 1;
    });
}

function find_result() {
    let most_freq_word = Object.keys(words)[0];
    let multiple_words = false;
    for (w in words) {
        if (words[w] > words[most_freq_word]) {
            most_freq_word = w;
            multiple_words = false;
        }
        if (words[w] == words[most_freq_word] && w != most_freq_word) {
            multiple_words = true;
        }
    }
    if (multiple_words == false) {
        console.log(most_freq_word);
    } else {
        console.log('---');
    }
}

let rl = require("readline");
let inter = rl.createInterface(process.stdin, process.stdout);
inter.on('line', function (line) {
         if (line.length == 0) {
            inter.close();
            find_result();
         } else {
            processLine(line);
         }
      });
