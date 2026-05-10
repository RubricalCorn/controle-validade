# Sistema de Controle de Validade de Produtos

Protótipo navegável desenvolvido para a Atividade Avaliativa 1.

## Objetivo

Demonstrar o fluxo principal de consulta de estoque e controle de validade de produtos em um ambiente de varejo online com operação via WhatsApp.

## Escopo do protótipo

O protótipo representa uma simulação funcional do módulo de consulta de estoque.

Foi implementada uma interface de navegação com menu principal e acesso ao módulo de consulta.

No módulo de consulta, o usuário pode:

- pesquisar produtos por nome ou lote
- visualizar validade
- visualizar quantidade disponível
- visualizar quantidade reservada
- visualizar classificação automática de validade
- cadastrar novos produtos para atualização imediata da listagem

## Regras de negócio

A classificação de validade ocorre automaticamente conforme a data informada:

- **Normal**: validade superior a 30 dias
- **Alerta**: validade em até 30 dias
- **Vencido**: validade inferior à data atual

## Tecnologias utilizadas

- HTML
- CSS
- JavaScript

## Acesso ao protótipo

Cole aqui a URL do GitHub Pages.

## Observação

Este protótipo tem como finalidade validar fluxo funcional, navegação e interface.

A implementação final do sistema permanece prevista em Python.