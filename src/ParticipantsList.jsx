import React, { useEffect, useState } from "react";

const ParticipantsList = () => {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await fetch("https://invitationapi.ut-cphb.dk/api/v1/invitations");
        if (!response.ok) {
          throw new Error("Failed to fetch participants");
        }
        const data = await response.json();
        setParticipants(data);
      } catch (error) {
        console.error("Error fetching participants:", error);
      }
    };

    fetchParticipants();
  }, []);

  const totalGuests = participants.reduce((sum, participant) => sum + participant.people, 0);

  return (
    <div
      style={{
        padding: "20px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2>Deltagerliste</h2>
        <div
          style={{
            border: "1px solid #ccc",
            padding: "10px 20px",
            borderRadius: "5px",
            backgroundColor: "#f9f9f9",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <p style={{ margin: 0, fontWeight: "bold" }}>Totale Gæster:</p>
          <p style={{ margin: 0, fontSize: "18px" }}>{totalGuests}</p>
        </div>
      </div>

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
    <th style={{ border: "1px solid #ccc", padding: "10px" }}>Telefonnummer</th>
    <th style={{ border: "1px solid #ccc", padding: "10px" }}>Antal Personer</th>
    <th style={{ border: "1px solid #ccc", padding: "10px" }}>Tilmeldt</th>
  </tr>
</thead>
<tbody>
  {participants.map((participant) => (
    <tr key={participant.id}>
      <td style={{ border: "1px solid #ccc", padding: "10px" }}>{participant.name}</td>
      <td style={{ border: "1px solid #ccc", padding: "10px" }}>{participant.phoneNumber}</td>
      <td style={{ border: "1px solid #ccc", padding: "10px" }}>{participant.people}</td>
      <td style={{ border: "1px solid #ccc", padding: "10px" }}>
        {new Date(participant.createdAt).toLocaleString("da-DK")}
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
