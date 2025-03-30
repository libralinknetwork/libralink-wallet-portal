export const currencyToUsd = (amount: number | undefined, rate: number) => {
  if (!!amount) {
    return Math.round(rate * amount * 100) / 100;
  }

  return 0;
};

export const formatCurrency = (value: number, sign?: boolean) => {
  if (!value) {
    return 0;
  }

  if (value > 0 && !!sign) {
    return `+${Number(value.toFixed(8))}`;
  } else {
    return Number(value.toFixed(8));
  }
};
