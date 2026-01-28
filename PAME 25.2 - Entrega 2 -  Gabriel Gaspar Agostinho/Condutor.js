const Pessoa = require('./Pessoa');

class Condutor extends Pessoa {
    constructor(nome, cpf, email, senha, dataNascimento) {
        super(nome, cpf, email, senha);
        this.dataNascimento = dataNascimento;
    }
}

module.exports = Condutor;