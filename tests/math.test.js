const { computeTip } = require('../src/math')

test('Calculate Tip', () => {
    const amount = computeTip(10,.3);
    expect(amount).toBe(13);
})

test('Async', (done) => {
    setTimeout(() => {
        expect(2).toBe(2)
        done()
    })
})