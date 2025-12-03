// DateRangePicker.jsx
import React from "react";

function DateRangePicker({ fromDate, toDate, setFromDate, setToDate }) {
  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <div>
        <label>From Date</label><br />
        <input
          type="text"       // IMPORTANT
          placeholder="DD-MM-YYYY"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          style={{ padding: "6px", width: "150px" }}
        />
      </div>

      <div>
        <label>To Date</label><br />
        <input
          type="text"       // IMPORTANT
          placeholder="DD-MM-YYYY"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          style={{ padding: "6px", width: "150px" }}
        />
      </div>
    </div>
  );
}

export default DateRangePicker;
