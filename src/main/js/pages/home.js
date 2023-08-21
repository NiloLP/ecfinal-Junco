const React = require('react');
const client = require('../client');
const {Link} = require('react-router-dom');

class PageHome extends React.Component {
	constructor(props) {
		super(props);
		this.state = { piratas: [], nakamas: [], bandas: [] };
	}
	componentDidMount() {
		client({ method: 'GET', path: '/api/piratas' }).done(response => {
			this.setState({ piratas: response.entity._embedded.piratas });
		});
		client({ method: 'GET', path: '/api/nakamas' }).done(response => {
			this.setState({ nakamas: response.entity._embedded.nakamas });
		});
		client({ method: 'GET', path: '/api/bandas' }).done(response => {
			this.setState({ bandas: response.entity._embedded.bandas });
		});
	}
	render() {
		return (
			<>
                <h1 className='text-center'>One Piece</h1>

				<div style={{"width": "100%","display": "flex"}} className='container'>

					<div style={{"width": "calc(100%/3)"}}>
						<Titulo entidad="Pirata" emoji="🐒" />
						<InstrumentoList piratas={this.state.piratas} />
						<br />
						<Link to="/nuevo-instrumento" className='btn btn-warning'>Nuevo Pirata</Link>
					</div>

					<div style={{"width": "calc(100%/3)"}}>
						<Titulo entidad="Nakama" emoji="⚓" />
						<MusicoList nakamas={this.state.nakamas} />
						<br />
						<Link to="/nuevo-musico" className='btn btn-warning'>Nuevo Nakama</Link>
					</div>

					<div style={{"width": "calc(100%/3)"}}>
						<Titulo entidad="Banda" emoji="🏴‍☠️" />
						<BandaList bandas={this.state.bandas} />
						<br />
						<Link to="/nueva-banda" className='btn btn-warning'>Nueva Banda</Link>
					</div>

				</div>



			</>
		)
	}
}

const Titulo = (props) => {
	return (
		<>
			<hr />
			<h2>{props.emoji} - {props.entidad}</h2>
			<span>Listado de {props.entidad.toLowerCase()}</span>
			<hr />
		</>
	)
}


class InstrumentoList extends React.Component {
	render() {
		const piratas = this.props.piratas.map(pirata =>
			<Instrumento key={pirata._links.self.href} pirata={pirata} />
		);
		return (
			<table border="1">
				<tbody>
					<tr>
						<th>Nombre</th>
						<th>Categoría</th>
						<th>Descripción</th>
						<th>Acciones</th>
					</tr>
					{piratas}
				</tbody>
			</table>
		)
	}
}
class MusicoList extends React.Component {
	render() {
		const nakamas = this.props.nakamas.map(nakama =>
			<Musico key={nakama._links.self.href} nakama={nakama} />
		);
		return (
			<table border="1">
				<tbody>
					<tr>
						<th>Nombre</th>
						<th>Acciones</th>
					</tr>
					{nakamas}
				</tbody>
			</table>
		)
	}
}
class BandaList extends React.Component {
	render() {
		const bandas = this.props.bandas.map(banda =>
			<Banda key={banda._links.self.href} banda={banda} />
		);
		return (
			<table border="1">
				<tbody>
					<tr>
						<th>Nombre</th>
						<th>Acciones</th>
					</tr>
					{bandas}
				</tbody>
			</table>
		)
	}
}

class Instrumento extends React.Component {
	render() {
		const id = this.props.pirata._links.self.href.split('/').slice(-1);
		return (
			<tr>
				<td>{this.props.pirata.nombre}</td>
				<td>{this.props.pirata.categoria}</td>
				<td>{this.props.pirata.descripcion}</td>
				<td>
					<Link to={'/editar-instrumento/'+id} className='btn btn-primary'>Editar</Link>
				</td>
			</tr>
		)
	}
}
class Musico extends React.Component {
	render() {
		const id = this.props.nakama._links.self.href.split("/").slice(-1);
		return (
			<tr>
				<td>{this.props.nakama.nombre}</td>
				<td>
					<Link to={`/editar-musico/${id}`} className='btn btn-primary'>Editar</Link>
				</td>
			</tr>
		)
	}
}
class Banda extends React.Component {
	render() {
		const id = this.props.banda._links.self.href.split("/").slice(-1);
		return (
			<tr>
				<td>{this.props.banda.nombre}</td>
				<td>
					<Link to={`/ver-banda/${id}`} className='btn btn-primary'>Ver</Link>
				</td>
			</tr>
		)
	}
}

module.exports = PageHome;