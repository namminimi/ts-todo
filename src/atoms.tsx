import { atom, selector } from "recoil";

export enum Categories {
    "TO_DO"="TO_DO",
    "DOING"="DOING",
    "DONE"="DONE"
}

export interface IToDo {
    text: string;
    id: number
    category: Categories
}

export const categoryState = atom<Categories>({
    key: "category",
    default: Categories.TO_DO,
})

const localStorageEffect = (key: string) => ({setSelf, onSet}: any) => {
    // 콜백함수, setSelf는 atom의 값을 초기화해주는 함수, onSet함수는 atom의 값이 변경되었을때 실행되는 함수
    const savedValue = localStorage.getItem(key);
    if(savedValue !== null) {
        setSelf(JSON.parse(savedValue))
    }

    onSet((newValue: any, _: any, isReset: boolean) => { 
        //onSet 3번쨰 매개변수는 atom상태가 default값으로 리셋될때 로컬스토리지의 데이터도 같이 삭제
        isReset ? localStorage.removeItem(key) :
        localStorage.setItem(key, JSON.stringify(newValue))
    })
}

export const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],
    effects: [localStorageEffect('toDo')]
})

//recoil에 localStorage 참고 사이트: 
//https://recoiljs.org/ko/docs/guides/atom-effects/#local-storage-persistence-%EB%A1%9C%EC%BB%AC-%EC%8A%A4%ED%86%A0%EB%A6%AC%EC%A7%80-%EC%A7%80%EC%86%8D%EC%84%B1
//입력한 값들을 로컬스토리지에 저장해줌

export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({get}) => {
        const toDos = get(toDoState)
        const category = get(categoryState)
        return toDos.filter((toDo) => toDo.category === category)
    }
})