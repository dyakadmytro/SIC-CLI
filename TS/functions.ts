function rangeRandInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}
function sliceIntoChunks(arr, chunkSize) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res;
}

function dotStringToNestedObj(data: string): object {
    const spltd = data.split('.')
    const reqNesting = (value) => {
        if (typeof value !== 'object') throw new Error('Unexceptable data type')

        if (value.length == 1) {
            return value[0]
        }

        const res = {}
        const k = value.shift()
        res[k] = reqNesting(value)
        return res
    }
    return reqNesting(spltd)
}

function nestedObjToDotString(data: object): string {
    const reqNesting = (value) => {
        if (typeof value == 'string') return value
        if (typeof value !== 'object') throw new Error('Unexceptable data type')

        const k = Object.keys(value)[0]
        const v = value[k]
        delete value[k]
        return k + '.' + reqNesting(v)
    }
    return reqNesting(data)
}

export {rangeRandInt, sliceIntoChunks, dotStringToNestedObj, nestedObjToDotString}