import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { bindActionCreators } from 'redux';
import * as actionsCreators from '../redux/actions';

function CreateGame({ state, fetchGenres, createGame }) {

    const [data, setData] = useState({
        name: "",
        description: "",
        background_image: "",
        releasedate: "",
        rating: 0,
        gender: 1,
        platforms: [],
        genres: []
    })

    const { genres, isCreated } = state

    const platforms = [
        "PC",
        "IOS",
        "Android",
        "MacOS",
        "PlayStation 4",
        "Xbox X",
        "Xbox",
        "PS vita"
    ]

    useEffect(() => {
        fetchGenres()
    })

    const formPreventDefault = (e) => {
        let newData = data
        newData.gender = data.genres.map(g => { return { name: g } })
        newData.platforms = data.platforms.map(p => { return { name: p } })
        console.log("data de peticion", JSON.stringify(newData));
        createGame(data)
        e.preventDefault();
    }

    if (isCreated) {
        return <Redirect to="/" />
    }

    return (

        <div className="sectionForm">
            {/* Formulario */}
            <h1>Crea tu Videojuego!</h1>
            <form onSubmit={formPreventDefault} >

                {/* Nombre de juego */}
                <label>Nombre del Juego</label>
                <input onChange={(event) => {
                    setData({ ...data, name: event.target.value })
                }} type="text" name="name" />
                <br />
                {/* Descripcion */}
                <label>Descripcion</label>
                <input onChange={(event) => {
                    setData({ ...data, description: event.target.value })
                }} type="text" name="descripcion"></input>
                <br />
                {/* Imagen */}
                <label>Imagen (url)</label>
                <input onChange={(event) => {
                    setData({ ...data, background_image: event.target.value })
                }} type="url" name="image"></input>
                <br />
                {/* Fecha de lanzamiento */}
                <label>Fecha de Lanzamiento</label>
                <input onChange={(event) => {
                    setData({ ...data, releasedate: event.target.value })
                }} className="label" type="date" name="Fecha" value="2021-09-22" />
                <br />
                {/* Rating */}
                <label>Rating</label>
                <input onChange={(event) => {
                    setData({ ...data, rating: event.target.value })
                }} className="label" type="number" name="Rating" />
                <br />
                {/* Generos */}
                <div className="checks" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div>
                        <h3>Generos: </h3>
                        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                            {genres.map(genre => {
                                return (
                                    <div style={{ width: '50%' }} key={genre.name}>
                                        <input onChange={(event) => {
                                            if (event.target.checked) {
                                                data.genres.push(genre.name);
                                            }
                                            else {
                                                const index = data.genres.indexOf(genre.name);
                                                if (index !== -1) { data.genres.splice(index, 1); }
                                            }
                                        }} type="checkbox" className="checkbox" />
                                        <label>{genre.name}</label>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <hr style={{ width: '100%' }} />
                    {/* Plataformas */}
                    <div>
                        <h3>Plataformas: </h3>
                        {
                            platforms.map(platform => {
                                return (
                                    <div key={platform}>
                                        <input onChange={(event) => {
                                            if (event.target.checked) {
                                                data.platforms.push(platform);
                                            }
                                            else {
                                                const index = data.platforms.indexOf(platform);
                                                if (index !== -1) { data.platforms.splice(index, 1); }
                                            }
                                        }} type="checkbox" className="checkbox" />
                                        <label>{platform}</label>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div >
                <button className="button" type="submit">Crear VideoJuego!</button>
            </form >
        </div >
    )
}
const mapStateToProps = (state) => ({
    state,
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionsCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateGame);






