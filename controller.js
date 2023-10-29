// const { resolve } = require('path');
// const { resolve } = require('path');
const { resolve } = require('path');
let data=require('./data');
// const { rejects } = require('assert');

class Controller{
   async getTodos(){
    return new Promise((resolve,_)=>resolve(data));
   }
   async getTodo(id){
    return new Promise((resolve,reject)=>{
        let todo=data.find((todo)=>todo.id===parseInt(id));
        if(todo){
             resolve(todo);
        }else{
            reject(`Todo not found`);
        }
    })
   }
   async deleteTodo(id){
    return new Promise((resolve,reject)=>{
        let deletingId=data.find((todo,todoid)=>{
            if(todo.id===id){
                return todoid;
            }
        });
        data.splice(deletingId,1);
        // console.log(deletingId);
        if(data){
            resolve(data);
        }else{
            reject('error id');
        }
    })
   }
   async createTodo(toDo){
    return new Promise((resolve,_)=>{
      let newTodo={
        id:data.length+1,
        ...toDo
      }
      data.push(newTodo);
    //   console.log(data);
      resolve(data);
    })
   }
   async updateTodo(toDo){
    // console.log(toDo);
    return new Promise((resolve,reject)=>{
        let updateId=toDo.id-1; 
       /*  data.find((todo,id)=>{
            if(todo.id===toDo.id){
              console.log(id);
                return id;
            }
        }); */
        // console.log(updateId);
      let updatedTodo={
        ...toDo
      };
      data[updateId]=updatedTodo;
      resolve(data);
      reject(error);
    })
   }

}

module.exports=Controller