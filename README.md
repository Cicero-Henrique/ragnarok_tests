# ragnarok_tests

Usando a API real
| ID | Title | Preconditions | Steps | Expected Results | Status |
| -- | ----- | ------------- | ----- | ---------------- | ------ |
| 01 | Verify Initial Items Load | User is on the homepage | 1. Open the URL: https://ragnarokwiki.com.br | 60 items should be loaded when the page finishes loading. | Pass |
| 02 | Load More Items on Scroll | User is on the homepage | 1. Scroll down the page until the last of the initial 60 items is visible | An additional 60 items should be loaded automatically. | Pass |
| 03 | Back to Top Button Functionality | User is on the homepage and scrolled down | 1. Scroll down the page \n 2. Click on the "Back to Top" button | The page should smoothly scroll back to the top. | Pass |
| 04 | Search using short text | User is on the homepage and make a search | User insert in maximum of two letters in the search bar e.g.: "sha"; Press enter; | A request should be made to the API; \n Just itens that cointains the inserted text should be available | Pass |
| 05 | Search using a longer text | User is on the homepage and make a search | User insert a complete word in the search bar e.g.: "shadow"; Press enter; | A request should be made to the API; \n Just itens that cointains the inserted text should be available | Pass |
| 06 | Clear the searchbar after a search | User is on the homepage and make a search | User clear the search bar; Press enter; | The initial itens should be visible | Pass |
| 07 | Search using special characters | User is on the homepage and make a search | User insert a text with special characters in the search bar e.g.: "aço"; Press enter; | A request should be made to the API; \n Just itens that cointains the inserted text should be available | Pass |

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
