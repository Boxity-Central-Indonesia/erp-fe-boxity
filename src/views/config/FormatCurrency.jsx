export const currencyToNumber = (currencyString) => {
    // Menghapus karakter non-numeric dari string (seperti koma dan simbol mata uang)
    const numericString = currencyString.replace(/[^0-9-]+/g, '');

    // Mengonversi string menjadi integer atau float
    return numericString;
};


export const numberToCurrency = (value) => {
    const formattedValue = parseFloat(value).toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR'
    }).replace(/\,00$/, '');

    return formattedValue;
}


export const FormatCurrency = ({ value }) => {
    let num
    if(typeof value === 'string'){
        // Ubah nilai string (Rp 500.000.000 -> 5000000000)
        num = currencyToNumber(value);
    }
    
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


export const stringToDecimal = ({ value }) => {
    // Mengecek apakah value adalah string
    if (typeof value !== 'string') {
        throw new Error('Input harus berupa string');
    }

    // Membuang karakter non-angka
    const numericString = value.replace(/\D/g, '');

    // Mengubah string menjadi bilangan desimal
    const floatValue = parseFloat(numericString);

    // // Membulatkan ke bilangan bulat terdekat
    // const intValue = Math.round(floatValue);

    // Mengubah bilangan bulat menjadi format desimal dengan pemisah ribuan dan desimal
    // let decimalString = floatValue.toLocaleString('id-ID');

    // Menghilangkan .00 di mana pun dalam string
    let decimalString = value.replace(/.00/, '');

    // // Menambahkan koma setelah kelompok angka desimal
    // decimalString = decimalString.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');

    // Mengganti titik dengan koma
    // decimalString = decimalString.replace(/\./g, ',');

    return decimalString;
};

  
  