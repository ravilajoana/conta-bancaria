import { ContaRepository } from "../Repository/ContaRepository";
import { colors } from "../útil/Colors";
import { Conta } from "../útil/model/conta";

export class ContaController  implements ContaRepository{

    private ListaContas: Array<Conta> = new Array<Conta>();
    numero: number = 0;  

    listarTodas(): void {
        for (let conta of this.ListaContas) {
            conta.visualizar();
        };
    }
    procurarPorNumero(numero: number): void {
        let buscaConta = this.buscarNoArray(numero);

        if (buscaConta != null) {
            buscaConta.visualizar;
        }else
            console.log(colors.fg.red, "\nA Conta numero: " + numero
                         + " não foi encontrada!", colors.reset);
    }
    cadastrar(conta: Conta): void {
        this.ListaContas.push(conta);
        console.log(colors.fg.green, "\nA Conta número: " + conta.numero + 
                    " foi criada com sucessso!", colors.reset);
    }
    atualizar(conta: Conta): void {
        let buscaConta = this.buscarNoArray(conta.numero);

        if (buscaConta != null) {
            this.ListaContas[this.ListaContas.indexOf(buscaConta)] = conta;
            console.log(colors.fg.green, "\nAConta numero: " + conta.numero + 
                         "foi atualizada com sucesso!", colors.reset);
            } else 
                console.log(colors.fg.red, "\nA Conta numero: " + conta.numero +
                             " não foi encontrada!", colors.reset);
    }
    deletar(numero: number): void {
        let buscaConta = this.buscarNoArray(numero)

        if (buscaConta != null) {
            this.ListaContas.splice(this.ListaContas.indexOf(buscaConta), 1)
            console.log(colors.fg.red,"\nA Conta numero: " + numero + 
                        "foi apagada com sucesso!", colors.reset);
        }else 
        console.log(colors.fg.red,"\nA Conta numero: " + numero + 
                    " não foi encontrada!", colors.reset);
    }
    sacar(numero: number, valor: number): void {
        let Conta = this.buscarNoArray(numero); 

        if(Conta != null) {

        if(Conta.sacar(valor) == true)
            console.log(colors.fg.red + "\nO saque na conta numero:" + numero +
              " foi efetuado com sucesso!" + colors.reset);

        }else
          console.log(colors.fg.red + "\nA Conta numero: " + numero +
            " não foi encontrada!" + colors.reset)
    }
    depositar(numero: number, valor: number): void {
        let conta = this.buscarNoArray(numero);

        if (conta != null) {
            conta.depositar(valor);
            console.log(colors.fg.red,"\nO depósito na conta numero: " + numero +
                        " foi efetuado com sucesso!", colors.reset);

        }else 
            console.log(colors.fg.red, "\nA Conta numero: " + numero +
                         " não foi encontrada!", colors.reset);
    }
    transferir(numeroOrigem: number, numeroDestino: number, valor: number): void {
        let contaOrigem = this.buscarNoArray(numeroOrigem);
        let contaDestino = this.buscarNoArray(numeroDestino);

        if (contaOrigem != null && contaDestino != null) {
            if(contaOrigem.sacar(valor) == true){
                contaDestino.depositar(valor);
                console.log(colors.fg.red,"\nA Transferencia da conta numero: " + numeroOrigem +
                            " para a conta numero: " + numeroDestino + "foi efetuada com sucesso!",
                             colors.reset);
            }
            
        }else
        console.log(colors.fg.red,"\nA Conta numero: " + numeroOrigem +
                     " e/ou a conta numero: " + numeroDestino + " não foram encontradas!",
                     colors.reset);
        }
    public gerarNumero(): number {
        return ++this.numero
    }
    /*checa se uma Conta existe*/
    public buscarNoArray(numero: number): Conta | null {

        for (let conta of this.ListaContas) {
            if (conta.numero === numero)
                return conta;
        }
        return null;
    }

}
