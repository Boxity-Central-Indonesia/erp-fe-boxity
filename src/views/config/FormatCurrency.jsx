export const currencyToNumber = (currencyString) => {
    // Menghapus karakter non-numeric dari string (seperti koma dan simbol mata uang)
    const numericString = currencyString.replace(/[^0-9-]+/g, '');

    // Mengonversi string menjadi integer atau float
    return parseFloat(numericString);
};


export const numberToCurrency = (value) => {
    const formattedValue = parseFloat(value).toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR'
    }).replace(/\,00$/, '');

    return formattedValue;
}


export const FormatCurrency = ({ value }) => {
    // Ubah nilai string (Rp 500.000.000 -> 5000000000)
    const num = currencyToNumber(value);
    
    // Mengonversi nilai menjadi format mata uang tanpa desimal
    const formattedValue = parseFloat(num || 0).toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR'
    }).replace(/\,00$/, '');

    return formattedValue;
}


export const numberToDecimal = ({value}) => {
    const formattedValue = parseFloat(value).toLocaleString('id-ID', {
        maximumFractionDigits: 2
    });

    return formattedValue
}
