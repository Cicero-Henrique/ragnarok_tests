# ragnarok_tests

Usando a API real
| ID | Title | Preconditions | Steps | Expected Results | Status |
| -- | ----- | ------------- | ----- | ---------------- | ------ |
| 01 | Verify Initial Items Load | User is on the homepage | 1. Open the URL: https://ragnarokwiki.com.br | 60 items should be loaded when the page finishes loading. | Pass |
| 02 | Load More Items on Scroll | User is on the homepage | 1. Scroll down the page until the last of the initial 60 items is visible | An additional 60 items should be loaded automatically. | Pass |
| 03 | Back to Top Button Functionality | User is on the homepage and scrolled down | 1. Scroll down the page \n 2. Click on the "Back to Top" button | The page should smoothly scroll back to the top. | Pass |


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