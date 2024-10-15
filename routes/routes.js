
const express = require("express");
const router = express.Router();
const User = require("../models/User");


router.get("/", (req, res) => {
    res.render("index")
});
router.get("/index", (req, res) => res.redirect("/"));
router.get("/home", (req, res) => res.redirect("/"));

// About page
router.get("/about", (req, res) => {
    res.render("about");
});

// Redirect to about
router.get("/about-us", (req, res) => {
    res.redirect('/about');
});

// Gallery page
router.get("/gallery", (req, res) => {
    res.render("gallery");
});

// Registration and Login pages
router.get("/register", (req, res) => {
    res.render("register");
});

router.get("/login", (req, res) => {
    res.render("login");
});

// Agenda page
router.get("/agenda", (req, res) => {
    res.render("agenda");
});


/*============================================================================================================*/
/*===================================== POST ROUTES ============================================================*/
/*============================================================================================================*/

router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirmPassword, collegeName, year, department } = req.body;
        console.log(req.body);
        console.log(firstName, lastName, email, password, confirmPassword, collegeName, year, department);


        // Check for missing fields
        if (!firstName || !lastName || !email || !password || !confirmPassword || !collegeName || !year || !department) {
            return res.render('register', {
                error: 'All fields are required',
                firstName, lastName, email, collegeName, year, department
            });
        }

        // Check password match
        if (password !== confirmPassword) {
            return res.render('register', {
                error: 'Passwords do not match',
                firstName, lastName, email, collegeName, year, department
            });
        }

        // Check password length
        if (password.length < 6) {
            return res.render('register', {
                error: 'Password should be at least 6 characters long',
                firstName, lastName, email, collegeName, year, department
            });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.render('register', {
                error: 'Email already registered',
                firstName, lastName, email, collegeName, year, department
            });
        }

        // Check for image upload
        if (!req.files || !req.files.image) {
            return res.render('register', {
                error: 'Profile image is required',
                firstName, lastName, email, collegeName, year, department
            });
        }

        const file = req.files.image;
        const filename = new Date().getTime().toString() + path.extname(file.name);
        const savePath = path.join(__dirname, 'public', "uploads", filename);

        if (file.truncated) {
            return res.render('register', {
                error: "File size too big",
                firstName, lastName, email, collegeName, year, department
            });
        }

        await file.mv(savePath);

        const user = new User({
            firstName, lastName, email, password, collegeName, year, department, image: filename
        });

        await user.save();
        res.render('login', { success: 'Registration successful. Please log in.' });
    } catch (err) {
        console.error('Error creating user:', err);
        res.render('register', {
            error: 'An error occurred during registration',
            firstName, lastName, email, collegeName, year, department
        });
    }
});



//  registered users only for testing 
router.get('/users', (req, res) => {
    User.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            console.error('Error retrieving users:', err);
            res.status(500).json({ result: 'error', message: 'Error retrieving users' });
        });
});


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            console.log('Invalid email or password');
            return res.render('login', { error: 'Invalid email or password', email });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            req.session.userId = user._id;
            req.session.userEmail = user.email;
            req.session.isLoggedIn = true;
            res.redirect('/');
        } else {
            console.log('Invalid email or password');
            return res.render('login', { error: 'Invalid email or password', email });
        }
    } catch (err) {
        console.error('Error logging in:', err);
        res.render('login', { error: 'An error occurred during login', email: req.body.email });
    }
});


const isAuthenticated = (req, res, next) => {
    if (req.session.isLoggedIn) {
        next();
    } else {
        res.redirect('/login');
    }
};

router.get('/profile', isAuthenticated, (req, res) => {
    res.render('profile', { user: req.session });
});


router.use((req, res, next) => {
    res.status(404).render('404');
});
module.exports = router;

