import React from 'react';
import { Categories, IToDo, toDoState } from '../atoms';
import { useSetRecoilState } from 'recoil';

/* const food = ["pizza", "mango", "kimchi", "kimbab"] */
/* const front = ["pizza"]
const back = ["kimchi", "kimbab"]
const finalPart = [...front, "감", ...back] */

const ToDo = ({text, category, id}: IToDo) => {
    const setToDos = useSetRecoilState(toDoState)
    const onClick = (e:React.MouseEvent<HTMLButtonElement>) => {
        //console.log("i wanna go to", e.currentTarget.name)
        const {currentTarget: {name}} = e;
        setToDos(oldToDos => {
            const targetIndex = oldToDos.findIndex(toDo => toDo.id === id) //findIndex id가 같은지 찾아줌
            //console.log(targetIndex)
            const newToDo = {text, id, category: name as any}
            return [...oldToDos.slice(0,targetIndex), newToDo, ...oldToDos.slice(targetIndex+1)]
        })
    }

    //삭제
    const toDoDelete = () => {
        setToDos((toDos) => {
            const newTodoList = toDos.filter((toDo) => toDo.id !== id);
            return newTodoList
        })
    }

    console.log(category)
    return (
        <li>
            <span>{text}</span>
            {category !== Categories.TO_DO && (
            <button name={Categories.TO_DO } onClick={onClick}>To Do</button>)}
            {category !== Categories.DOING && (
            <button name={Categories.DOING} onClick={onClick}>Doing</button>)}
            {category !== Categories.DONE && (
            <button name= {Categories.DONE} onClick={onClick}>Done</button>)}
            <button onClick={toDoDelete}>delete</button>
        </li>
    );
};

export default ToDo;