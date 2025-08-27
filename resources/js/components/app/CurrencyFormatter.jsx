export default function CurrencyFormatter({ amount, currency = 'MAD', locale = 'en-US' }) {
    return <>{new Intl.NumberFormat(locale, { style: 'currency', currency }).format(parseFloat(amount))}</>;
}
