import  { createStore } from 'redux';

const add = document.getElementById('add');
const minus = document.getElementById('minus');
const number = document.querySelector('span');
number.innerText = 0;

const ADD = "ADD";
const MINUS = "MINUS";
//function to modify data stored in countStore
const countModifier = (count = 0, action) => {
    switch (action.type) {
        case "ADD":
            return count + 1;
        case "MINUS":
            return count - 1;
        default:
            return count;
    }

}; 
const countStore = createStore(countModifier);

const onChange = () => {
    number.innerText = countStore.getState();
    
}
countStore.subscribe(onChange);
console.log(countStore.getState());

add.addEventListener('click', () => countStore.dispatch({ type: ADD })); 
minus.addEventListener('click', () => countStore.dispatch({ type: MINUS }));
number.innerText = countStore.getState();

/////////////////////

const formEl = document.querySelector('form');
const inputEl = document.querySelector('input')
const ulEl = document.querySelector('ul');

const ADD_TO_DO = "ADD_TO_DO";
const DELETE_TO_DO = "DELETE_TO_DO";

const addToDo = (text) => {
    return {
        type: ADD_TO_DO,
        text
    }
}

const deleteToDo = (id) => {
    return {
        type: DELETE_TO_DO,
        id
    }
}

const reducer = (state = [], action ) => {
    console.log(action);
    
    switch(action.type){
        case ADD_TO_DO:
            return [{ text: action.text, id: Date.now() }, ...state ];
        case DELETE_TO_DO:
            return state.filter(toDo => toDo.id !== action.id);
        default:
            return state;
    }
}

const paintToDO = () =>{
    const toDos = store.getState();
    ulEl.innerHTML = "";
    toDos.forEach(toDo => {
        const li = document.createElement('li');
        const btn = document.createElement('button');
        li.id = toDo.id;
        li.innerText = toDo.text;
        btn.innerText = "Delete";
        btn.addEventListener('click', dispatchDeleteToDo);
        li.appendChild(btn);
        ulEl.appendChild(li);
    })
}

const dispatchAddToDo = (text) => {
    store.dispatch(addToDo(text))
}

const dispatchDeleteToDo = (e) => {
    const id = parseInt(e.target.parentNode.id);
    store.dispatch(deleteToDo(id));
}

const onSubmit = (e) => {
    e.preventDefault();
    console.log('submited');
    
    const toDo = inputEl.value;
    inputEl.value = '';
    dispatchAddToDo(toDo);
}
const store = createStore(reducer);
store.subscribe(paintToDO);

store.subscribe(() => console.log(store.getState()));


formEl.addEventListener('submit', onSubmit);
