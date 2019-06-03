// Core
import React, { Component } from "react";

// Instruments
import Styles from "./styles.m.css";
import { api } from "../../REST"; // ! Импорт модуля API должен иметь именно такой вид (import { api } from '../../REST')

// Components
import Header from "../Header";
import Main from "../Main";
import Footer from "../Footer/footer";

export default class Scheduler extends Component {
    render () {
        const { scheduler } = Styles;

        return (
            <section className = { scheduler }>
                <main>
                    <Header />
                    <Main />
                    <Footer />
                </main>
            </section>
        );
    }
}
