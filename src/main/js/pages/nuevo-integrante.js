const React = require('react');
const {useState, useEffect} = require('react');
const { Link,useParams } = require('react-router-dom');
const client = require('../client');


const NuevoIntegrantePage = () => {

    let { id } = useParams();
    const [nakamas, setNakamas] = useState([])
    const [piratas, setPiratas] = useState([])
    const [idNakama, setIdNakama] = useState('')
    const [idPirata, setIdPirata] = useState('')

    const handleSubmit = (evento)=>{
        evento.preventDefault();
        client({
            method: 'POST',
            path: '/api/integrantes',
            entity: {
                banda: 'http://localhost:8080/api/bandas/'+id,
                nakama: 'http://localhost:8080/api/musicos/'+idNakama,
                pirata: 'http://localhost:8080/api/instrumentos/'+idPirata},
            headers: {'Content-Type': 'application/json'}
        }).done(()=>{
           window.location = '/';
        })
    }

    useEffect(() => {
        client({
            method: 'GET',
            path: '/api/nakamas'
        }).done(response=>{
            let nakama2 = [];
            response.entity._embedded.nakamas.map(nakama => {
                nakama2.push({value: nakama._links.self.href.split('/').slice(-1), label: nakama.nombre})
            })
            setNakamas(nakama2)
        })
        client({
            method: 'GET',
            path: '/api/piratas'
        }).done(response=>{
            let piratas = [];
            response.entity._embedded.piratas.map(pirata => {
                piratas.push({value: pirata._links.self.href.split('/').slice(-1), label: pirata.nombre})
            })
            setPiratas(piratas)
        })

    },[])

    return (
        <>
            <h1>Nuevo Integrante</h1>
            <form onSubmit={handleSubmit}>

                <label htmlFor='nakama'>Nakama</label>
                <select name="nakama" id="nakama" onChange={(e)=>{setIdNakama(e.target.value)}}>
                    {nakamas.map(nakama => {	
                        return (
                            <option key={nakama.value} value={nakama.value}>{nakama.label}</option>
                        )
                    })}
                </select>
                
                <label>Pirata</label>
                <select name="pirata" id="pirata" onChange={(e)=>{setIdPirata(e.target.value)}}>
                    {piratas.map(pirata => {	
                        return (
                            <option key={pirata.value} value={pirata.value}>{pirata.label}</option>
                        )
                    })}
                </select>

                <input type="submit" value="Nuevo Integrante" />

            </form>
            <Link to="/" className='btn btn-primary'>Volver</Link>
        </>
    )
}

module.exports = NuevoIntegrantePage;