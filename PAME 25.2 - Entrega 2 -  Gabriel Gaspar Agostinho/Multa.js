class Multa {
    // incrementa ID automaticamente paralelamente ao ID das Pessoas
    static multaID = 1;
    // Construtor da classe Multa com data padrão como data atual
    constructor(idCliente, infracao, valor, status, data) {
        // Atribui um ID único à multa
        this.idMulta = Multa.multaID++;
        this.idCliente = idCliente;
        this.infracao = infracao;
        //usando ternairo para ver se a data foi passada
        this.data = data ? new Date(data) : new Date();
        this.valor = valor;
        this.status = status;
    }
}

module.exports = Multa;