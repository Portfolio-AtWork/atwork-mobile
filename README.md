# AtWork-Mobile (React Native com Expo)

## Pré-requisitos

### Passo 1: Instalar o Node.js e o npm/yarn
- Acesse: https://nodejs.org
- Baixe o instalador para seu sistema operacional
- Para Yarn (opcional): npm install -g yarn

### Passo 2: Instalar o Expo CLI
npm install -g expo-cli
ou
yarn global add expo-cli

### Passo 3: Verificar instalações
node -v
npm -v
expo --version

## Configuração do Projeto

### Passo 1: Clonar repositório
git clone https://github.com/Portfolio-AtWork/atwork-mobile.git

### Passo 2: Acessar diretório
cd atwork-mobile

### Passo 3: Instalar dependências
npm install
ou
yarn install

### Passo 4: Configurar ambiente (opcional)
- Criar .env baseado no .env.example

## Execução

### Passo 1: Iniciar servidor
npm start
ou
yarn start

### Passo 2: Opções de execução
1. Expo Go (teste rápido):
   - Instale app Expo Go
   - Escaneie QR code

2. Emulador:
   - 'a' para Android
   - 'i' para iOS (macOS apenas)

3. Navegador:
   - 'w' para web

## Dicas
- iOS no Windows/Linux requer Mac ou MacInCloud
- Atualize Expo: npm install -g expo-cli@latest
- Limpar cache: expo r -c
