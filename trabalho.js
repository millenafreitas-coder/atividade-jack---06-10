import express from 'express';
import pool from './db.js';

 const app = express();
 app.use(express.json());

 // atv 1 - Puxar os chamados cadastrados no pg
 app.get('/chamados', async (req, res) => {
     try{
         const verChamados = await pool.query(
             'select * from chamados'
         )
         return res.status(200).json(verChamados.rows)
     }catch(err){
        console.log(err);
        return res.status(500).json(err)
     }
 });



 // atv 2 - 
 app.get('/chamados/:id', async (req, res) => {
     const{id} =  req.params

     try{
         const verChamados = await pool.query('select * from chamados where id = $1', [id])

     return res.status(200).json(verChamados.rows)
    }catch(err){
       console.log(err);
       return res.status(500).json(err)
    }
});

// atv 3 - POST 
app.post('/chamados', async (req, res) => {
    const { titulo, descricao, setor, prioridade, responsavel } = req.body
    try {
      const cadastrarChamados = await pool.query(
        'INSERT INTO chamados ( titulo, descricao, setor, prioridade, responsavel ) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [titulo, descricao, setor, prioridade, responsavel]
      )
      return res.status(201).json(cadastrarChamados.rows[0]);
    } catch (err) {
      console.log(err);
      
      return res.status(500).json({ erro: "Erro ao salvar" });
    }
  
  })   



// sempre no final 
app.listen(3000, () => console.log("http://localhost:3000"));

