const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
})

const createContact = asyncHandler(async (req, res) => {
    console.log("Request body is:", req.body);
    const { name, email, phone, type } = req.body;
    if (!name || !email || !phone) {
        return res.status(400).json({ message: "Please enter all fields" });
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        type
    });
    res.status(201).json(contact);
})


const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findByIdAndDelete(req.params.id); // Deletes and retrieves the document
    if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json({ message: "Contact deleted successfully", contact });
});

const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        return res.status(404).json({ message: "Contact not found" });
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true}
    )


    res.status(200).json(updatedContact);
})

const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(contact);
})



module.exports = {  getContacts, createContact, deleteContact, updateContact, getContact };