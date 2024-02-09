import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserOptions from "../UserOptions/UserOptions";
import BooksList from '../BooksList/BooksList'
import BookDetails from "../BookDetails/BookDetails";
import NavBar from "../../../NavBar/NavBar";

export default function Home() {
    return(
        <>
            <NavBar/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" exact element={<UserOptions/>}></Route>
                    <Route path="/all-my-books" exact element={<BooksList message={'all-my-books'}/>}></Route>
                    <Route path="/books-read" exact element={<BooksList message={'books-read'}/>}></Route>
                    <Route path="/books-to-read" exact element={<BooksList message={'books-to-read'}/>}></Route>
                    <Route path="/favorite-books" exact element={<BooksList message={'favorite books'}/>}></Route>
                    <Route path="/books/:id" exact element={<BookDetails/>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}