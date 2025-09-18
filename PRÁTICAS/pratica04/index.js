const express = require('express');

const app = express();

app.use((req, res, next) => {
    const dataHora = new Date().toLocaleString();
    console.log(`[${dataHora}] ${req.method} ${req.url}`);
    next();
});

app.use(express.json());


let tarefas = [  
  { id: 1, nome: "Estudar middleware", concluida: false },  
  { id: 2, nome: "Praticar Express", concluida: true }  
];


const router = express.Router();


router.get('/', (req, res) => {
    res.json(tarefas);
});


router.post('/', (req, res) => {
    const novaTarefa = {
        id: tarefas.length > 0 ? tarefas[tarefas.length - 1].id + 1 : 1,
        nome: req.body.nome,
        concluida: req.body.concluida ?? false
    };
    tarefas.push(novaTarefa);
    res.status(201).json(novaTarefa);
});


router.get('/:tarefaId', (req, res, next) => {
    const tarefaId = parseInt(req.params.tarefaId);
    const tarefa = tarefas.find(t => t.id === tarefaId);

    if (!tarefa) {
        
        return next(new Error("Tarefa não localizada"));
    }

    res.json(tarefa);
});


router.put('/:tarefaId', (req, res, next) => {
    const tarefaId = parseInt(req.params.tarefaId);
    const index = tarefas.findIndex(t => t.id === tarefaId);

    if (index === -1) {
        return next(new Error("Tarefa não localizada"));
    }

    tarefas[index] = {
        ...tarefas[index],
        nome: req.body.nome ?? tarefas[index].nome,
        concluida: req.body.concluida ?? tarefas[index].concluida
    };

    res.json(tarefas[index]);
});


router.delete('/:tarefaId', (req, res, next) => {
    const tarefaId = parseInt(req.params.tarefaId);
    const index = tarefas.findIndex(t => t.id === tarefaId);

    if (index === -1) {
        return next(new Error("Tarefa não localizada"));
    }

    tarefas.splice(index, 1);
    res.status(204).send();
});


app.use('/tarefas', router);


app.get('/', (req, res) => {
    res.send('🚀 API de Tarefas funcionando!');
});

app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(400).json({ erro: err.message });
});

app.listen(3000, () =>{
    console.log("App está on!");
})

module.exports = app;