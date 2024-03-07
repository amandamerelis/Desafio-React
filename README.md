# Desafio React
Desafio de contratação Kev. Realize um fork deste repositório e faça as etapas referentes a sua vaga. O intuito desse teste é ser algo simples, porém suficiente para validar a qualidade do seu código.

## Requisitos Técnicas
- [ ] Utilizar React ou NextJs
- [ ] Utilizar Typescript
- [ ] Usar Hooks
- [ ] É permitido a utilização de pacotes de UI


## Website de produtos

O candidato deverá criar um site simples interno para uma loja, no qual será possível criar, visualizar, editar e apagar produtos da loja. O sistema da loja está implementado em uma API, a qual deverá ser utilizada para fazer as chamadas. **Faça tratamento de erro para as chamadas**

### API

URL: https://6288144910e93797c1564f40.mockapi.io/api/v1/

#### Endpoints

``GET /api/v1/product``
Retorna todos os produtos em lista

``GET /api/v1/product/:productId``
Retorna apenas o produto do productId

``POST /api/v1/product``
Cria um produto

``PATCH /api/v1/product/:productId``
Edita o produto do productId

``DELETE /api/v1/product/:productId``
apaga o produto do productId

Exemplo de produtos:
```
[
 {
  "createdAt": "2022-05-20T00:31:08.822Z",
  "name": "Incredible Plastic Pants",
  "price": "827.00",
  "brand": "Hauck - Johnson",
  "image": "http://loremflickr.com/640/480/fashion",
  "id": "1"
 },
 {
  "createdAt": "2022-05-20T09:05:23.745Z",
  "name": "Electronic Wooden Tuna",
  "price": "765.00",
  "brand": "Johns - Farrell",
  "image": "http://loremflickr.com/640/480/food",
  "id": "2"
 },
 {
  "createdAt": "2022-05-20T02:07:28.065Z",
  "name": "Awesome Steel Mouse",
  "price": "143.00",
  "brand": "Paucek, Kuvalis and Zieme",
  "image": "http://loremflickr.com/640/480/technics",
  "id": "3"
 },
 ]
```


### Design das tela

Nesse site haverá apenas uma tela e dois modais. O candidato pode colocar adições como alerts, toasts, confirmações ou qualquer componente que agregue mais ao projeto.

- A tela principal mostra todos os produtos
- Ao clicar em Remover, o produto é excluído
- Ao clicar em Adicionar Produto, a modal de criar produto abre
- Ao clicar em Editar, a modal de editar aquele produto abre

Figma: https://www.figma.com/file/a9OZFq285PTtyonYF7pGM8/Desafio-Kev?type=design&node-id=0%3A1&mode=design&t=yLmpubJXtE4CukST-1

<img width="600" alt="image" src="https://user-images.githubusercontent.com/830261/172520280-21c055e8-592e-47f3-a83b-3c55c1634fda.png">
<img width="600" alt="image" src="https://user-images.githubusercontent.com/830261/172520334-4d797c81-c384-4f6c-a039-d5ed7a6e97c0.png">
<img width="600" alt="image" src="https://user-images.githubusercontent.com/830261/172520396-c13bbe89-4c67-4127-8e93-c242182f3bea.png">


#### ``Importante``: É necessário fazer os valores dos styles baseados nos valores do Figma, além de responsivos. Também é importante componentizar e fazer um código legível.

## Pontos Extras
Esses pontos não são obrigatórios, mas agregariam muito ao projeto

- [ ] Utilizar Redux ou outra lib de State Management
- [ ] Toasts de sucesso e erro
- [ ] Responsividade funcionando em Mobile
- [ ] Deploy em alguma plataforma, como Netlify
