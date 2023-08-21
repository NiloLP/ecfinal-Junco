const React = require('react');
const {useState, useEffect} = require('react');
const {useParams} = require('react-router-dom');
const client = require('../client');
const {Link} = require('react-router-dom');

const VerBandaPage = ()=>{

    let {id} = useParams();
    const [banda, setBanda] = useState({});
    const [integrantes, setIntegrantes] = useState([]);

    useEffect(()=>{

        const url_banda = '/api/bandas/'+id

        client({
            method: 'GET',
            path: url_banda
        }).done((response)=>{setBanda(response.entity);})

        client({
            method: 'GET',
            path: url_banda + '/formacion'
        }).done((response)=>{setIntegrantes(response.entity);})

    }, []);

    return (
        <>
            <h1>Ver Banda Pirata</h1>

            <table border="1">
                <tbody>
                    <tr>
                        <th>Nombre</th>
                        <td>{banda.nombre}</td>
                    </tr>
                </tbody>
            </table>

            <hr />

            <table border="1">
                <thead>
                    <tr>
                        <th colSpan="2">Piratas</th>  
                    </tr>
                    <tr>
                        <th>Capitán</th>
                        <th>Friend</th>
                    </tr>
                </thead>
                <tbody>
                    {integrantes.map(integrante => {
                        return (
                            <tr key={integrante.ID}>
                                <td>{integrante.NAKAMA}</td>
                                <td>{integrante.PIRATA}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <Link to={`/ver-banda/${id}/nuevo-integrante`}>Nuevo Integrante</Link> | <Link to="/">Volver</Link>
        </>
    );
}

module.exports = VerBandaPage;