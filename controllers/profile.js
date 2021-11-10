export const handleProfileGet = (db) => (req, res) => {
    const { id } = req.params;

    db.from('users').where({ id }).select('*')
        .then(user => {
            if (user.length) {
                res.json(user[0]);
            } else {
                res.status(400).json('User not found.')
            }

        })
        .catch(err => res.status(400).json('error getting user'))
};