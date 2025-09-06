import readlinesync = require("readline-sync");
import { colors } from './Src/útil/Colors'; 
import { ContaCorrente } from './Src/útil/model/contacorrente';
import { ContaPoupanca } from './Src/útil/model/contapoupanca';
import {ContaController} from './Src/controller/ContaController';

export function main() { 

    // Instancia da classe ContaController
    let contas: ContaController = new ContaController();

    //variaveis auxiliares 
    let opcao, numero, agencia, tipo, saldo, limite, aniversario, valor, numeroDestino: number;
    let titular: string="";
    const tipoContas = ['Conta corrente', 'conta poupanca'];

     // Objeto da Classe ContaCorrente (Teste)
    const contacorrente: ContaCorrente = new ContaCorrente(2, 123, 1, "Mariana", 15000, 1000);
    contacorrente.visualizar();
    contacorrente.sacar(2000);
    contacorrente.visualizar();
    contacorrente.depositar(1000);
    contacorrente.visualizar();

    // Objeto da Classe ContaPoupanca (teste)
    const contapoupanca: ContaPoupanca = new ContaPoupanca(3, 123, 2, "Victor", 1000, 10);
    contapoupanca.visualizar();
    contapoupanca.sacar(200);
    contapoupanca.visualizar();
    contapoupanca.depositar(1000);
    contapoupanca.visualizar();

    while (true) {

         console.log(colors.bg.white, colors.fg.red,                   
                    "*****************************************************");
        console.log("                                                     ");
        console.log("                BANCO ORÁCULO FINANCEIRO             ");
        console.log("                                                     ");
        console.log("*****************************************************");
        console.log("                                                     ");
        console.log("            1 - Criar Conta                          ");
        console.log("            2 - Listar todas as Contas               ");
        console.log("            3 - Buscar Conta por Numero              ");
        console.log("            4 - Atualizar Dados da Conta             ");
        console.log("            5 - Apagar Conta                         ");
        console.log("            6 - Sacar                                ");
        console.log("            7 - Depositar                            ");
        console.log("            8 - Transferir valores entre Contas      ");
        console.log("            9 - Sair                                 ");
        console.log("                                                     ");
        console.log("*****************************************************");
        console.log("                                                     ", colors.reset);

        console.log("Entre com a opção desejada: ");
        opcao = readlinesync.questionInt("");

        if (opcao == 9) {
            console.log(colors.fg.redstrong, 
                "\nBanco Oráculo financeiro Onde a previsão se encontra com a prosperidade!")
            sobre();
            console.log(colors.reset, "");
            process.exit(0);
        }

        switch (opcao) {
            case 1:
                console.log(colors.fg.whitestrong, 
                    "\n\nCriar Conta\n\n", colors.reset);

                    console.log("Digite o Número da agência: ");
                    agencia = readlinesync.questionInt("");
                    
                    console.log("Digite o Número do titular da Conta: ");
                    titular = readlinesync.question("");

                    console.log("\nDigite o tipo da conta: ");
                    tipo = readlinesync.keyInSelect(tipoContas, "", {cancel: false}) + 1; 

                    console.log("\nDigite o Saldo da Conta (R$): ");
                    saldo = readlinesync.questionFloat("");

                    switch (tipo) {
                        case 1:
                            console.log("Digite o limite da conta (R$): ");
                            limite = readlinesync.questionFloat("");
                            contas.cadastrar(
                                new ContaCorrente(contas.gerarNumero(), agencia, tipo, titular,
                                 saldo, limite));
                                 break;
                                 case 2: 
                                 console.log("Digite o Dia do Aniversário da conta popança: ");
                                 aniversario = readlinesync.questionInt("");
                                 contas.cadastrar(new ContaPoupanca(contas.gerarNumero(), agencia,
                                 tipo, titular, saldo, aniversario));
                                 break; 
                    }
                keyPress()
                break;
            case 2:
                console.log(colors.fg.whitestrong, 
                    "\n\nListar todas as Contas\n\n", colors.reset);    
                    
                    contas.listarTodas();

                keyPress()
                break;
            case 3:
                console.log(colors.fg.whitestrong, 
                    "\n\nConsultar dados da Conta - por número\n\n", colors.reset);

                console.log("Digite o número da Conta: ");
                numero = readlinesync.questionInt("");
                contas.procurarPorNumero(numero);

                keyPress()
                break;
            case 4:
                console.log(colors.fg.whitestrong, 
                    "\n\nAtualizar dados da Conta\n\n", colors.reset); 

                console.log("Digite o número da conta: ");
                numero = readlinesync.questionInt("");

                let conta = contas.buscarNoArray(numero);

                if  (conta != null) {

                    console.log("Digite o Número da agência: ");
                    agencia = readlinesync.questionInt("");

                    tipo = conta.tipo; 

                    console.log("\nDigite o saldo da conta (R$): ");
                    saldo = readlinesync.questionFloat("");

                    switch (tipo) {
                        case 1: 
                        console.log("digite o limite da conta (R$): ");
                        limite = readlinesync.questionFloat("");
                        contas.atualizar(
                            new ContaCorrente(numero, agencia, tipo, titular, saldo, limite)); 
                            break;
                         case 2: console.log("Digite o dia do aniversario da conta poupanca:")
                                  aniversario = readlinesync.questionInt("");
                                  contas.atualizar(new ContaPoupanca(numero, agencia, tipo, titular, saldo, 
                                                    aniversario));
                                    break;
                    }
                 } else {
                    console.log(colors.fg.red, "nA Conta numero: " + numero +
                        "não foi encontrada!", colors.reset);
                    
                 }

                keyPress()
                break;
            case 5:
                console.log(colors.fg.whitestrong, 
                    "\n\nApagar uma Conta\n\n", colors.reset);

                console.log("Digite o número da Conta: ");
                numero = readlinesync.questionInt("");
                contas.deletar(numero);
                 
                keyPress()
                break;
            case 6:
                console.log(colors.fg.whitestrong, 
                    "\n\nSaque\n\n", colors.reset);

                    console.log("Digite o numero da conta: ");
                    numero = readlinesync.questionInt("");

                    console.log("Digite o valor do saque (R$) ");
                    valor = readlinesync.questionFloat("")

                    contas.sacar(numero, valor);

                keyPress()
                break;
            case 7:
                console.log(colors.fg.whitestrong, 
                    "\n\nDepósito\n\n", colors.reset);

                console.log ("Digite o número da conta: ");
                numero = readlinesync.questionInt("");

                console.log("\nDigite o valor do depósito (R$): ");
                valor = readlinesync.questionFloat("");

                contas.depositar(numero, valor);


                keyPress()
                break;
            case 8:
                console.log(colors.fg.whitestrong, 
                    "\n\nTransferência entre Contas\n\n", colors.reset);
                    
                    console.log("Digite o número da conta de origem: ");
                    numero = readlinesync.questionInt("");

                    console.log("Digite o número da conta Destino: ");
                    numeroDestino = readlinesync.questionInt("");

                    console.log("\nDigite o valor do deposito (R$): ");
                    valor = readlinesync.questionFloat("");
                    contas.transferir(numero, numeroDestino,valor);

                keyPress()
                break;
            default:
                console.log(colors.fg.whitestrong, 
                    "\nOpção Inválida!\n", colors.reset);

                keyPress()
                break;
        }
    }

}

/* Função com os dados da pessoa desenvolvedora */
function sobre(): void {
    console.log("\n*****************************************************");
    console.log("Projeto Desenvolvido por: Rávila joana");
    console.log("ravilajoanasousapereira@gmail.com")
    console.log("https://github.com/ravilajoana");
    console.log("*****************************************************");
}

function keyPress(): void {
    console.log(colors.reset, "");
    console.log("\nPressione enter para continuar...");
    readlinesync.prompt();
}

main();
