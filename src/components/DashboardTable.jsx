import React from "react";

function DashboardTable({ title, data, onRowClick }) {
  return (
    <div className="mb-6">
      <h3 className="text-lg-semibold">{title}</h3>
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Client Name</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map(c => (
              <tr key={c.id} onClick={() => onRowClick(c)}>
                <td>{c.name}</td>
                <td>₹{c.amount}</td>
                <td>
                  <span className={c.status === "Paid" ? "status-paid" : "status-unpaid"}>
                    {c.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DashboardTable;
