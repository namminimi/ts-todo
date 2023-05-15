//import React, { useState } from 'react';



/* const ToDoList = () => {
    const [toDo, setToDo] = useState("");
    const [toDoError, setToDoError] = useState("")
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target
        //console.log(value)
        setToDoError("")
        setToDo(value)
    };
    const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //console.log(toDo)
        if(toDo.length < 10) {
            return setToDoError("To do should be longer")
        }
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} value={toDo} placeholder='Write a todo' />
                <button>Add</button>
                {toDoError !==  "" ? toDoError : null}
            </form>
            
        </div>
    );
};

export default ToDoList; */

import React from 'react';
import {useForm} from "react-hook-form"

type TodoListType = {
    errors: {
        email: {
            message: string
        }
    };
    firstName: string;
    lastName: string;
    email: string;
    userName: string;
    password: string;
    password1: string;
    extraError?: string;
}

const ToDoList = () => {
    const {register, handleSubmit, formState:{errors}, setError} = useForm<TodoListType>({
        defaultValues: { //입력값안에 기본입력값을 가지게해줌
            email: "@naver.com"
        }
    }); //위에 생략된 기능들이 다 있음
    const onValid = (data:TodoListType) => {
        if(data.password !== data.password1) {
            setError(
                "password1", 
                {message: "Password are not the same"},
                {shouldFocus: true})//포커스는 입력되지 않은 위치나 에러난 위치를 잡아줌? 커서가 감
                
        }
        //setError("extraError", {message: "Server offline."}) 서버와 연결 안됬을시 에러발생
        console.log(data)
    }
    //console.log(register("toDo"))
    //console.log(watch()) //onChange와 비슷함
    //console.log(formState.errors)
    return (
        <div>
            <form style={{display: "flex",flexDirection: "column"}} onSubmit={handleSubmit(onValid)}>
                <input 
                {...register("email", {
                    required: "Email is required",
                    pattern: {
                        value: /^[A-Za-z0-9._%+-]+@naver.com$/,
                        message: "Only naver.com emails allowed"
                    }
                
                })}
                 placeholder='Email' 
                 />
                 <span>{errors?.email?.message}</span>
                <input 
                {...register(
                    "firstName",
                    {required: "write here",
                    validate: {
                        noNico: (value) => value.includes("nico") ? "no nicos sllowed" : true,
                        noNick: (value) => value.includes("nicl") ? "no nicl allowed" : true,
                    }
                        })} //해당 문자가 들어가면 전달불가(위 처럼 조건 추가해주면됨)
                placeholder='First Name' 
                />
                <span>{errors?.firstName?.message}</span>
                <input 
                {...register("lastName", {required: "write here"})} 
                placeholder='Last Name' 
                />
                <span>{errors?.lastName?.message}</span>
                <input 
                {...register("userName", {required: "write here"})} 
                placeholder='Username' 
                />
                <span>{errors?.userName?.message}</span>
                <input 
                {...register("password", {required: "write here", minLength:5})} 
                placeholder='Password' 
                />
                <span>{errors?.password?.message}</span>
                <input 
                {...register("password1", {
                    required: "Password is required",
                    minLength:{
                        value: 5,
                        message: "Your password is too short"}
                    })} 
                placeholder='Password1' 
                />
                <span>{errors?.password1?.message}</span>
                <button>Add</button>
                <span>{errors?.extraError?.message}</span>
            </form>
            
        </div>
    );
};

export default ToDoList;