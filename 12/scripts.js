const secret="guesswhat";
let arr = [];

function handleKeyPress(e) {
    arr.push(e.key)
    console.log(arr);
    if (arr.join('').includes(secret)) {
        cornify_add();
        arr = [];
    }
}

document.body.addEventListener('keyup', handleKeyPress);