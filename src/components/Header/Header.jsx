import { Component } from 'react'
import PButton from '../BaseComponents/pButton'

export class Header extends Component {
    render() {
        return (
            <div>Header<PButton name="Реєстрація" action={() => alert("sdfdsfsdf")}/></div>
        )
    }
}

export default Header