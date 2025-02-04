import jsonServer from 'json-server';

const server = jsonServer.create();
const router = jsonServer.router('server/db.json');
const middlewares = jsonServer.defaults({noCors: false,});

server.use(middlewares);

// Middleware para buscar projetos por usuário
server.get('/projetos/buscar-por-usuario/:idUsuario', (req, res) => {
    const idUsuario = parseInt(req.params.idUsuario, 10);  // Certifique-se de que o idUsuario é um número
    const db = router.db; // Acesso ao banco de dados simulado

    const projetos = db.get('projetos')
        .filter(projeto =>
            projeto.participantes.some(participante => participante.id === idUsuario)
        )
        .value();

    console.log(projetos); // Para verificar o que está sendo retornado

    res.jsonp(projetos);
});


server.use(router);

server.listen(8080, () => {
    console.log(`JSON Server está rodando em http://localhost:8080`);
});
