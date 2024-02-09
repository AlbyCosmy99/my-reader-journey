import Card from 'react-bootstrap/Card';

export default function BookDetailsData({book}) {
    return (
        <Card style={{backgroundColor: '#CEB289', color:'#5B462F'}}>
            <Card.Body>
                <div style={{textAlign:'center'}}>
                    <h2>{book.title}</h2>
                    <h3>{book.author}</h3>
                </div>
                <h4><b>Genre: </b>genere</h4>
                <h4><b>Language: </b>lingua</h4>
                <h4><b>Publishing House: </b>Publishing House</h4>
                <h4><b>Number of pages: </b>45</h4>
                <h4><b>Price: </b>price</h4>
                <h4><b>ISBN: </b>645654645464</h4>
                <h4><b>Publication Date: </b>12/04/2023</h4>
                <Card style={{marginTop:'1rem', marginBottom:'1rem'}}>
                    <Card.Body style={{padding: 0, margin: 0,textAlign:'center'}}>
                        <h3>ABOUT YOUR RELATIONSHIP WITH THE BOOK</h3>
                    </Card.Body>
                </Card>
                <h4><b>ISBN: </b>645654645464</h4>
                <h4><b>Read: </b>NO</h4>
                <h4><b>To Read: </b>NO</h4>
                <h4><b>Reading: </b>NO</h4>
                <h4><b>Your rating: </b>7/10</h4>

            </Card.Body>
        </Card>
    )
}