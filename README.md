# 🚤 Poente Solares - Telemetria Dashboard

## 📖 Sobre o Projeto
Este é o painel de telemetria frontend desenvolvido para o **Barco Solar Poente**, do **Projeto Solares.**

O objetivo desta aplicação é fornecer uma interface visual de alto contraste e fácil leitura para o piloto e a equipe de engenharia durante competições (como o Desafio Solar Brasil). O sistema monitora variáveis críticas do barco em tempo real para auxiliar na tomada de decisão estratégica e gestão de energia.

### 🎯 Funcionalidades Atuais
* 📈 **Monitoramento de Aceleração:** Visualização gráfica da entrada de aceleração (0-10) para controle fino de consumo.
* 🔥 **Monitoramento Térmico (DHT11):** Acompanhamento da temperatura interna com alertas visuais automáticos de superaquecimento.
* 📡 **Status de Conexão:** Indicador visual "Online/Offline" com ping para validar a recepção de dados via telemetria.
* 🌙 **Interface Dark Mode:** Otimizada para redução de reflexos sob o sol forte e baixo consumo de energia em telas OLED.
  
### 🛠️ Tecnologias Utilizadas
O projeto foi construído com foco em performance e tipagem estática para maior segurança do código.
|Tecnologia|Descrição|
|------|-------|
| React |Biblioteca principal para construção da UI baseada em componentes.|
|TypeScript|Superset do JavaScript para tipagem segura e prevenção de erros em tempo de compilação.|
|Vite|Build tool de próxima geração, garantindo um servidor de desenvolvimento ultra-rápido.|
|Tailwind CSS|Framework utility-first para estilização rápida, responsiva e consistente.|
|Recharts|Biblioteca de composição de gráficos construída sobre componentes React e D3.|
|Lucide React|Conjunto de ícones leves, limpos e consistentes.|


### 🚀 Como Rodar o Projeto
**Pré-requisitos:** Você precisa ter o Node.js instalado na sua máquina (versão 18+ recomendada).

1. Clone o repositóriogit
   ```clone [https://github.com/SEU-USUARIO/telemetria-poente.git](https://github.com/SEU-USUARIO/telemetria-poente.git)```
3. Entre na pasta do projeto
   ```cd telemetria-poente```
5. Instale as dependências
   ```npm install```
7. Inicie o servidor de desenvolvimento
   ```npm run dev```
   
  💡 Dica: O terminal irá mostrar um link local, geralmente http://localhost:5173/. 
  Clique nele para abrir o dashboard.
  
## 📸 Estrutura do Dashboard
O painel é dividido em duas colunas principais para visualização rápida:

| Métrica| Descrição | Visualização|
|------|-------|---------|
|Aceleração|Leitura do potenciômetro do piloto.|Card com valor numérico grande + Gráfico de histórico (Cyan).|
|Temperatura|Dados do sensor DHT11.| Card com alerta de cor (Laranja/Vermelho) + Gráfico de variação.|


## 🤝 Contribuição
Este projeto faz parte do ecossistema do Projeto Solares. Sinta-se à vontade para abrir Issues ou enviar Pull Requests com melhorias na visualização de dados ou otimizações de performance.

1. Faça um Fork do projeto
2. Crie sua Feature Branch ```(git checkout -b feature/MinhaFeature)```
3. Commit suas mudanças ```(git commit -m 'Adiciona: MinhaFeature')```
4. Push para a Branch ```(git push origin feature/MinhaFeature)```
5. Abra um Pull Request

<hr>

<div align="center"><p>Desenvolvido com 💙 e ☀️ pela equipe de Trainees: <br><br> Augusto Lopes Zanoteli <br> Fernanda Coutinho Correa Calazans <br> <br> UFES <br> 2025 <br></p></div>
