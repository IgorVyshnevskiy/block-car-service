function TotalPriceTag({ details }) {
  const sumSession = details.details.reduce(
    (total, detail) => total + detail.combinePrice,
    0
  );
  const formattedSum = sumSession.toFixed(2);

  return <div>Загальна сума: {formattedSum} грн.</div>;
}

export default TotalPriceTag;
