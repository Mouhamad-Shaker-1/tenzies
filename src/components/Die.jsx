

export default function Die(props) {
    // const stylesHold = {
    //     backgroundColor: props.isHeld ? "#59E391" : "white"
    // }
   
    const colorDice = props.isHeld ? "blackDice" : "witheDice"
    const numberDotes = props.value

    return (
        <div 
            className='dieFace' 
            // style={stylesHold}
            onClick={props.holdDice}
        >
            <img className='imgDice' src={`../img/${colorDice}/diceDice (${numberDotes}).png`} />
            {/* <p className='number'>{numberDotes}</p> */}
            {/* <h2 className={styles.dieNum}>{props.value}</h2> */}
        </div>
    )
}