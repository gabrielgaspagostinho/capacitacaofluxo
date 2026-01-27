const readline = require('readline-sync');

class Carro{
    constructor(placa, modelo, marca, cor){
        this.placa = placa;
        this.modelo = modelo;
        this.marca = marca;
        this.cor = cor;
    }
}

class Pessoa{
    static personalId = 1;
    #senha;
    constructor(nome, cpf, email, senha){
        this.id = Pessoa.personalId++;
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.#senha = senha;
    }
    autenticar(senha){
        return this.#senha === senha;
    }
}

class Condutor extends Pessoa {
    constructor(nome, cpf, email, senha, dataNascimento) {
        super(nome, cpf, email, senha);
        this.dataNascimento = dataNascimento;
    }
}

class AgenteDeTransito extends Pessoa {
    constructor(nome, cpf, email, senha, matricula) {
        super(nome, cpf, email, senha);
        this.matricula = matricula;
    }
}

class Multa {
    static multaID = 1;
    constructor(idCliente, infracao, valor, status, data = new Date()) {
        this.id = Multa.multaID++;
        this.idcliente = idCliente;
        this.infracao = infracao;
        this.data = data;
        this.valor = valor;
        this.status = status;
    }
}


class Sistema{
    constructor(){
        this._condutores = [];
        this._agentes = [];
        this._veiculos = [];
        this._multas = [];
        this.usuariologado = null;
    }

// ------ opcoes de login e cadastro ------

    cadastro(tipo, nome, cpf, email, senha, infoAdicional){
        if(tipo === "condutor"){
            this._condutores.push(new Condutor(nome, cpf, email, senha, infoAdicional));
            console.log(`Condutor ${nome} cadastrado com sucesso.`);
        }else if(tipo === "agente"){
            this._agentes.push(new AgenteDeTransito(nome, cpf, email, senha, infoAdicional));
            console.log(`Agente de Trânsito ${nome} cadastrado com sucesso.`);
        }
    }

    login(email, senha){
        const usuario = this._condutores.find(c => c.email === email) || this._agentes.find(a => a.email === email);
        if(usuario && usuario.autenticar(senha)){
            this.usuariologado = usuario;
            console.log(`Login bem-sucedido. Bem-vindo, ${usuario.nome}!`);
            return true;
        }
        else{
            return false;
        }
    }

    logout(){
        this.usuariologado = null;
        console.log("Logout realizado com sucesso.");
        this.menuinicial();
    }

//  ------------------------------------------------------

// -------- opcoes mistas --------
    vermeusdados(){
        if(this.usuariologado){
            console.log("------  Dados do Usuário:  ------");
            console.log(`ID: ${this.usuariologado.id}`);
            console.log(`Nome: ${this.usuariologado.nome}`);
            console.log(`CPF: ${this.usuariologado.cpf}`);
            console.log(`Email: ${this.usuariologado.email}`);
            if(this.usuariologado instanceof Condutor){
                console.log(`Data de Nascimento: ${this.usuariologado.dataNascimento}`);
            }else if(this.usuariologado instanceof AgenteDeTransito){
                console.log(`Matrícula: ${this.usuariologado.matricula}`);
            }}
            else{
                console.log("Usuário não conectado.");
            }
            console.log("---------------------------------");
    }
    
    vermultas(){
        if(this.usuariologado instanceof AgenteDeTransito){
            console.log("------  Lista de Multas:  ------");
            console.log(this._multas)
        }
        else if(this.usuariologado instanceof Condutor){
            const multasDoCondutor = this._multas.filter(m => m.idcliente === this.usuariologado.id);
            console.log("------  Suas Multas:  ------");
            console.log(multasDoCondutor);
        }
        else{
        console.log("Usuário não conectado.");
        }
        console.log("---------------------------------");
    }

// ------------------------------------------------------

// ----------- opcoes de condutor ---------

    pagarmulta(idmulta){
        if(this.usuariologado instanceof Condutor){
            const multa = this._multas.find(m => m.id === idmulta && m.idcliente === this.usuariologado.id);
            if(multa && multa.status === "Pendente"){
                multa.status = "Pago";
                console.log(`Multa ID ${idmulta} paga com sucesso.`);
                return true;
            }else if(multa && multa.status === "Pago"){
                console.log("Multa já foi paga.");
                return false;
            }else{
                console.log("Multa não encontrada ou já paga.");
                return false;
            }
        }else{
            console.log("Acesso negado. Apenas condutores podem pagar multas.");
        }
    }

    recorrermulta(idmulta){
        if(this.usuariologado instanceof Condutor){
            const multa = this._multas.find(m => m.id === idmulta && m.idcliente === this.usuariologado.id);
            if(multa){
                multa.status = "Recorrida";
                console.log(`Multa ID ${idmulta} recorrida com sucesso.`);
                return true;
            }else{
                console.log("Multa não encontrada ou você não tem permissão para recorrer esta multa.");
                return false;
            }
        }else{
            console.log("Acesso negado. Apenas condutores podem recorrer multas.");
        }
    }

    cadastrarveiculo(placa, modelo, marca, cor){
        if(this.usuariologado instanceof Condutor){
            this._veiculos.push(new Carro(placa, modelo, marca, cor));
            console.log("Veículo cadastrado com sucesso.");
        }else{
            console.log("Acesso negado. Apenas condutores podem cadastrar veículos.");
        }
    }

// -----------------------------------------

// ----------- opcoes de agente -----------

    verveiculos(){
        if(this.usuariologado instanceof AgenteDeTransito){
            console.log("------  Lista de Veículos:  ------");
            console.log(this._veiculos)
        }else{
            console.log("Acesso negado. Apenas agentes de trânsito podem ver a lista de veículos.");
        }
        console.log("---------------------------------");
    }

    vercondutores(){
        if(this.usuariologado instanceof AgenteDeTransito){
            console.log("------  Lista de Condutores:  ------");
            console.log(this._condutores)
        }else{
            console.log("Acesso negado. Apenas agentes de trânsito podem ver a lista de condutores.");
        }
        console.log("---------------------------------");
    }

    statusmulta(idmulta, novostatus){
        if(this.usuariologado instanceof AgenteDeTransito){
            const multa = this._multas.find(m => m.id === idmulta);
            if(multa){
                multa.status = novostatus;
                console.log(`Status da multa ID ${idmulta} atualizado para: ${novostatus}`);
                return true;
            }else{
                console.log("Multa não encontrada.");
                return false;
            }
        }else{
            console.log("Acesso negado. Apenas agentes de trânsito podem alterar o status das multas.");
        }
    }

    aplicarmulta(idCliente, infracao, valor){
        if(this.usuariologado instanceof AgenteDeTransito){
            this._multas.push(new Multa(idCliente, infracao, valor, "Pendente"));
            console.log("Multa aplicada com sucesso.");
        }else{
            console.log("Acesso negado. Apenas agentes de trânsito podem aplicar multas.");
        }
    }

// -------------------------------------------

// ------------- interfaces de usuario (CLI) -----------------

    menuinicial(){
        console.log("-------------------------------------------------");
        console.log("Bem-vindo ao Sistema de Gestão de Trânsito");
        console.log("Para navegar, digite o numero da opção desejada em cada tela de MENU.");
        console.log("||| MENU INICIAL:  |||");
        console.log(" [1] - Login \n [2] - Cadastro de Usuário \n [3] - Fechar aplicação");
        const escolha = readline.question("Opcao: ");
        if(escolha === "1"){
            this.interlogin();
        }else if(escolha === "2"){
            this.intercadastro();
        }else if(escolha === "3"){
            console.log("Aplicação encerrada.");
            return;
        }
    }

    intercadastro(){        
        console.log("Cadastro de Usuário:");
        const tipo = readline.question("Tipo (condutor/agente): ").toLowerCase();
        const nome = readline.question("Nome: ");
        const cpf = readline.question("CPF: ");
        const email = readline.questionEMail("Email: ");
        const senha = readline.questionNewPassword("Senha(A senha deve ter entre 6 e 20 caracteres): ", {minLength: 6, maxLength: 20, confirmMessage: "Confirme a senha: "});
        let infoAdicional;
        if(tipo === "condutor"){
            infoAdicional = readline.question("Data de nascimento (dd/mm/aaaa): ");
        }else if(tipo === "agente"){
            infoAdicional = readline.question("Matrícula: ");
        }
        this.cadastro(tipo, nome, cpf, email, senha, infoAdicional);
    }
    interlogin(){
        const email = readline.questionEMail("Email: ");
        var senha = readline.question("Senha: ", {hideEchoBack: true});
        while(!this.login(email, senha)){
            console.log("Falha no login. Email ou senha incorretos.");
            console.log("Digite a senha novamente, ou 'sair' para mudar o email.");
            senha = readline.question("Senha: ", {hideEchoBack: true});
            if(senha.toLowerCase() === 'sair'){
                return this.interlogin();
            }
        }
        if (this.usuariologado instanceof AgenteDeTransito){
            //this.menuagente();
        }else if(this.usuariologado instanceof Condutor){
            this.menucondutor();
        }else{
            console.log("Tipo de usuário desconhecido.");
        }
    }

    menucondutor(){
        console.log("||| MENU CONDUTOR:  |||");
        console.log(" [1] - Ver meus dados \n [2] - Ver minhas multas \n [3] - Cadastrar veículo \n [4] - Pagar multa \n [5] - Recorrer multa \n [6] - Logout");
        const escolha = readline.question("Opcao: ");
        switch(escolha){
            case "1":
                this.vermeusdados();
                this.menucondutor();
                break;
            case "2":
                this.vermultas();
                this.menucondutor();
                break;
            case "3":
                const placa = readline.question("Placa: ");
                const modelo = readline.question("Modelo: ");
                const marca = readline.question("Marca: ");
                const cor = readline.question("Cor: ");
                this.cadastrarveiculo(placa, modelo, marca, cor);
                this.menucondutor();
                break;
            case "4":
                const idmultaPagar = parseInt(readline.question("ID da multa a pagar: "));
                this.pagarmulta(idmultaPagar);
                this.menucondutor();
                break;
            case "5":
                const idmultaRecorrer = parseInt(readline.question("ID da multa a recorrer: "));
                this.recorrermulta(idmultaRecorrer);
                this.menucondutor();
                break;
            case "6":
                this.logout();
                return;
        }
    }

    menuagente(){
        console.log("||| MENU AGENTE DE TRÂNSITO:  |||");
        console.log(" [1] - Ver meus dados \n [2] - Ver condutores \n [3] - Ver veículos \n [4] - Ver multas \n [5] - Aplicar multa \n [6] - Alterar status de multa \n [7] - Logout");
        const escolha = readline.question("Opcao: ");
        switch(escolha){
            case "1":
                this.vermeusdados();
                this.menuagente();
                break;
            case "2":
                this.vercondutores();
                this.menuagente();
                break;
            case "3":
                this.verveiculos();
                this.menuagente();
                break;
            case "4":
                this.vermultas();
                this.menuagente();
                break;
            case "5":
                const idCliente = parseInt(readline.question("ID do condutor: "));
                const infracao = readline.question("Infração: ");
                const valor = parseFloat(readline.question("Valor da multa: "));
                this.aplicarmulta(idCliente, infracao, valor);
                this.menuagente();
                break;
            case "6":
                const idmulta = parseInt(readline.question("ID da multa: "));
                const novostatus = readline.question("Novo status (Pendente/Pago/Recorrida): ");
                this.statusmulta(idmulta, novostatus);
                this.menuagente();
                break;
            case "7":
                this.logout();
                return;
        }
    }
// -----------------------------------------------------------
}
const sistema = new Sistema();

// Dados de teste e debug
/*
sistema._condutores.push(new Condutor("João Silva", "123.456.789-00", "joao.silva@email.com", "senha123", "01/01/1990"));
sistema._agentes.push(new AgenteDeTransito("Maria Souza", "987.654.321-00", "maria.souza@email.com", "senha456", "12345"));
sistema._veiculos.push(new Carro("ABC-1234", "Modelo X", "Marca Y", "Vermelho"));
sistema._agentes.push(new AgenteDeTransito("Carlos Pereira", "456.789.123-00", "carlos.pereira@email.com", "senha789", "54321"));
sistema._condutores.push(new Condutor("Ana Oliveira", "321.654.987-00", "ana.oliveira@email.com", "senha123", "01/01/1990"));
sistema._veiculos.push(new Carro("DEF-5678", "Modelo A", "Marca B", "Azul"));
sistema._condutores.push(new Condutor("Pedro Santos", "654.321.987-00", "pedro.santos@email.com", "senha123", "01/01/1990"));


sistema.login("joao.silva@email.com", "senha123");
sistema.vermeusdados();
sistema.vercondutores();
sistema.verveiculos();
sistema.vermultas();
sistema.cadastrarveiculo("GHI-9012", "Modelo C", "Marca D", "Preto");
sistema.aplicarmulta(1, "Excesso de velocidade", 150);
sistema.vermultas();
sistema.pagarmulta(1);
sistema.vermultas();

sistema.login("maria.souza@email.com", "senha456");
sistema.verveiculos();
sistema.vercondutores();
sistema.vermeusdados();
sistema.aplicarmulta(2, "Estacionamento proibido", 100);
sistema.vermultas();
sistema.statusmulta(1, "Pago");
console.log(sistema._multas[0]);
console.log(sistema._multas.find(m => m.id === 1));
sistema.vermultas();

sistema.cadastro("condutor", "Lucas Lima", "789.123.456-00","lucas.lima@email.com", "senha123", "01/01/1990");
sistema.cadastro("agente", "Fernanda Rocha", "159.753.486-00", "67890");
sistema.login("lucas.lima@email.com", "senha123");
sistema.vermeusdados();
sistema.vercondutores();
sistema.verveiculos();
sistema.vermultas();
*/

// Os dados de teste e debug serão removidos e o código será melhor comentado para a melhor compreensão de duturos devs.

sistema.menuinicial();