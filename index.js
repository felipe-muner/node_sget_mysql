var scanf = require('scanf');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'your_user',
  password : 'your_password',
  database : 'your_db',
  multipleStatements: true
});


function dashedLine(){
  return console.log('================================');
};

function mostrarMenu(){
  dashedLine();
  console.log('Digite a opção desejada');
  dashedLine();
    console.log('1 - Inserir');
    console.log('2 - Selecionar');
    console.log('3 - Atualizar');
    console.log('4 - Deletar');
    console.log('5 - Sair do Sistema');
  dashedLine();
  dashedLine();
    var opcao = scanf('%d');

    switch(opcao) {
      case 1:
          inserir();
          break;
      case 2:
          selecionar();
          break;
      case 3:
          atualizar();
          break;
      case 4:
          deletar();
          break;
      case 5:
          console.log('Desconectou');
          if(connection) connection.end();
          break;
      default:
          console.log('Faça o favor de digitar uma opção correta.');
          mostrarMenu();
    }
}
mostrarMenu();

function populaPessoa(){
  console.log('Para inserir na tabela digite');
  console.log('Nome:');
  var nome = scanf('%s');
  console.log('Idade:');
  var idade = scanf('%d');

  var pessoa = {
    nome:nome,
    idade:idade
  }

  return pessoa;
}

function inserir(){

  var ppl = populaPessoa();

  connection.query('INSERT INTO node_crud_first_step SET ?', ppl, function(err, result) {
    if (err) throw err;
    console.log('');
    dashedLine();
    console.log('Inserido no sistema com sucesso!');
    console.log('Nome: ' + ppl.nome);
    console.log('Idade: ' + ppl.idade);
    dashedLine();
    console.log('');

    mostrarMenu();

  });

}

function selecionar(){
  dashedLine();
  console.log('Todas as linhas');
  console.log('ID  |        NOME        |        IDADE        ');
  dashedLine();
  connection.query('SELECT * FROM node_crud_first_step', function(err, rows, fields) {
    if (err) throw err;
    console.log(rows);
    mostrarMenu();
  });
}

function atualizar(){

  //populaAtualizaPessoa();
  dashedLine();
  connection.query('SELECT * FROM node_crud_first_step', function(err, rows, fields) {
    if (err) throw err;
    console.log(rows);
    console.log('ID para alterar:');
    var id = scanf('%d');
    console.log('ID selecionado para atualização: #' + id);
    dashedLine();
    console.log('Novo nome: ');
    var novonome = scanf('%s');
    console.log('Nova idade: ');
    var novaidade = scanf('%d');

    var novaPessoa = {
      id:id,
      nome:novonome,
      idade:novaidade
    };

    //connection.query('UPDATE node_crud_first_step SET nome = :nome, idade = :idade WHERE id = :id', novaPessoa);

    connection.query('UPDATE node_crud_first_step SET nome = ?, idade = ? WHERE id = ?', [novaPessoa.nome, novaPessoa.idade, novaPessoa.id], function(err, results) {

     console.log(results);
     console.log('---------------------');
     console.log('atualizado com sucesso.');
     console.log('ID: '+ novaPessoa.id );
     console.log(novaPessoa);
     console.log('---------------------');

     selecionar();

    });


  });

  // console.log(Math.random());
  // console.log('Update selecionado');
  // mostrarMenu();
}

function deletar(){
  //selecionar();

  // connection.query('SELECT * FROM node_crud_first_step', function(err, rows, fields) {
  //   if (err) throw err;
  //   console.log(rows);
  // });
  //console.log('_____________entrei no deletar de fato');
  // dashedLine();
  // console.log('Informe o ID para remover o usuário desejado:');
  var id = scanf('%d');
  // //

  console.log('id= ' + id);
  connection.query('DELETE FROM node_crud_first_step WHERE id = ?', [id], function(err, result) {
    if (err) throw err;
    console.log(result);
    mostrarMenu();
  // //
  // //   connection.query('SELECT * FROM node_crud_first_step', function(err, rows, fields) {
  // //     if (err) throw err;
  // //     for (var i = 0; i < rows.length; i++) {
  // //        console.log(rows[i].id + '      |' + rows[i].nome + '    |' + rows[i].idade);
  // //     }
  // //   });
  // mostrarMenu();
  });
  //soma();
}

//function soma(){console.log(10);}
