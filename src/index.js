const { json, request, response } = require('express')

const express = require ('express')

const uuid= require ('uuid')

const app = express()

app.use(express.json())
let funcionarios=[
    {
        id:uuid.v4(),nome:'joao',email:'jpca@hotmail',funcao:'ti',telefone:'1378236',departamento:'tecnico'
    
    },
    {
        id:uuid.v4(),nome:'adriano',email:'adr@hotmail',funcao:'seguranca',telefone:'183763',departamento:'suporte'
    }

]

console.log(funcionarios)


const verificacampos =(request, response, next) =>{
    const{nome,funcao,departamento,  email, telefone}= request.body
    if(!nome ||  !funcao || !departamento ||  !email ||  !telefone){
        return response
        .status(400)
        .json({ Error: 'espaço em branco verificar'})
    }
        return next()

}
const checkId=(request, response,next)=>{
    const{id}= request.params
    const anexarid = funcionarios.find(funcionario => funcionario.id=== id)
    if(!anexarid){
        return response
        .status(400)
        .json({Erro:'O Id é inexistente'})
    }
    
    return next()

}

app.get('/funcionarios', (request, response) =>{
    return response
    .status(200)
    .json(funcionarios)
})


app.get('/funcionarios/:id',checkId, (request, response)=>{
    
    const{id}= request.params
    
    const requisicao= funcionarios.filter(func=> func.id==id)
    
    return response
    
    .status(200)
    
    .json(requisicao)
})

app.post('/funcionarios', verificacampos,(request,response)=>{
       
    const{nome,email,funcao,departamento,telefone}=request.body
      
    const novosfuncionarios={
          
        id:uuid.v4(),
           nome,
           email,
           funcao,
           departamento,
           telefone
       }
       funcionarios=[...funcionarios,novosfuncionarios]
       return response
       .status(200)
       .json(novosfuncionarios)
   })


app.delete('/funcionarios/:id',checkId, (request, response) =>{
    
    const {id}= request.params
    
    const indice = funcionarios.findIndex(funcionarios => funcionarios.id==id)
    
    console.log(indice)
    
    console.log(funcionarios[indice])
    
    funcionarios.splice(indice, 1)
    
    return response
    
    .status(200)
    
    .json({massage: 'Voi excluido com sucesso !!!!'})

})


app.put('/funcionarios/:id',verificacampos,checkId, (request, response)=>{
    
    const{nome, funcao, departamento, email, telefone}=request.body
    
    const{id}=request.params
    
    let indice= funcionarios.findIndex(funcionarios =>funcionarios.id==id)
    
    const dadosfuncionarios={
        id,
        nome,
        funcao,
        departamento,
        email,
        telefone,
    }
    
    funcionarios.splice(indice, 1, dadosfuncionarios)
    
    return response
    
    .status(200)
    
    .json(dadosfuncionarios)
})
   



app.listen(3333,  () => {
    console.log ('servidor rodando!!')
})