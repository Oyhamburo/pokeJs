import { UserService } from '../../services/index.service.js';
import { sendGmail } from "../../utils/mail/gmail/EmailSender.js";
import { htmlNewUserTemplate } from "../../utils/mail/gmail/html/newUserCreateTemplate.js";

const Service = UserService.getInstance();
const controller = {}

controller.logInView = async (req, res) => {
    console.log(req.session)
    if (req.session.login) {
        res.redirect('game')
    } else {
        res.render('login', { status: false })
    }
}

controller.signUpView = async (req, res) => {
    if (req.session.login) {
        res.redirect('game')
    } else {
        res.render('signup', { status: false })
    }
}

controller.signUp = async (req, res) => {
    const { body } = req;
    const newUser = await Service.createUser(body);

    if (newUser) {
        const now = new Date();
        const newUserTemplateEmail = htmlNewUserTemplate(newUser._id, now.toLocaleString());
        await sendGmail('Nuevo usuario creado', newUserTemplateEmail);
        res.redirect('game')
        // res.status(200).json({ "success": "User added with ID " + newUser._id })
    } else {
        // res.status(400).json({ "error": "there was an error, please verify the body content match the schema" })
        res.redirect('failsignup')
    }

}

controller.logIn = async (req, res) => {
    const { username, password } = req.body;
    const loggedUser = await Service.loginUser({
        username: username,
        password: password
    });
    if (loggedUser) {
        req.session.login = true;
        req.session.user = loggedUser.username
        req.session.idUser = loggedUser._id
        req.session.email = loggedUser.email
        res.status(200).redirect('game')
    } else {
        req.session.login = false;
        res.status(400).redirect('faillogin')
    }
}


controller.homeView = async (req, res) => {
    res.render('login', { status: req.session.login })
}

controller.game = async (req, res) => {
    if (req.session.login) {
        let user = req.session.user
        res.render('home',{ username: user })
    }else{
        res.redirect('login')
    }
}

controller.logOutView = async (req, res) => {
    if (!req.session.login) {
        res.redirect('login')
    } else {
        req.session.destroy((err) => {
            if (err) {
                res.json(err);
            } else {
                res.render('login', { status: false });
            }
        })
    }
}
controller.getUser = async (req,res) =>{
    res.send(req.session)
}

export { controller as userController }