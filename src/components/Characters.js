import { useState, useEffect } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CharacterDetail from './CharacterDetail';

function Characters() {

    const [characters, setCharacters] = useState([]);

    useEffect(()=>{
        if(!navigator.onLine){
            if(localStorage.getItem("characters") === null) {
                setCharacters([])
            } else {
                setCharacters(localStorage.getItem("characters"));
            }
        } else {
            const md5 = require('crypto-js/md5');
            // Obtén tus claves públicas y privadas de Marvel
            const publicKey = 'e4bc9bd03fdf68d03f594b41ebd4007e';
            const privateKey = '05a0ce3e870d07d9275b301436455ee870612261';

            // Genera el timestamp actual
            const timestamp = new Date().getTime().toString();

            // Concatena el timestamp, la clave privada y la clave pública
            const concatenatedString = timestamp + privateKey + publicKey;

            // Calcula el hash MD5
            const hash = md5(concatenatedString).toString();
            // Construye la URL del endpoint con los parámetros
            const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
            const url = `${baseUrl}?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;
            fetch(url).then(res=>res.json()).then(res=>{
                setCharacters(res.data.results);
                localStorage.setItem("characters", res.data.results);
            })
        }
    }, []);

    return (
        <div className="container">
        <h2 className="mt-2">Personajes de Marvel</h2>
        <hr></hr>
        <Row>
        {characters.map((character) => (
            <Col key={character}>
                <CharacterDetail data={character} />
            </Col>
        ))}
        </Row>
    </div>
    );
}

export default Characters;