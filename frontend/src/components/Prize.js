import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Card, Col, Row, Button } from 'react-bootstrap'


const Prizelist = ({ prizeList }) => {

    return (
        <Card className="my-3 mx-0 p-1 rounded" >
            <Row className="align-items-center justify-content-center">
                <Col className="col-5" xs={8} sm={8} md={8} xl={12}>
                    <div style={{ position: 'relative' }}>
                        <div style={{ position: 'position' }}>
                            <img src={prizeList.imageSrc} style={{width: '100%', height: '100%'}} alt={prizeList.prize}></img>
                        </div>
                        <div style={{
                            position: 'absolute',
                            top: '8%',
                            left: '85%',
                            transform: 'translate(-50%, -50%)',
                        }}>
                            <h5>{prizeList.totalLeft}/{[prizeList.total]}</h5>
                        </div>
                    </div>
                </Col>
            </Row>
        </Card>
    )
}

export default Prizelist