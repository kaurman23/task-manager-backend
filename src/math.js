const computeTip = (total,percentTip) => {
    const tip = total*percentTip;
    return tip+total;
}

module.exports = {
    computeTip
}