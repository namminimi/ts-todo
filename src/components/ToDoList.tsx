import React from 'react';
import { useRecoilState, useRecoilValue} from 'recoil';
import CreateToDo from './CreateToDo';
import { Categories, categoryState, toDoSelector, toDoState } from '../atoms';
import ToDo from './ToDo';


/* [
    {
        "text": "5",
        "id": 1684319813244,
        "category": "TO_DO"
    },
    {
        "text": "4",
        "id": 1684319812443,
        "category": "TO_DO"
    },
    {
        "text": "3",
        "id": 1684319811698,
        "category": "TO_DO"
    },
    {
        "text": "2",
        "id": 1684319810888,
        "category": "TO_DO"
    },
    {
        "text": "1",
        "id": 1684319810207,
        "category": "TO_DO"
    }
] */




const ToDoList = () => {
    //const toDos = useRecoilValue(toDoState)
    /* const value = useRecoilValue(toDoState) 이 두함수를 뭉쳐논 함수가 위에꺼 useState와 비슷함
    const modFn = useSetRecoilState(toDoState); //업데이트 */
    //console.log(toDos)
    const toDos = useRecoilValue(toDoSelector)
    const [category, setCategory] = useRecoilState(categoryState)
    const onInput = (e:React.FormEvent<HTMLSelectElement>) => {
        setCategory(e.currentTarget.value as any)
    }
    //console.log(category)
    
    return (
        <div>
            <h1>To Dos</h1>
            <hr />
            <select value={category} onInput={onInput}>
                <option value={Categories.TO_DO}>To Do</option>
                <option value={Categories.DOING}>Doing</option>
                <option value={Categories.DONE}>Done</option>
            </select>
            <CreateToDo/>
            {toDos?.map(toDo => (<ToDo key={toDo.id} {...toDo}/>))}
        </div>
    );
};

export default ToDoList;