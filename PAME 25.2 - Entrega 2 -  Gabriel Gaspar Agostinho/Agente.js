const Pessoa = require('./Pessoa');

class AgenteDeTransito extends Pessoa {
    constructor(nome, cpf, email, senha, matricula) {
        super(nome, cpf, email, senha);
        this.matricula = matricula;
    }
}

module.exports = AgenteDeTransito;