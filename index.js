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
        user = _.find(data, { 'cpf': req.body.cpf, 'senha': req.body.senha });
    }

    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ "mensagem": "Usuário não encontrado!" });
    }

});

app.use('/api', router);

app.listen(port);
console.log('Listening on port ' + port);
