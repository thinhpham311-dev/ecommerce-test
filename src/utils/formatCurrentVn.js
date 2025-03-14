const formatToVND = (value) => {
    value = value.toString().replace(/\./g, "");
    const formatted = new Intl.NumberFormat("it-IT", {
        style: "currency",
        currency: "VND",
    })
        .format(value)
        .replace("₫", "")
        .trim();

    return formatted;
}

export default formatToVND