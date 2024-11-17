// @desc    Delete a contact
// @route   DELETE /api/contact/:id
// @access  Private
const deleteContact = async (req, res) => {
  const { id } = req.params;

  try {
    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    // Remove the contact
    await contact.remove();

    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact:", error.message);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};

export { createContact, getContacts, deleteContact };
