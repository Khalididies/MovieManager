const Members = require("./MembersDataBaseBLL");

// GET ALL - READ
const getAllMembers = async () => {
    const members = await Members.find({});
    return members;
};

// GET BY ID - READ
const getMemberById = async (id) => {
    const member = await Members.findById(id);
    return member;
};

// ADD one - CREATE
const addMember = async (obj) => {
    const newMember = new Members(obj);
    await newMember.save();
    return 'Created';
};

// UPDATE one - UPDATE
const updateOneMember = async (id, obj) => {
    await Members.findByIdAndUpdate(id, obj);
    return 'Updated';
};

// DELETE one - DELETE
const deleteOneMember = async (id) => {
    await Members.findByIdAndDelete(id);
    return 'Deleted';
};

module.exports = {
    getAllMembers, getMemberById, addMember, updateOneMember, deleteOneMember
};