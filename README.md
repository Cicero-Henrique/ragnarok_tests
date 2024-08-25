# Ragnarok Wiki - Test execution plan

| ID | Title | Preconditions | Steps | Expected Results | Status |
| -- | ----- | ------------- | ----- | ---------------- | ------ |
| 01 | Verify Initial Items Load | User is on the homepage | 1. Open the URL: <https://ragnarokwiki.com.br> | 60 items should be loaded when the page finishes loading. | Pass |
| 02 | Load More Items on Scroll | User is on the homepage | 1. Scroll down the page until the last of the initial 60 items is visible | An additional 60 items should load automatically. | Pass |
| 03 | Back to Top Button Functionality | User is on the homepage and scrolled down | 1. Scroll down the page <br/> 2. Click on the "Back to Top" button | The page should smoothly scroll back to the top. | Pass |
| 04 | Search Using Short Text | User is on the homepage and ready to perform a search | 1. Enter up to two characters in the search bar, e.g., "sha" <br/> 2. Press enter | A request should be made to the API. <br/> Only items containing the entered text should be displayed. | Pass |
| 05 | Search Using Longer Text | User is on the homepage and ready to perform a search | 1. Enter a complete word in the search bar, e.g., "shadow" <br/> 2. Press enter | A request should be made to the API. <br/> Only items containing the entered text should be displayed. | Pass |
| 06 | Clear Search Bar After Search | User is on the homepage and has performed a search | 1. Clear the search bar <br/> 2. Press enter | The initial set of items should be visible. | Pass |
| 07 | Search Using Special Characters | User is on the homepage and ready to perform a search | 1. Enter text with special characters in the search bar, e.g., "aço" <br/> 2. Press enter | A request should be made to the API. <br/> Only items containing the entered text should be displayed. | Pass |
| 08 | Show Advanced Search Bar | User is on the homepage | 1. Click on the "Advanced Search" button | The advanced search options should be visible in two rows. | Pass |
| 09 | Hide Advanced Search Bar | Advanced search bar is visible | 1. Click on the "Advanced Search" button again | The advanced search options should be hidden. | Pass |
| 10 | Filter by Race | Advanced search bar is visible | 1. Select a race from the advanced search options | All visible items should belong to the selected race. | Pass |
| 11 | Filter by Two Races | Advanced search bar is visible | 1. Select two races from the advanced search options | All visible items should belong to the selected races. | Pass |
| 12 | Filter by Property | Advanced search bar is visible | 1. Select a property from the advanced search options | All visible items should belong to the selected property. | Pass |
| 13 | Filter by Race and Property | Advanced search bar is visible | 1. Select a race and a property from the advanced search options | All visible items should belong to the selected race and property. | Pass |
| 14 | Filter by Two Races and Two Properties | Advanced search bar is visible | 1. Select two races and two properties from the advanced search options | All visible items should belong to the selected races and properties. | Pass |
| 15 | Filter by Races, Properties, and Text | Advanced search bar is visible | 1. Select two races and two properties <br/> 2. Enter text in the search bar | All visible items should belong to the selected races and properties, and their names should contain the entered text. | Pass |
| 16 | Mocking a Filter by Race | Mocks are set up correctly | 1. Select a race from the advanced search options <br/> 2. Intercept the request and trigger the mock | The items corresponding to the mocked response should be displayed. | Pass |
| 17 | Mocking a Filter by Two Races | Mocks are set up correctly | 1. Select two races from the advanced search options <br/> 2. Intercept the request and trigger the mock | The items corresponding to the mocked response for both races should be displayed. | Pass |
| 18 | Mocking a Filter by Property | Mocks are set up correctly | 1. Select a property from the advanced search options <br/> 2. Intercept the request and trigger the mock | The items corresponding to the mocked response should be displayed. | Pass |
| 19 | Mocking a Filter by Race and Property | Mocks are set up correctly | 1. Select a race and a property from the advanced search options <br/> 2. Intercept the request and trigger the mock | The items corresponding to the mocked response for the selected race and property should be displayed. | Pass |
| 20 | Mocking a Filter by Two Races and Two Properties | Mocks are set up correctly | 1. Select two races and two properties from the advanced search options <br/> 2. Intercept the request and trigger the mock | The items corresponding to the mocked response for the selected races and properties should be displayed. | Pass |
| 21 | Mocking a Filter by Races, Properties, and Text | Mocks are set up correctly | 1. Select two races and two properties <br/> 2. Enter text in the search bar <br/> 3. Intercept the request and trigger the mock | The items corresponding to the mocked response, filtered by the races, properties, and text, should be displayed. | Pass |

* Executar os testes em diferentes navegadores
* Executar testes em telas menores
