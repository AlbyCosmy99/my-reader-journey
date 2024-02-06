import { useParams } from "react-router-dom";

export default function BookDetails() {
    const { id } = useParams()
    return (
        <h1>BOOK DETAILS WITH ID {id}</h1>
    )
}