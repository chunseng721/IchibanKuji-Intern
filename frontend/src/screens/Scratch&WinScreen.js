import React, { useRef } from 'react'
import ScratchCard from 'react-scratchcard-v2'
import { CUSTOM_BRUSH_PRESET } from 'react-scratchcard-v2';
import { Row, Button } from 'react-bootstrap'


const ScratchAndWinScreen = ({ history }) => {

    const ref = useRef <ScratchCard> (null)

    const onClickReset = () => {
        ref.current && ref.current.reset()
    }

    return (
        <>
        <Button onClick={onClickReset}>Reset</Button>
        <Row>
          <ScratchCard
            width={1020}
            height={426}
            image={require('../ticket.jpg')}
            finishPercent={70}
            onComplete={() => console.log('complete')}
            customBrush={{
                image: require('../brush.jpg'),
                width: 100,
                height: 100}}>
  
            <div style={{
              display: 'flex',
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
  
              <h1>Scratch card</h1>
            </div>
          </ScratchCard>
        </Row>
      </>
    )
  }
  

export default ScratchAndWinScreen