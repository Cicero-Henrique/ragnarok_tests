# ragnarok_tests

Usando a API real
| ID | Title | Steps | Expected Results | Status |
| -------- | ------- | -------- | ------- | -------- |
| 01 | Amount of items when page load is finished | User should open the url: https://ragnarok.com.br | When the page is loaded, should be loaded 60 items | Pass   |
* Ao carregar a página, verificar se a quantidade x de itens é carregada
* Ao descer, verificar se mais itens são carregados
* Descer, verificar se o botão de voltar ao topo está visível, se sim, clicar e verificar se volta ao topo
    Contexto de busca
    * Inserir poucas letras na barra de pesquisa, usar a chamada para a API como tempo de espera e verificar a quantidade de itens
    * Inserir mais letras na barra de pesquisa e verificar a quantidade de itens
    * Remover o texto e verificar se contém os mesmos itens de quando a página é aberta pela primeira vez
    * Busca com caracteres especiais

    Contexto de filtro
    * Clicar no busca avançada e verificar se as opções aparecem
    * Clicar novamente e verificar se escondem
    * Filtrar por um item da primeira linha
    * Filtrar por dois itens da primeira linha
    * Filtrar por um item da primeira e um da segunda (dragão fantasma só tem um)
    * Filtrar por dois itens da primeira e da segunda linha
    * Filtrar por itens da primeira e segunda linha inserindo um texto

* Mockar os testes de busca
  
* Executar os testes em diferentes navegadores
* Executar testes em telas menores
* Validar tempo de carregamento das páginas

| Month    | Savings |
| -------- | ------- |
| January  | $250    |
| February | $80     |
| March    | $420    |