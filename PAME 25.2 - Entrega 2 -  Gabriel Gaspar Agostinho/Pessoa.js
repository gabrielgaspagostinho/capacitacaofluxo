class Pessoa{
    // Atributo estático para controle de IDs automaticos
    static personalId = 1;
    // Senha como atributo privado para maior segurança
    #senha;
    constructor(nome, cpf, email, senha){
        // Atribui um ID único e incrementa o contador estático
        this.id = Pessoa.personalId++;
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.#senha = senha;
    }
    // Método local para autenticar uma senha da pessoa sem expor o atributo privado
    autenticar(senha){
        return this.#senha === senha;
    }
    alterarSenha(senhaAntiga, senhaNova){
        if(this.autenticar(senhaAntiga)){
            this.#senha = senhaNova;
            return true;
        }else{
            return false;
        }
    }
}


module.exports = Pessoa;