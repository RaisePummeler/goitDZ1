const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname + "/db/contacts.json");

/**
 * Gets all contacts in database
 * @Array<string>
 */
function listContacts() {
  const rawdata = fs.readFileSync(contactsPath);
  const data = JSON.parse(rawdata);

  return data;
}

/**
 * Search of contact in database
 * @object
 * @param {number} contactId - id of contact
 */
function getContactById(contactId) {
  const rawdata = fs.readFileSync(contactsPath);
  const data = JSON.parse(rawdata);

  let neededContact = data.find(contact => contact.id == contactId.toString());

  if(!neededContact) {
    return `No contact with id ${contactId} in database`;
  }

  return neededContact;
}

/**
 * Remove of contact in database if exist
 * @string
 * @param {number} contactId - id of contact
 */
function removeContact(contactId) {
  const findContactResult = getContactById(contactId);

  if(findContactResult.id) {
    const rawdata = fs.readFileSync(contactsPath);
    let data = JSON.parse(rawdata);
    const arrayIndex = data.indexOf(findContactResult);

    data.splice(arrayIndex, 1);

    fs.writeFileSync(contactsPath, JSON.stringify(data));

    console.log("Removing Contact Result - Success");

    return findContactResult;
  } else {
    console.log(findContactResult);
    console.log("Removing Contact Result - Failure");

    return null;
  }

}

/**
 * Add of contact to database if not exist
 * @string
 * @param {string} name - name of contact
 * @param {string} email - email of contact
 * @param {string} phone - string representasion of phone number of contact
 */
function addContact(name, email, phone) {
  const rawdata = fs.readFileSync(contactsPath);
  let data = JSON.parse(rawdata);
  const allIds = data.map(contact => contact.id);
  const lastId = Math.max(...allIds);
  
  const newContact = {
    id: (lastId + 1).toString(),
    name: name,
    email: email,
    phone: phone,
  }

  if(data.length) {
    data.push(newContact)
  } else {
    /* if data is not array or empty */
    data = [ newContact ];
  }

  fs.writeFileSync(contactsPath, JSON.stringify(data));

  console.log("Adding Contact Result - Success");

  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };