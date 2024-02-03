import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserOptions from "../UserOptions/UserOptions";
import BooksList from '../BooksList/BooksList'

export default function Home({message}) {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<UserOptions/>}></Route>
                <Route path="/all-my-books" exact element={<BooksList message={'all-my-books'}/>}></Route>
                <Route path="/books-read" exact element={<BooksList message={'books-read'}/>}></Route>
                <Route path="/books-to-read" exact element={<BooksList message={'books-to-read'}/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}