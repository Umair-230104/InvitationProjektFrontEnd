const BASE_URL = "https://invitationapi.ut-cphb.dk/api/v1/invitations";

const InvitationService = {
  // Hent alle invitationer
  getAllInvitations: async () => {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch invitations");
    }
    return response.json();
  },

  // Opret en ny invitation
  createInvitation: async (invitation) => {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invitation),
    });
    if (!response.ok) {
      throw new Error("Failed to create invitation");
    }
    return response.json();
  },
};

export default InvitationService;
