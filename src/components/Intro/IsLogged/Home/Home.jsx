import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserOptions from "../UserOptions/UserOptions";
import BooksList from '../BooksList/BooksList'
import BookDetails from "../BookDetails/BookDetails";
import NavBar from "../../../NavBar/NavBar";
import AddBook from "../AddBook/AddBook";

export default function Home() {
    return(
        <>       
            <BrowserRouter>
                <NavBar/>
                <Routes>
                    <Route path="/" exact element={<UserOptions/>}></Route>
                    <Route path="/add-book" exact element={<AddBook />}></Route>
                    <Route path="/all-my-books" exact element={<BooksList message={'all-my-books'} sectionTitle={"ALL MY BOOKS"}/>}></Route>
                    <Route path="/books-read" exact element={<BooksList message={'books-read'} sectionTitle={"BOOKS READ"}/>}></Route>
                    <Route path="/books-to-read" exact element={<BooksList message={'books-to-read'} sectionTitle={"BOOKS TO READ"}/>}></Route>
                    <Route path="/favorite-books" exact element={<BooksList message={'favorite-books'} sectionTitle={"FAVORITE BOOKS"}/>}></Route>
                    <Route path="/top-rating-books" exact element={<BooksList message={'top-rating-books'} sectionTitle={"10/10 RATING BOOKS"}/>}></Route>
                    <Route path="/books/:id" exact element={<BookDetails/>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}