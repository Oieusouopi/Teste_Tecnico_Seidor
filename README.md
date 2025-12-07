# Teste Técnico - SEIDOR 

Qualquer duvida me contate por email responderei o mais rápido o possivel rafasc866@gmail.com

## Sobre

Esse repositório é um teste técnico de uma WebAPI para controlar automóvel e motoristas que utilizam essa rede de automóveis.

## Rodando o projeto

Este projeto pode ser rodado com docker ou sem docker (recomendo fortemente utilizar o docker por ser mais rapido e não ter que depender do versionamento do node da sua maquina)

## Docker vs Localmente


## Endpoints utilizados

## Endpoints da API


### Automóvel

| Método | Path | Descrição |
| :--- | :--- | :--- |
| **GET** | `/automovel/listar` | Retorna uma lista de todos os automóveis. |
| **GET** | `/automovel/{id}` | Retorna os detalhes de um automóvel específico. |
| **POST** | `/automovel/criar` | Cria um novo usuário. Requer um objeto `Automovel` no body. |
| **PUT** | `/automovel/atualizar/{placa}` | Atualiza todas as informações de um usuário existente. Requer um objeto `AutomovelAtualizarDTO` no body |
| **DELETE** | `/automovel/deletar/{placa}` | Remove um automóvel. |

### Exemplo de Uso (Criar Automóvel)

```bash
curl -X POST /automovel/criar \
     -H "Content-Type: application/json" \
     -d '{"marca": "Toyota", "cor": "azul"}'
```

### Motorista

### Automovel Utilizado

## Modelagem de dados

Esta foi a modelagem de dados feita de acordo com as exigências do teste técnico.

![Modelagem do projeto](./docs/image/modelagem.png)

## Arquitetura utilizada

## Técnologias e linguagem utilizadas:
    As técnologias utilizadas foram:
- TypeScript
- NodeJS (ExpressJS)
- Git
- Docker