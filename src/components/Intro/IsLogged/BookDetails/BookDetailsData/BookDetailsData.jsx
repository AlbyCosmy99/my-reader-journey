import Card from "react-bootstrap/Card";
import "./BookDetailsData.css";

export default function BookDetailsData({ book }) {
  return (
    <Card style={{ backgroundColor: "#CEB289", color: "#5B462F" }}>
      <Card.Body style={{ maxHeight: "86vh", overflowY: "auto" }}>
        <div style={{ textAlign: "center" }}>
          <h2>{book.title}</h2>
          <h3>{book.author}</h3>
        </div>
        {book.genre ? (
          <h4>
            <b>Genre: </b>
            {book.genre}
          </h4>
        ) : (
          ""
        )}
        {book.language ? (
          <h4>
            <b>Language: </b>
            {book.language}
          </h4>
        ) : (
          ""
        )}
        {book.publishing_house ? (
          <h4>
            <b>Publishing House: </b>
            {book.publishing_house}
          </h4>
        ) : (
          ""
        )}
        {book.pages ? (
          <h4>
            <b>Pages: </b>
            {book.pages}
          </h4>
        ) : (
          ""
        )}
        {book.price ? (
          <h4>
            <b>Price: </b>
            {book.price}
          </h4>
        ) : (
          ""
        )}
        {book.isbn ? (
          <h4>
            <b>ISBN: </b>
            {book.isbn}
          </h4>
        ) : (
          ""
        )}
        {book.publicationDate ? (
          <h4>
            <b>Publication Date: </b>
            {String(book.publicationDate).split("T")[0] === "null"
              ? ""
              : String(book.publicationDate).split("T")[0]}
          </h4>
        ) : (
          ""
        )}
        <Card
          style={{
            marginTop: "1rem",
            marginBottom: "1rem",
            backgroundColor: "#9A7872",
            color: "white",
            border: "2px solid #9A7872",
          }}
        >
          <Card.Body style={{ padding: 0, margin: 0, textAlign: "center" }}>
            <h3 style={{ fontSize: "25px" }} className="m-0 p-1">
              ABOUT YOUR RELATIONSHIP WITH THE BOOK
            </h3>
          </Card.Body>
        </Card>
        <h4>
          <b>Read: </b>
          {book.read ? "YES" : "NO"}
        </h4>
        <h4>
          <b>To Read: </b>
          {book.toRead ? "YES" : "NO"}
        </h4>
        <h4>
          <b>Reading: </b>
          {book.reading ? "YES" : "NO"}
        </h4>
        {book.rating ? (
          <h4>
            <b>Your rating: </b>
            {book.rating}/10
          </h4>
        ) : (
          ""
        )}
        <h4>
          <b>Favorite: </b>
          {book.favorite ? "YES" : "NO"}
        </h4>
        <h4>
          <b>Loaned: </b>
          {book.loaned ? "YES" : "NO"}
        </h4>
        <h4>
          <b>Borrowed: </b>
          {book.borrowed ? "YES" : "NO"}
        </h4>
        {book.startReadingDate ? (
          <h4>
            <b>Reading start date: </b>
            {String(book.startReadingDate).split("T")[0] === "null"
              ? ""
              : String(book.startReadingDate).split("T")[0]}
          </h4>
        ) : (
          ""
        )}
        {book.endReadingDate ? (
          <h4>
            <b>Reading end date: </b>
            {String(book.endReadingDate).split("T")[0] === "null"
              ? ""
              : String(book.endReadingDate).split("T")[0]}
          </h4>
        ) : (
          ""
        )}
        {book.dateAdded ? (
          <h4>
            <b>Date you added the book: </b>
            {String(book.dateAdded).split("T")[0] === "null"
              ? ""
              : String(book.dateAdded).split("T")[0]}
          </h4>
        ) : (
          ""
        )}
        {book.description ? (
          <span>
            <Card
              style={{
                marginTop: "1rem",
                marginBottom: "1rem",
                backgroundColor: "#9A7872",
                color: "white",
                border: "2px solid #9A7872",
              }}
            >
              <Card.Body style={{ padding: 0, margin: 0, textAlign: "center" }}>
                <h3 style={{ fontSize: "25px" }} className="m-0 p-1">DESCRIPTION</h3>
              </Card.Body>
            </Card>
            <h4>{book.description}</h4>
          </span>
        ) : (
          ""
        )}
        {book.notes ? (
          <span>
            <Card
              style={{
                marginTop: "1rem",
                marginBottom: "1rem",
                backgroundColor: "#9A7872",
                color: "white",
                border: "2px solid #9A7872",
              }}
            >
              <Card.Body style={{ padding: 0, margin: 0, textAlign: "center" }}>
                <h3 style={{ fontSize: "25px" }} className="m-0 p-1">NOTES</h3>
              </Card.Body>
            </Card>
            <h4>{book.notes}</h4>
          </span>
        ) : (
          ""
        )}
      </Card.Body>
    </Card>
  );
}
