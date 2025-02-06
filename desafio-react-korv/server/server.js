import jsonServer from 'json-server';

const server = jsonServer.create();
const router = jsonServer.router('server/db.json');
const middlewares = jsonServer.defaults({noCors: false,});

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Middleware para buscar projetos por usuário
server.get('/projetos/buscar-por-usuario/:idUsuario', (req, res) => {
    const idUsuario = parseInt(req.params.idUsuario, 10);  // Certifique-se de que o idUsuario é um número
    const db = router.db; // Acesso ao banco de dados simulado

    const projetos = db.get('projetos')
        .filter(projeto =>
            (projeto.participantes && projeto.participantes.some(participante => participante.id === idUsuario)) ||
            projeto.criador.id === idUsuario
        )
        .value();

    res.jsonp(projetos);
});

// Middleware para buscar tarefas por projeto
server.get('/tarefas/buscar-por-projeto/:idProjeto', (req, res) => {
    const idProjeto = parseInt(req.params.idProjeto, 10);
    const db = router.db;

    const tarefas = db.get('tarefas').filter(tarefa => tarefa.projetoId === idProjeto).value();

    res.jsonp(tarefas);
});

// Middleware para usuario acessar o sistema
server.post('/usuarios/login', (req, res) => {
    const { login, senha } = req.body;

    if (!login || !senha) {
        return res.status(400).jsonp({
            error: 'Login e senha são obrigatórios'
        });
    }

    const db = router.db;
    const usuario = db.get('usuarios')
        .find({ login, senha })
        .value();

    if (!usuario) {
        return res.status(401).jsonp({
            error: 'Credenciais inválidas'
        });
    }

    res.jsonp(usuario);
});

server.use(router);

server.listen(8080, () => {
    console.log(`JSON Server está rodando em http://localhost:8080`);
});
