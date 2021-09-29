import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionsCreators from '../redux/actions';

function Detail({ state, id, fetchGameById, api }) {
    
    const { loadinGameById, gameDetail } = state;

    useEffect(() => {
        fetchGameById(id, api)
    }, [])

    return (
        <div>
            {
                !loadinGameById &&
                <div id="detailContainer" style={{
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <h1>{gameDetail.name}</h1>
                    <img src={gameDetail.background_image} alt={gameDetail.name} style={{ width: '80%', borderRadius: 16 }} />
                    <p>{gameDetail.description}</p>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div style={{ width: '50%' }}>
                            <h3>
                                Rating: {gameDetail.rating}
                            </h3>
                        </div>
                        <div style={{ width: '50%' }}>
                            <h3>
                                Fecha de publicación: {gameDetail.releasedate}
                            </h3>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div style={{ width: '50%' }}>
                            <h3>
                                Generos:
                            </h3>
                        </div>
                        <div style={{ width: '50%' }}>
                            <h3>
                                Plataformas:
                            </h3>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

const mapStateToProps = (state) => ({ state });

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionsCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
