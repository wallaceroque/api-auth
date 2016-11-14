var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');
var users = require('./users.json');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

router.use(function (req, res, next) {
    console.log('Verificando acesso.');
    next();
});

router.post('/auth', function (req, res) {
    var user = undefined;

    if (req.body) {
        user = _.find(users, { 'cpf': req.body.cpf, 'senha': req.body.senha });
    }

    if (user) {
        console.log(user);
        res.json(user);
    } else {
        res.status(404).json({ "mensagem": "Usuário não encontrado!" });
    }

});

router.post('/upd', function (req, res) {
    var index = undefined;

    if (req.body) {
        index = _.findIndex(users, { 'cpf': req.body.cpf, 'senha': req.body.senha });
    }

    if (index > -1) {
        users[index].senha = req.body.novaSenha;
        users[index].statusToken = "SENHA_ALTERADA";
        console.log(users[index]);
        res.json(users[index]);
    } else {
        res.status(404).json({ "mensagem": "Usuário não encontrado!" });
    }


});

app.use('/api', router);

app.listen(port);
console.log('Listening on port ' + port);
