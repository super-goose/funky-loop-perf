export default {
    clockThese: _clockThese
};

function _clockThese(_thisManyTimes, things) {
    return things.map(todo => _clockThis(_thisManyTimes, todo));
}

function _clockThis(_thisManyTimes, todo) {
    let s = Date.now();
    for (let i = 0; i < _thisManyTimes; i++) {
        todo();
    }
    return `${_thisManyTimes} iterations in ${Date.now() - s} ms`;
}