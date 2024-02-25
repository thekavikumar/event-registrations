import React from "react";

import Select from "react-select";
import { eventOptions } from "./data";

export default ({ setSelectedOption }) => {
  return (
    <Select
      className="basic-single w-full"
      classNamePrefix="select"
      name="Events"
      options={eventOptions}
      placeholder="Select an event..."
      onChange={setSelectedOption}
    />
  );
};
