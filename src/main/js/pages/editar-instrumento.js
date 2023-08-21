const React = require('react');
const {useState, useEffect} = require('react');
const { Link, useParams } = require('react-router-dom');
const client = require('../client');

const EditarInstrumentoPage = () => {

    const [pirata, setPirata] = useState({});

    let { id } = useParams();

    useEffect(() => {
        client({
            method: 'GET',
            path: '/api/piratas/' + id
        }).done(response => {
            setPirata(response.entity);
        })
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        client({
            method: 'PATCH',
            path: '/api/piratas/' + id,
            entity: pirata,
            headers: {'Content-Type': 'application/json'}
        }).done(() => window.location = "/");
    }


    return (
        <>
            <h1>Editar Pirata</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="nombre">Nombre</label>
                <input type="text" id="nombre" name="nombre" value={pirata.nombre} onChange={(e)=>setPirata({...pirata, nombre: e.target.value})} />
                <label htmlFor="categoria">Categoría</label>
                <input type="text" id="categoria" name="categoria" value={pirata.categoria} onChange={(e)=>setPirata({...pirata, categoria: e.target.value})} />
                <label htmlFor="descripcion">Descripción</label>
                <input type="text" id="descripcion" name="descripcion" value={pirata.descripcion} onChange={(e)=>setPirata({...pirata, descripcion: e.target.value})} />
                <input type="submit" value="Editar Pirata" />
            </form>
            <hr />
            <Link to="/">Volver</Link>
        </>
    );
}

module.exports = EditarInstrumentoPage;