import React, { useState, useMemo } from "react";
import DashboardTable from "./DashboardTable";
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
          <DashboardTable
            title="Unpaid Dues"
            data={filteredUnpaid.map((d) => ({
              id: d.client.id,
              name: d.client.name,
              amount: d.due_amount,
              status: "Unpaid",
            }))}
            onRowClick={(row) => alert("Clicked Unpaid: " + row.name)}
          />
        </div>

        {/* RECENT TRANSACTIONS BOX */}
        <div style={boxStyle}>
          <DashboardTable
            title="Recent Transactions"
            data={filteredTrans.map((t, index) => ({
              id: index,
              name: t.name,
              amount: t.amount,
              status: "Paid",
            }))}
            onRowClick={(row) => alert("Transaction: " + row.name)}
          />
        </div>

        {/* RESULTS BOX */}
        <div style={boxStyle}>
          <DashboardTable
            title="Results"
            data={results.map((r, index) => ({
              id: index,
              name: r.name,
              amount: r.amount,
              status: r.dues_unpaid > 0 ? "Unpaid" : "Paid",
            }))}
            onRowClick={(row) => alert("Result: " + row.name)}
          />
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
