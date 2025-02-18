export function equalArrays(actual, expected) {
    assert.equal(actual.length, expected.length, "{expected length: " + expected.length + ", actual length: " + actual.length);

    for (let i = 0; i < expected.length; i++) {
        assert.equal(actual[i].value, expected[i].value,
            "{expected: " + expected[i].value + ", actual: " + actual[i].value + ", at index: " + i + "}");
    }
}