#!/bin/bash

VERDE='\033[1;32m'
AMARELO='\033[1;33m'
RESET='\033[0m'

clear
echo -n "Qual IP você quer testar? "
read ip

cont=0
encontrou=0

echo -e "${AMARELO}Iniciando varredura de portas (22 a 2299)...${RESET}"

for ((porta=22; porta<=2299; porta++)); do
    ((cont++))
    # O \r faz o texto sobrescrever a mesma linha sem piscar a tela
    echo -ne "Portas testadas: $cont (Atual: $porta) \r"

    if nc -zv -w 1 $ip $porta &>/dev/null; then
        echo -e "\n${VERDE}[+] Porta encontrada: $porta - Status: ABERTA${RESET}"
        encontrou=1
        # break
    fi
done

if [ $encontrou -eq 0 ]; then
    echo -e "\nNenhuma porta aberta encontrada entre 22 e 2299."
fi
