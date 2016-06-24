function* enumerate(iterable) {
    let index = 0;
    for (let iterator of iterable) {
        yield [index++, iterator];
    }
}