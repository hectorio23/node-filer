
function hotKeys(recvMesg) {
    if (recvMesg === "clear") console.clear();
    else if (recvMesg === "pwd") console.log(__dirname);
    else  {
        console.log(`Unknown command: ${ recvMesg }`); 
        return '[X]';

    }
    
    
    return '';
}


module.exports = {
    hotKeys,
};