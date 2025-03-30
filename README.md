# Gestão de Contatos - Spring Boot 

# Resumo: A aplicação para gerenciamento de clientes e seus contatos, com API RESTful. 

<img src="![alt text](https://i.im.ge/2025/03/30/pwcct4.image.png)" alt="Texto alternativo">



## 🛠️ Tecnologias 
- JAVA 17 JDK 
- SPRING BOOT 3.2.X
- SPRING DATA JPA (HIBERNATE)
- MYSQL/MARIADB
- MAVEN
- JAVASCRIPT 
- HTML 
- CSS 

## 📂 Estrutura do Projeto 

gestao/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/comercio/
│   │   │       ├── controller/       # Endpoints REST
│   │   │       ├── model/            # Entidades (Cliente, Contato)
│   │   │       ├── repository/       # Repositórios JPA
│   │   │       ├── service/          # Lógica de negócio
│   │   │       └── Application.java  # Classe principal (executa o código)
│   │   └── resources/
│   │       ├── static/
│   │       │   ├── index.html        # Corpo da página
│   │       │   ├── script.js         # Conecta API com a página
│   │       │   └── style.css         # Folha de estilo
│   │       ├── application.properties # Conexão com banco de dados
│   │       └── database/
│   │           └── gestao_contatos   # Scripts de povoamento do BD
├── pom.xml                           # Configurações (Spring Boot, drivers do BD)
└── README.md                         # Guia de instalação e uso





## 📌 Endpoints

## ----- Clientes ----- 

- Listar todos os clientes 
## GET /api/clientes 

- Buscar cliente por ID 

## GET /api/clientes/{id} 

- Criar novo cliente 

## POST /api/clientes 

## Exemplo de corpo: 

{
  "nome": "João Silva",
  "cpf": "123.456.789-00",
  "dataNascimento": "1990-01-01",
  "endereco": "Rua Exemplo, 123"
} 

## ----- Contatos ----- 

- Listar contatos de um cliente 

## GET /api/contatos/cliente/{clienteId} 

- Adicionar contato a um cliente 

## POST /api/contatos 

## Exemplo de corpo: 

{
  "cliente": {
    "id": 1
  },
  "tipo": "EMAIL",
  "valor": "joao@exemplo.com",
  "observacao": "Contato principal"
} 




## 🛠️ Configuração do Banco de Dados 

## O arquivo .sql já foi criado, só startar a aplicação dentro do mesmo já contém o povoamento das tabelas. 

 O arquivo se encontra em gestao/ 
                             database/ 
                                 gestao_contatos.sql

- Criação das tabelas 

CREATE TABLE cliente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) UNIQUE,
    data_nascimento DATE,
    endereco VARCHAR(200)
);

CREATE TABLE contato (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    valor VARCHAR(100) NOT NULL,
    observacao VARCHAR(200),
    FOREIGN KEY (cliente_id) REFERENCES cliente(id) ON DELETE CASCADE
); 




## 🚀 Startar projeto (BD)

1. Inicie o Banco de Dados

2. Abra o XAMPP e inicie o serviço do MySQL (clique em "Start" no módulo MySQL)

3. Abra o HeidiSQL e conecte-se ao servidor local:

4. Host: localhost ou 127.0.0.1

5. Usuário: root (ou outro usuário configurado)

6. Senha: (deixe vazio se não tiver senha)

7. Porta: 3306 




## 🚀 Startar projeto (NETBEANS)

1. Abra a interface do NetBeans e selecione: 
 File > Open Project > Navegue até a pasta gestao 

2. Atualize as credencias do banco: 
 Abra o arquivo src/main/resources/application.properties e verifique: 

spring.datasource.url=jdbc:mysql://localhost:3306/gestao_contatos
spring.datasource.username=root  # (ou seu usuário)
spring.datasource.password=      # (sua senha, se tiver) 

3. Execute a Aplicação 

No NetBeans: 

1. Clique com botão direito no projeto > Clean and Build > Run (ou pressione F6)

2. Espere até aparecer no console: 
Started Application in X seconds (indicando que o Spring Boot iniciou). 




## 📌 Acesse a API 

1. Para conferir se a aplicação está rondando, entre no seu navegador e digite  http://localhost 




## 📝 Checklist de Implementação

1. CRUD completo para Clientes

2. CRUD completo para Contatos

3. Validação de dados de entrada

4. Documentação Swagger/OpenAPI

5. Tratamento de erros personalizado

6. Configuração de banco de dados

7. Dados iniciais para testes 




## 📧 Contato
 Para dúvidas ou sugestões, entre em contato:

 Email: dsandesteixeira54@gmail.com   

 Repositório: (https://github.com/Davizera231/Gestao.git)
