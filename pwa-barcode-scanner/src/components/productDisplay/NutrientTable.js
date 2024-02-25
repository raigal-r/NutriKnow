import React from 'react';

// Assuming `product` prop contains the nutriments object directly
const NutrientTable = ({ product }) => {
  // Extracting nutriments from the product prop
  console.log("Product:", product);
  const { nutriments } = product;

  // Function to render rows of the table
  const renderNutrientRows = () => {
    console.log("Nutriments producs",Object.keys(nutriments));

    return Object.keys(nutriments).map((key) => {
      // Splitting the key to capitalize and make more readable
      const readableKey = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      return (
        <tr key={key}>
          <td>{readableKey}</td>
          <td>{nutriments[key]}</td>
        </tr>
      );
    });
  };

  return (
    <section className="productDisplay__section">
      <h3 className="productDisplay__sectionTitle">Nutrition Facts</h3>
      <table className="productDisplay__table">
        <thead>
          <tr>
            <th>Nutrient</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {nutriments ? renderNutrientRows() : <tr><td colSpan="2">Nutrition data unavailable</td></tr>}
        </tbody>
      </table> 
    </section>
  );
};

export default NutrientTable
