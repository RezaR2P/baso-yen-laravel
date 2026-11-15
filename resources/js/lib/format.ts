export function formatPrice(price: string | null): string {
    if (price === null) {
        return "Hubungi kami";
    }

    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(Number(price));
}

export function formatDate(value: string | null): string {
    if (!value) {
        return "";
    }

    return new Date(value).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}
