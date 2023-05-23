import Card from 'react-bootstrap/Card';

function CharacterDetail(props){
    
    return(
        <Card style={{ width: '18rem', height: '24rem' }} className="mb-3">
            <Card.Body>
                <Card.Img 
                    style={{ height: '14rem' }}
                    variant="top"
                    src={props.data.thumbnail.path + "." + props.data.thumbnail.extension}
                    alt={props.data.description}
                />
                <Card.Title>
                        {props.data.name}
                </Card.Title>
                <Card.Text>{props.data.description}</Card.Text>
            </Card.Body>
        </Card>
   );
}

export default CharacterDetail;
