module.exports={
    register: (req, res) => {
        const { username, password } = req.body;
        const db = req.app.get('db');
        db.users.insert({ username, password })
            .then(newUser => {
                req.session.user = { username: newUser.username, id: newUser.id };
                res.status(201).send(newUser);
            }).catch(error => {
                console.log(`ctrl.register ${error}`);
                res.sendStatus(500);
            });
    },
    login: (req, res) => {
        const { username, password } = req.body;
        const db = req.app.get('db');
        db.users.findOne({ username, password })
            .then(user => {
                req.session.user = { username: user.username, id: user.id};
                res.status(200).send(user);
            }).catch(error => {
                console.log(`ctrl.login ${error}`);
                res.status(500);
            })
    },
    search: async (req, res) => {
        const { search } = req.query;
        const { userPosts } = req.body;
        const { id } = req.session.user;
        const db = req.app.get('db');
        const posts = await db.getPosts();
        let results;
        if (userPosts) {
            if (search) {
                results = posts.filter(post => post.title.includes(search));
                res.status(200).send(results);
            } else {
                res.status(200).send(posts)
            }
        } else {
            if (search) {
                results = posts.filter(post => post.title.includes(search) && id != post.author_id);
                res.status(200).send(results);
            } else {
                results = posts.filter(post => id != post.author_id);
                res.status(200).send(results);
            }
        }
    },
    readById: (req, res) => {
        let { id } = req.params
        let db = req.app.get('db')
        db.getOne([id])
            .then(post => {
                res.status(200).send(post[0]);
            }).catch(error => {
                console.log(`ctrl.readById ${error}`)
                res.sendStatus(404)
            })
    },
    create: (req, res) => {
        const { title, img, content } = req.body;
        const db = req.app.get('db');
        db.posts.insert({title, img, content, author_id: req.sesson.user.id})
            .then(post => {
                res.sendStatus(201)
            }).catch(error => {
                console.log(`ctrl.create ${error}`);
                res.sendStatus(500);
            })
    },
    getCurrentUser: (req, res) => {
        const { id } = req.session.user
        db.users.findOne({id})
            .then(user => {
                res.status(200).send(user[0])
            }).catch(error => {
                res.sendStatus(500);
                console.log(`ctrl.getCurrentUser ${error}`)
            })
    },
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    }
}