const {createApp} = Vue;

createApp({
    data () {
        return {
            display: "0",
            numeroAnterior: null,
            operador: null,
            resetarDisplay: false
        }
    } ,
    methods: {
        lidarBotao(valor) {
            switch (valor)
            {
                case '*':
                case '/':
                case '-':
                case '+':
                    this.lidarOperador(valor);
                    break;

                case '.':
                    this.lidarDecimal();
                    break;
                
                case 'C':
                    this.lidarLimpar();
                    break;

                case '=':
                    this.lidarIgual();
                    break;

                default: 
                this.lidarNumero(valor);
            }
        },
        lidarOperador(valor) {
            if (this.numeroAnterior == null) {
                this.numeroAnterior = this.display;
            } else if (this.operador) {
                const resultadoAtual = this.calcular();
                this.display = String(resultadoAtual);
                this.numeroAnterior = this.display;
            }
            this.operador = valor;
            this.resetarDisplay = true;
        },
        lidarDecimal() {
           if (this.resetarDisplay) return;
           if (!this.display.includes('.')) {
            this.display += '.';
           }
        },
        lidarLimpar() {
            this.display = '0';
            this.numeroAnterior = null;
            this.operador = null;
            this.resetarDisplay = false;
        },
        lidarIgual () {
            if (this.operador !== null && this.numeroAnterior !== null) {
                this.display = String(this.calcular());;
                this.numeroAnterior = null;
                this.operador = null;
                this.resetarDisplay = true;
            }
        },
        lidarNumero(valor) {
             if (this.display === '0' || this.resetarDisplay) {
                this.display = valor;
                this.resetarDisplay = false;
             } else {
                this.display += valor;
             }
        },
        calcular() {
            let resultado;
            const numeroAnterior = parseFloat(this.numeroAnterior);
            const numeroAtual = parseFloat(this.display);

            switch (this.operador) {
                case '+':
                    resultado = numeroAnterior + numeroAtual;
                    break;
                case '-':
                    resultado = numeroAnterior - numeroAtual;
                    break;
                case '*':
                    resultado = numeroAnterior * numeroAtual;
                    break;
                case '/':
                    resultado = numeroAnterior / numeroAtual;
                    break;
                default:
                    return;
            }
            return resultado
        }
    }
    
}).mount("#app");