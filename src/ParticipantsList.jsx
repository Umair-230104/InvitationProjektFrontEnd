import React from "react";

const ParticipantsList = () => {
  const participants = JSON.parse(localStorage.getItem("participants")) || [];

  return (
    <div
      style={{
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h2>Deltagerliste</h2>
      {participants.length === 0 ? (
        <p>Ingen deltagere endnu.</p>
      ) : (
        <table
          style={{
            margin: "0 auto",
            borderCollapse: "collapse",
            width: "80%",
            maxWidth: "600px",
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid #ccc", padding: "10px" }}>Navn</th>
              <th style={{ border: "1px solid #ccc", padding: "10px" }}>
                Telefonnummer
              </th>
              <th style={{ border: "1px solid #ccc", padding: "10px" }}>Antal</th>
              <th style={{ border: "1px solid #ccc", padding: "10px" }}>
                Tilmeldingstidspunkt
              </th>
            </tr>
          </thead>
          <tbody>
            {participants.map((participant, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid #ccc", padding: "10px" }}>
                  {participant.name}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "10px" }}>
                  {participant.phone}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "10px" }}>
                  {participant.numPersons}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "10px" }}>
                  {participant.timestamp}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ParticipantsList;
