import React, { useState } from "react";
import { IndexPath, Select, SelectItem } from "@ui-kitten/components";

const QuantityWithUnit = ({ value, onChange }) => {
  const [selectedUnit, setSelectedUnit] = useState(value); // Default unit

  const units = ["piece", "kg", "g", "meter", "cm", "inch"]; // Define available units

  const onSelectUnit = (index) => {
    const unit = units[index.row];
    setSelectedUnit(unit);
    onChange && onChange(unit); // Pass the selected unit back to the parent
  };

  return (
    <Select
      value={selectedUnit}
      selectedIndex={new IndexPath(units.indexOf(selectedUnit))} // Use IndexPath
      onSelect={onSelectUnit}
    >
      {units.map((unit) => (
        <SelectItem title={unit} key={unit} />
      ))}
    </Select>
  );
};

export default QuantityWithUnit;
