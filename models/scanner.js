import net from 'node:net';
import chalk from 'chalk';
import { printTitulo } from '../utils/ui.js'

function testarPorta(ip, porta, timeout = 500) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(timeout);

    socket.on('connect', () => {
      socket.destroy();
      resolve(true);
    });

    socket.on('timeout', () => {
      socket.destroy();
      resolve(false);
    });

    socket.on('error', () => {
      resolve(false);
    });

    socket.connect(porta, ip);
  });
}

export async function scan(rl) {

  let cont = 0;	
  let ip = await rl.question(chalk.cyan("Digite o Ip ou Host: "))
  if(!ip){
  	console.log(chalk.red("IP ou Host não definido!")); 
	return
  }
  
  let i_porta = await rl.question(chalk.cyan("\nDigite a  porta deseja iniciar? [22]: "))
  i_porta = i_porta ? parseInt(i_porta) : 22
  console.log(chalk.magenta("Porta inicial selecionada: "), chalk.white(i_porta))

  let f_porta = await rl.question(chalk.cyan("\nDigite a  porta deseja finalizar? [2299]: "))
  f_porta = f_porta ? parseInt(f_porta) : 2229
  console.log(chalk.magenta("Porta final  selecionada: "), chalk.white(i_porta), "\n")


  printTitulo("Iniciando rastreamento de portas")
  
  for (let porta = i_porta; porta <= f_porta; porta++) {
    cont++;
    process.stdout.write(`Portas testadas: ${cont} (Atual: ${porta})\r`);

    const aberta = await testarPorta(ip, porta);
    if (aberta) {
      console.log(chalk.green(`\n    [+] Porta encontrada: ${porta} - Status: ABERTA`));
    }
  }

  console.log(
  	chalk.green(`\n\n[✓]`),
  	chalk.white("Todas portas escaneadas com sucesso!")
  );
  return
}
