import React, { useState } from "react";
import { motion } from "framer-motion";

const EnvelopeAnimation = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [numPersons, setNumPersons] = useState("");

  const handleEnvelopeClick = () => {
    setIsOpened(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Format the date to match `java.time.LocalDateTime` (yyyy-MM-dd HH:mm:ss)
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
      now.getDate()
    ).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(
      2,
      "0"
    )}:${String(now.getSeconds()).padStart(2, "0")}`;

    const newParticipant = {
      name,
      phoneNumber: phone,
      people: parseInt(numPersons, 10),
      createdAt: formattedDate, // Correctly formatted timestamp
    };

    console.log("Payload:", newParticipant);

    try {
      const response = await fetch("https://invitationapi.ut-cphb.dk/api/v1/invitations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newParticipant),
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        console.error("Response error details:", errorDetails);
        throw new Error("Failed to submit the form");
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f8f8f8",
        padding: "20px",
        textAlign: "center",
      }}
    >
      {!isOpened && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            marginBottom: "20px",
            fontSize: "18px",
            fontWeight: "bold",
            color: "#555",
            lineHeight: "1.4",
          }}
        >
          Tryk på brevet
        </motion.p>
      )}
      {!isOpened ? (
        <motion.img
          src="envelope.png"
          alt="Envelope"
          style={{
            width: "90%",
            maxWidth: "300px",
            cursor: "pointer",
          }}
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleEnvelopeClick}
          transition={{ type: "spring", stiffness: 300 }}
        />
      ) : (
        <>
          <motion.img
            src="Invitation.png"
            alt="Invitation"
            style={{
              width: "90%",
              maxWidth: "400px",
              border: "2px solid #000",
              borderRadius: "10px",
              marginBottom: "20px",
            }}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          {!isSubmitted ? (
            <form
              onSubmit={handleFormSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "15px",
              }}
            >
              <input
                type="text"
                placeholder="Navn"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  padding: "10px",
                  width: "90%",
                  maxWidth: "300px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
                required
              />
              <input
                type="tel"
                placeholder="Telefonnummer"
                value={phone}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d{0,8}$/.test(value)) {
                    setPhone(value);
                  }
                }}
                style={{
                  padding: "10px",
                  width: "90%",
                  maxWidth: "300px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
                required
              />
              <input
                type="number"
                placeholder="Antal personer"
                value={numPersons}
                onChange={(e) => setNumPersons(e.target.value)}
                style={{
                  padding: "10px",
                  width: "90%",
                  maxWidth: "300px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
                required
              />
              <button
                type="submit"
                style={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  backgroundColor: "#28a745",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Tilmeld
              </button>
            </form>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              style={{
                marginTop: "20px",
                fontSize: "18px",
                fontWeight: "bold",
                color: "#28a745",
              }}
            >
              Du er tilmeldt! Tak for din tilmelding.
            </motion.p>
          )}
          <a
            href="https://onskeskyen.dk/s/duxpkn"
            style={{
              display: "inline-block",
              marginTop: "20px",
              padding: "10px 20px",
              fontSize: "16px",
              fontWeight: "bold",
              textDecoration: "none",
              color: "#fff",
              backgroundColor: "#007bff",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            Se min ønskeliste her
          </a>
        </>
      )}
    </div>
  );
};

export default EnvelopeAnimation;
