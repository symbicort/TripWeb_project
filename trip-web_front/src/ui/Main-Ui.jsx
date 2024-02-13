import visual from '../assets/visual.jpg'
import {CORE_CONCEPTS, EXAMPLES} from '../util/mainList'

import '../styles/MainUi.css'

const MainUi = ()=>{
    return(
        <div className="Main-Container">
            <div className="visual">
                <img src={visual} alt='visual'/>
            </div>
            <div className='products'>
                <ul>
                    {
                        CORE_CONCEPTS.map((item)=>{
                            return (
                                <li>
                    <img src={item.image} alt={item.title}/>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                </li>
                            )
                        })
                    }
                </ul>
            </div>

            
        </div>
    )
}

export default MainUi