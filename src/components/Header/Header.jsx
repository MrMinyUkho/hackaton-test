import { Component } from 'react'
import PButton from '../BaseComponents/pButton'
import Dropdown from '../BaseComponents/Dropdown'
import styles from'./Header.module.scss'

export class Header extends Component {
    render() {
        return (
            <div id={styles["header"]}>
                Header
                <Dropdown
                    options={["Выберите", "Опция 1", "Опция 2", "Опция 3", "Опция 4", "Опция 5"]}
                    onSelect={(value) => console.log("Вы выбрали:", value)}
                />
                <PButton name="Реєстрація" action={() => alert("sdfdsfsdf")}/>

            </div>
        )
    }
}

export default Header