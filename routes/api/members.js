const express = require('express');
const router = express.Router();
const members = require('../../Members');
const uuid = require('uuid');

//Get All Members
router.get('/', (req, res) => res.json(members));

//Get Single Member
router.get('/:id', (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    res.json(members.filter(member => member.id === JSON.parse(req.params.id)));
  } else {
    res
      .status(400)
      .json({ msg: `member with the id ${req.params.id} is not found` });
  }
});

//Create Member
router.post('/', (req, res) => {
  const { name, email } = req.body;

  const newMember = {
    id: uuid.v4(),
    name,
    email,
    status: 'active',
  };

  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: 'Please include an email and a name' });
  }
  members.push(newMember);
  res.json(members);
  // res.redirect('/');
});

//Update Member
router.put('/:id', (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    const updateMember = req.body;
    members.forEach(member => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updateMember.name || member.name;
        member.email = updateMember.email || member.email;

        res.json({ msg: 'Member was updated', member });
      }
    });
  } else {
    res
      .status(400)
      .json({ msg: `member with the id ${req.params.id} is not found` });
  }
});

//Delete Single Member
router.delete('/:id', (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    res.json({
      msg: 'Member Deleted',
      members: members.filter(
        member => member.id !== JSON.parse(req.params.id)
      ),
    });
  } else {
    res
      .status(400)
      .json({ msg: `member with the id ${req.params.id} is not found` });
  }
});

module.exports = router;
