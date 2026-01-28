const readline = require('readline-sync');

const Condutor = require('./Condutor');
const AgenteDeTransito = require('./Agente');
const Veiculo = require('./Veiculo');
const Multa = require('./Multa');


class Sistema{
    constructor(){
        // Listas para armazenar os dados do sistema
        this._condutores = [];
        this._agentes = [];
        this._veiculos = [];
        this._multas = [];
        this.usuariologado = null;
    }

// ------ opcoes de login e cadastro ------

    cadastro(tipo, nome, cpf, email, senha, infoAdicional){
        console.log("---------------------------------------------------------------------");
        if(tipo === "condutor"){
            this._condutores.push(new Condutor(nome, cpf, email, senha, infoAdicional));
            console.log(` --> Condutor ${nome} cadastrado com sucesso.`);
        }else if(tipo === "agente"){
            this._agentes.push(new AgenteDeTransito(nome, cpf, email, senha, infoAdicional));
            console.log(` --> Agente de Trânsito ${nome} cadastrado com sucesso.`);
        }
    }

    login(email, senha){
        const usuario = this._condutores.find(c => c.email === email) || this._agentes.find(a => a.email === email);
        if(usuario && usuario.autenticar(senha)){
            this.usuariologado = usuario;
            console.log("((((((((((((((((((((((((((((((((((())))))))))))))))))))))))))))))))))))))))))");
            console.log(`(((((((  Login bem-sucedido. Bem-vindo, ${usuario.nome}!  )))))))`);
            console.log("((((((((((((((((((((((((((((((((((())))))))))))))))))))))))))))))))))))))))))");
            return true;
        }
        else{
            return false;
        }
    }

    logout(){
        this.usuariologado = null;
        console.log("#######################################");
        console.log("###  Logout realizado com sucesso.  ###");
        console.log("#######################################");
        this.menuinicial();
    }

//  ------------------------------------------------------

// -------- opcoes mistas --------

//ver dados do usuario logado
    vermeusdados(){
        console.log("|<--------------------------------------------------------------------->|");
        if(this.usuariologado){
            //exibe os dados do usuário logado sem mostrar o ID e a senha por motivos de segurança
            console.log("------  Dados do Usuário:  ------");
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
            console.log("|<--------------------------------------------------------------------->|");
    }

//ver multas (depende do tipo de usuario)
    vermultas(){
        console.log("|<--------------------------------------------------------------------->|");
        //se o usuario logado for um agente de transito, mostra todas as multas
        if(this.usuariologado instanceof AgenteDeTransito){
            console.log("------  Lista de Multas:  ------");
            console.log(this._multas)
        }
        //se for um condutor, mostra apenas as multas dele
        else if(this.usuariologado instanceof Condutor){
            //filtra as multas do condutor logado
            const multasDoCondutor = this._multas.filter(m => m.idCliente === this.usuariologado.id);
            console.log("------  Suas Multas:  ------");
            if(multasDoCondutor.length === 0){
                console.log("   Parabéns! Você não possui multas.");
            }else{
                console.log(multasDoCondutor);
            }
        }
        else{
        console.log("Usuário não conectado.");
        }
        console.log("|<--------------------------------------------------------------------->|");
    }

    editardados(novonome = null, novocpf = null, novoemail = null, senhaAntiga = null, novaSenha = null, infoAdicional = null){
        if(this.usuariologado){
            if(novonome !== null) this.usuariologado.nome = novonome;
            if(novocpf !== null) this.usuariologado.cpf = novocpf;
            if(novoemail !== null) this.usuariologado.email = novoemail;
            if(novaSenha !== null){
                this.usuariologado.alterarSenha(senhaAntiga, novaSenha);
            }
            if(this.usuariologado instanceof Condutor && infoAdicional !== null){
                this.usuariologado.dataNascimento = infoAdicional;
            }else if(this.usuariologado instanceof AgenteDeTransito && infoAdicional !== null){
                this.usuariologado.matricula = infoAdicional;
            }
            console.log("#######  Dados atualizados com sucesso.  #######");
        }else{
            console.log("Nenhum usuário logado.");
        }
    }

// ------------------------------------------------------

// ----------- opcoes de condutor ---------

    pagarmulta(idDaMulta){
        console.log("|<--------------------------------------------------------------------->|");
        if(this.usuariologado instanceof Condutor){
            //se a multa existir e pertencer ao condutor logado, altera o status para "pago"
            const multa = this._multas.find(m => m.idMulta === idDaMulta && m.idCliente === this.usuariologado.id);
            if(multa && multa.status === "pendente"){
                multa.status = "pago";
                console.log(`Multa ID ${idDaMulta} paga com sucesso.`);
            }else if(multa && multa.status === "pago"){
                console.log("Multa já foi paga.");
            }else{
                console.log("Multa não encontrada ou não pertence a você.");
            }
        }else{
            console.log("Acesso negado. Apenas condutores podem pagar multas.");
        }
        console.log("|<--------------------------------------------------------------------->|");
    }

    recorrermulta(idDaMulta){
        console.log("|<--------------------------------------------------------------------->|");
        //se a multa existir e pertencer ao condutor logado, altera o status para "recorrida"
        if(this.usuariologado instanceof Condutor){
            const multa = this._multas.find(m => m.idMulta === idDaMulta && m.idCliente === this.usuariologado.id);
            if(multa){
                multa.status = "recorrida";
                console.log(`Multa ID ${idDaMulta} recorrida com sucesso.`);
            }else{
                console.log("Multa não encontrada ou você não tem permissão para recorrer esta multa.");
            }
        }else{
            console.log("Acesso negado. Apenas condutores podem recorrer multas.");
        }
        console.log("|<--------------------------------------------------------------------->|");
    }

    cadastrarveiculo(placa, modelo, marca, cor){
        console.log("|<--------------------------------------------------------------------->|");
        if(this.usuariologado instanceof Condutor){
            this._veiculos.push(new Veiculo(placa, modelo, marca, cor));
            console.log("Veículo cadastrado com sucesso.");
        }else{
            console.log("Acesso negado. Apenas condutores podem cadastrar veículos.");
        }
        console.log("|<--------------------------------------------------------------------->|");
    }

// -----------------------------------------

// ----------- opcoes de agente -----------


    verveiculos(){
        console.log("|<--------------------------------------------------------------------->|");
        //se o usuario logado for um agente de transito, mostra todos os veiculos, se nao, nega o acesso
        if(this.usuariologado instanceof AgenteDeTransito){
            console.log("------  Lista de Veículos:  ------");
            console.log(this._veiculos)
        }else{
            console.log("Acesso negado. Apenas agentes de trânsito podem ver a lista de veículos.");
        }
        console.log("|<--------------------------------------------------------------------->|");
    }

    vercondutores(){
        console.log("|<--------------------------------------------------------------------->|");
        //se o usuario logado for um agente de transito, mostra todos os condutores, se nao, nega o acesso
        if(this.usuariologado instanceof AgenteDeTransito){
            console.log("------  Lista de Condutores:  ------");
            console.log(this._condutores)
        }else{
            console.log("Acesso negado. Apenas agentes de trânsito podem ver a lista de condutores.");
        }
        console.log("|<--------------------------------------------------------------------->|");
    }

    statusmulta(idDaMulta, novostatus){
        console.log("|<--------------------------------------------------------------------->|");
        //se o usuario logado for um agente de transito, permite alterar o status da multa
        if(this.usuariologado instanceof AgenteDeTransito){
            
            const multa = this._multas.find(m => m.idMulta === idDaMulta);
            if(multa){
                novostatus = novostatus.toLowerCase();
                //valida o novo status para garantir que é um dos valores permitidos
                if(novostatus === "pendente" || novostatus === "pago" || novostatus === "recorrida"){
                    multa.status = novostatus;
                }else{
                    console.log("Status inválido. Use 'Pendente', 'Pago' ou 'Recorrida'.");
                    return;
                }
                console.log(`Status da multa ID ${idDaMulta} atualizado para: ${novostatus}`);
            }else{
                console.log("Multa não encontrada.");
            }
        }else{
            console.log("Acesso negado. Apenas agentes de trânsito podem alterar o status das multas.");
        }
        console.log("|<--------------------------------------------------------------------->|");
    }

    aplicarmulta(idCliente, infracao, valor){
        console.log("|<--------------------------------------------------------------------->|");
        //se o usuario logado for um agente de transito, permite aplicar uma multa, se nao, nega o acesso
        if(this.usuariologado instanceof AgenteDeTransito){
            this._multas.push(new Multa(idCliente, infracao, valor, "pendente"));
            console.log("Multa aplicada com sucesso.");
        }else{
            console.log("Acesso negado. Apenas agentes de trânsito podem aplicar multas.");
        }
        console.log("|<--------------------------------------------------------------------->|");
    }

    buscarplaca(){
        
        const placa = readline.question("Digite a placa do veículo a ser buscado: ");
        const veiculo = this._veiculos.find(v => v.placa === placa);
        console.log("|<--------------------------------------------------------------------->|");
        if(veiculo){
            console.log("Veículo encontrado:");
            console.log(veiculo);
        }else{
            console.log("Veículo não encontrado.");
        }
        console.log("|<--------------------------------------------------------------------->|");
    }

    relatoriomultas() {
        const dias = readline.question("Quantidade de dias:").trim();

        console.log("|<--------------------------------------------------------------------->|");
        //fega a data de hoje
        const dataLimite = new Date();
        
        dataLimite.setHours(0, 0, 0, 0);
        //calcula a data limite
        dataLimite.setDate(dataLimite.getDate() - (parseInt(dias)));
        console.log(`Calculando arrecadação desde: ${dataLimite.toLocaleDateString()}...`);
        dataLimite.setDate(dataLimite.getDate() - 1);
        //filtra e soma
        const multasNoPeriodo = this._multas.filter(m => m.data > dataLimite);
        let somaFinal = 0
        for (let i = 0; i < multasNoPeriodo.length; i++){
            console.log(`Somando multa Id ${multasNoPeriodo[i].idMulta} de valor: R$${multasNoPeriodo[i].valor}`);
            somaFinal = somaFinal + parseFloat(multasNoPeriodo[i].valor);
        }

        console.log(`------ Relatório (${dias} dias) ------`);
        console.log(`Quantidade de multas: ${multasNoPeriodo.length}`);
        console.log(`Total arrecadado: R$ ${somaFinal.toFixed(2)}`);
        console.log("|<--------------------------------------------------------------------->|");
    }

// -------------------------------------------

// ------------- interfaces de usuario (CLI) -----------------

    menuinicial(){
        console.log("|<------------------------------------------------>|");
        console.log("|<<< Bem-vindo ao Sistema de Gestão de Trânsito >>>|");
        console.log("|<------------------------------------------------>|");
        console.log("Para navegar, digite o numero da opção desejada em cada tela de MENU.");
        console.log("||| MENU INICIAL:  |||");
        console.log(" [1] - Login \n [2] - Cadastro de Usuário \n [3] - Fechar aplicação");
        // Lê a escolha do usuário tira os espaços em branco desnecessários e executa a ação correspondente ou exibe uma mensagem de erro e reinicia o menu
        const escolha = readline.question("Opcao: ").trim();
        if(escolha === "1"){
            this.interlogin();
        }else if(escolha === "2"){
            this.intercadastro();
        }else if(escolha === "3"){
            console.log("Aplicação encerrada.");
            return;
        }else{
            console.log("Opção inválida. Tente novamente.");
            this.menuinicial();
        }
    }

    intercadastro(){
        console.log("-------------------------------------------------");
        console.log("Cadastro de Usuário:");
        const tipo = readline.question("Tipo (condutor/agente): ").toLowerCase();
        if(tipo !== "condutor" && tipo !== "agente"){
            console.log("Tipo inválido. Tente novamente.");
            return this.intercadastro();
        }
        const nome = readline.question("Nome: ");
        const cpf = readline.question("CPF: ").trim();
        //validação simples de email
        const email = readline.questionEMail("Email: ", {limitMessage: "Email inválido. Tente novamente."}).trim();
        // validação simples de senha (comprimento entre 6 e 12 caracteres)
        const senha = readline.question("Senha(deve conter entre 6 e 12 caracteres): ", {hideEchoBack: true});
        while (senha.length < 6 || senha.length > 12) {
            console.log("Senha muito curta. Deve ter pelo menos 6 caracteres.");
            senha = readline.question("Senha(deve conter entre 6 e 12 caracteres): ", {hideEchoBack: true});
        }
        let infoAdicional;
        // coleta a informação adicional com base no tipo de usuário
        if(tipo === "condutor"){
            infoAdicional = readline.question("Data de nascimento (dd/mm/aaaa): ").trim();
            this.cadastro(tipo, nome, cpf, email, senha, infoAdicional);
            this.login(email, senha);
            this.menucondutor();
        }else if(tipo === "agente"){
            infoAdicional = readline.question("Matrícula: ").trim();
            this.cadastro(tipo, nome, cpf, email, senha, infoAdicional);
            this.login(email, senha);
            this.menuagente();
        }
    }

    interlogin(){
        console.log("-------------------------------------------------");
        console.log("Login de Usuário(pressione Enter sem digitar nada para voltar):");
        const email = readline.question("Email: ").trim();
        if(email === ''){
                return this.menuinicial();
            }
        var senha = readline.question("Senha: ", {hideEchoBack: true});
        while(!this.login(email, senha)){
            console.log("Falha no login. Email ou senha incorretos.");
            console.log("Digite a senha novamente, ou pressione Enter sem digitar nada para mudar o email.");
            senha = readline.question("Senha: ", {hideEchoBack: true});
            if(senha === ''){
                return this.interlogin();
            }
        }
        //redireciona para o menu apropriado com base no tipo de usuário
        if (this.usuariologado instanceof AgenteDeTransito){
            this.menuagente();
        }else if(this.usuariologado instanceof Condutor){
            this.menucondutor();
        }else{
            console.log("Tipo de usuário desconhecido.");
        }
    }

    menucondutor(){
        console.log("||| MENU CONDUTOR:  |||");
        console.log(" [1] - Ver meus dados \n [2] - Ver minhas multas \n [3] - Cadastrar veículo \n [4] - Pagar multa \n [5] - Recorrer multa \n [6] - Editar meus dados \n [7] - Logout");
        // Lê a escolha do usuário tira os espaços em branco desnecessários e executa a ação correspondente ou exibe uma mensagem de erro e reinicia o menu
        const escolha = readline.question("Opcao: ").trim();
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
                const idDaMultaPagar = parseInt(readline.question("ID da multa a pagar: "));
                this.pagarmulta(idDaMultaPagar);
                this.menucondutor();
                break;
            case "5":
                const idDaMultaRecorrer = parseInt(readline.question("ID da multa a recorrer: "));
                this.recorrermulta(idDaMultaRecorrer);
                this.menucondutor();
                break;
            case "6":
                this.intereditardados();
                this.menucondutor();
                break;
            case "7":
                this.logout();
                break;
        }

        console.log("Opção inválida. Tente novamente.");
        this.menucondutor();

    }

    menuagente(){
        console.log("||| MENU AGENTE DE TRÂNSITO:  |||");
        console.log(" [1] - Ver meus dados \n [2] - Ver condutores \n [3] - Ver veículos \n [4] - Ver multas \n [5] - Aplicar multa \n [6] - Alterar status de multa \n [7] - Buscar veículo por placa \n [8] - Alterar meus dados \n [9] - Logout");
        // Lê a escolha do usuário tira os espaços em branco desnecessários e executa a ação correspondente ou exibe uma mensagem de erro e reinicia o menu
        const escolha = readline.question("Opcao: ").trim();
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
                const idDaMulta = parseInt(readline.question("ID da multa: "));
                const novostatus = readline.question("Novo status (Pendente/Pago/Recorrida): ");
                this.statusmulta(idDaMulta, novostatus);
                this.menuagente();
                break;
            case "7":
                this.buscarplaca();
                this.menuagente();
                break;
            case "8":
                this.relatoriomultas();
                this.menuagente();
                break;
            case "9":
                this.intereditardados();
                this.menuagente();
                break;
            case "10":
                this.logout();
                break;
        }

        console.log("Opção inválida. Tente novamente.");
        this.menuagente();

    }

    intereditardados(){
        console.log("-------------------------------------------------");
        console.log("Editar Dados do Usuário:");
        const novonome = readline.question("Novo nome (pressione Enter sem digitar nada para manter o atual): ");
        const novocpf = readline.question("Novo CPF (pressione Enter sem digitar nada para manter o atual): ").trim();
        const novoemail = readline.question("Novo email (pressione Enter sem digitar nada para manter o atual): ").trim();
        if (this.usuariologado instanceof Condutor){
            const infoAdicional = readline.question("Nova data de nascimento(dd/mm/aaaa) (pressione Enter sem digitar nada para manter a atual): ").trim();
        }else if (this.usuariologado instanceof AgenteDeTransito){
            const infoAdicional = readline.question("Nova matrícula (pressione Enter sem digitar nada para manter a atual): ").trim();
        }
        let novasenha = null;
        let senhaantiga = null;
        const alterarSenha = readline.question("Deseja alterar a senha? (s/n): ").toLowerCase();

        if(alterarSenha === "s"){
            senhaantiga = readline.question("Senha antiga: ");
            novasenha = readline.question("Nova senha: ");
            // fazendo a validação da senha antiga
            while (this.usuariologado.autenticar(senhaantiga) === false) {
                console.log("Senha antiga incorreta. Tente novamente ou pressione Enter sem digitar nada para cancelar a alteração de senha.");
                senhaantiga = readline.question("Senha antiga: ");
                novasenha = readline.question("Nova senha: ");
            }
        }
        this.editardados(
            //usando o operador ternário para passar null se o campo for deixado em branco
            novonome === '' ? null : novonome,
            novocpf === '' ? null : novocpf,
            novoemail === '' ? null : novoemail,
            senhaantiga,
            novasenha
        );
        senhaantiga = null;
        novasenha = null;
    }

}
const sistema = new Sistema();

// --- ÁREA DE DADOS DE TESTE E DEBUG ---
// Como agora as listas são propriedades privadas do sistema (_condutores), 
// para popular os dados iniciais, seria ideal ter métodos no Sistema tipo "addCondutor", 
// mas para manter seu código funcionando rápido, vamos acessar direto ou usar o método cadastro

sistema._condutores.push(new Condutor("João Silva", "123.456.789-00", "joao.silva@email.com", "senha123", "01/01/1990"));
sistema._agentes.push(new AgenteDeTransito("Maria Souza", "987.654.321-00", "maria.souza@email.com", "senha456", "12345"));
sistema._veiculos.push(new Veiculo("ABC-1234", "Modelo X", "Marca Y", "Vermelho"));
sistema._agentes.push(new AgenteDeTransito("Carlos Pereira", "456.789.123-00", "carlos.pereira@email.com", "senha789", "54321"));
sistema._condutores.push(new Condutor("Ana Oliveira", "321.654.987-00", "ana.oliveira@email.com", "senha123", "01/01/1990"));
sistema._veiculos.push(new Veiculo("DEF-5678", "Modelo A", "Marca B", "Azul"));
sistema._condutores.push(new Condutor("Pedro Santos", "654.321.987-00", "pedro.santos@email.com", "senha123", "01/01/1990"));
sistema._multas.push(new Multa(1, "Excesso de velocidade", 150.00, "Pendente", '2026-01-20'));
sistema._multas.push(new Multa(2, "Estacionamento proibido", 100.00, "Pendente", '2026-01-27'));
sistema._multas.push(new Multa(3, "Estacionamento proibido", 400.00, "Pendente", '2025-12-29'));
sistema._multas.push(new Multa(3, "Estacionamento proibido", 400.00, "Pendente", '2025-12-29'));
sistema._multas.push(new Multa(3, "Estacionamento proibido", 700.00, "Pendente", '2025-11-17'));
sistema._multas.push(new Multa(3, "Estacionamento proibido", 1000.00, "Pendente", '2024-10-20'));

module.exports = sistema;