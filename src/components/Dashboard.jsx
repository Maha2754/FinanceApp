import React, { useState, useMemo } from "react";
import UnpaidDuesChart from "./UnpaidDuesChart";
import DateRangePicker from "./DateRangePicker";

function Dashboard({ data }) {
  const { unpaid_dues, recent_transactions, results } = data;

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Convert backend date YYYY-MM-DD → DD-MM-YYYY
  function formatToDDMMYYYY(dateStr) {
    const d = new Date(dateStr);
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  }

  // Convert DD-MM-YYYY → Date()
  function parseDate(str) {
    if (!str) return null;
    const [dd, mm, yyyy] = str.split("-");
    return new Date(`${yyyy}-${mm}-${dd}`);
  }

  // FILTER UNPAID DUES
  const filteredUnpaid = useMemo(() => {
    return unpaid_dues.filter((d) => {
      const dueFormatted = formatToDDMMYYYY(d.due_date);
      const due = parseDate(dueFormatted);

      const from = parseDate(fromDate);
      const to = parseDate(toDate);

      return (!from || due >= from) && (!to || due <= to);
    });
  }, [unpaid_dues, fromDate, toDate]);

  // FILTER TRANSACTIONS
  const filteredTrans = useMemo(() => {
    return recent_transactions.filter((t) => {
      const dtFormatted = formatToDDMMYYYY(t.date);
      const dt = parseDate(dtFormatted);

      const from = parseDate(fromDate);
      const to = parseDate(toDate);

      return (!from || dt >= from) && (!to || dt <= to);
    });
  }, [recent_transactions, fromDate, toDate]);

  // BOX STYLE
  const boxStyle = {
    border: "1px solid #ddd",
    padding: "15px",
    borderRadius: "10px",
    background: "white",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Dashboard</h2>

      {/* DATE RANGE PICKER */}
      <div style={{ marginTop: "15px" }}>
        <DateRangePicker
          fromDate={fromDate}
          toDate={toDate}
          setFromDate={setFromDate}
          setToDate={setToDate}
        />
      </div>

      {/* GRID */}
      <div
        style={{
          marginTop: "25px",
          display: "flex",
          flexDirection: "column",
          gap: "25px",
        }}
      >
        {/* UNPAID DUES BOX */}
        <div style={boxStyle}>
          <h3>Unpaid Dues</h3>
          <table width="100%" border="1" cellPadding="8">
            <thead>
              <tr>
                <th>Name</th>
                <th>Amount</th>
                <th>Due Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredUnpaid.map((d, i) => (
                <tr key={i}>
                  <td>{d.client.name}</td>
                  <td>{d.due_amount}</td>
                  <td>{formatToDDMMYYYY(d.due_date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* RECENT TRANSACTIONS BOX */}
        <div style={boxStyle}>
          <h3>Recent Transactions</h3>
          <table width="100%" border="1" cellPadding="8">
            <thead>
              <tr>
                <th>Name</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredTrans.map((t, i) => (
                <tr key={i}>
                  <td>{t.name}</td>
                  <td>{t.amount}</td>
                  <td>{formatToDDMMYYYY(t.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* RESULTS BOX */}
        <div style={boxStyle}>
          <h3>Results</h3>
          <table width="100%" border="1" cellPadding="8">
            <thead>
              <tr>
                <th>Name</th>
                <th>Amount</th>
                <th>Dues</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, i) => (
                <tr key={i}>
                  <td>{r.name}</td>
                  <td>{r.amount}</td>
                  <td>{r.dues_unpaid}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CHART BOX */}
        <div style={boxStyle}>
          <h3>Unpaid Dues Chart</h3>
          <UnpaidDuesChart unpaid_dues={filteredUnpaid} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
