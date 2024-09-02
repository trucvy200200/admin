import { multiplyByNumber } from "@src/utility/UserUtils"

const currencyFormat = (value) => {
    if (value !== undefined && value !== null) {
        const newValue = Math.floor(multiplyByNumber(value, 10000)) / 10000
        return new Intl.NumberFormat('en-US', { maximumFractionDigits: 4 }).format(newValue)
    } else return 0
}
export default currencyFormat

export const changeToVND = (x) => {
    return x?.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})
}
export const changeToUSD = (x) => {
    return x?.toLocaleString('en-US', {style: 'currency', currency: 'USD'})
}

export const currencyFormatUSD = (x) => {
    return x?.toLocaleString('en-US', {maximumFractionDigits: 2, minimumFractionDigits: 2})
}

export const changeDateVN = (value) => {
    return new Date(value).toLocaleDateString('vi-VN')
}

export const changeDateUS = (value) => {
    return new Date(value).toLocaleDateString('en-US')
}