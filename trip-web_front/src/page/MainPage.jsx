import Header from "../ui/Header"
import Footer from "../ui/Footer"
import MainUi from "../ui/Main-Ui"
import { Children } from "react"

const Main = () => {
    return(
        <>
        <Header/>
            <MainUi >
                {Children}
            </MainUi>
        <Footer/>
        </>

    )
}

export default Main