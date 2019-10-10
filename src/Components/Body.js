import React, { Component } from 'react'
import axios from 'axios'
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import '../App.css'

export default class Body extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            _id: '',
            judul: '',
            modal: false,
            backdrop: true,
            id: '',
            state: ''
        }

        // setInterval(this.cek, 1000)
        this.toggle = this.toggle.bind(this);
    }

    cek = () => {
        console.log(this.state.id)
        console.log(this.state.state)
        console.log(this.state.judul)
    }

    toggle(id, status, title) {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
        this.setState({
            id: id
        })
        this.setState({
            state: status
        })
        this.setState({
            judul: title
        })
    }

    tambah_nama = (event) => {
        this.setState({
            judul: event.target.value
        })
    }

    tambah_id = (event) => {
        this.setState({
            _id: event.target.value
        })
    }

    updateData = async (id, objParam) => {
        await axios.put(
            `https://btm-rn.herokuapp.com/api/v1/todo/${id}`, objParam
        )
    }

    deleteData = async id => await axios.delete(
        `https://btm-rn.herokuapp.com/api/v1/todo/${id}`
    )

    testrue = (isCom) => {
        if (isCom === true) {
            return false
        } else if (isCom === false) {
            return true
        } else {
            console.log(`In Here :(`)
        }
    }

    render() {
        const looping = this.props.data.map(value => {
            return (
                <>
                    <tr key={value._id}>
                        <td>
                            <input
                                type="checkbox"
                                checked={value.isComplete ? 'isComplete' : ''}
                                onChange={
                                    () => {
                                        this.updateData(
                                            value._id,
                                            {
                                                title: value.title,
                                                isComplete: this.testrue(value.isComplete)
                                            }
                                        )
                                    }
                                }
                            />
                        </td>
                        <td className={value.isComplete ? 'isComplete' : ''}>
                            <label for="check">
                                {value.title}
                            </label>
                        </td>
                        <td><button onClick={
                            () => this.deleteData(value._id)
                        }>Hapus</button></td>
                        <td>
                            <button onClick={() => {
                                this.toggle(value._id, value.isComplete, value.title)
                            }}>Ubah</button>
                        </td>
                    </tr>
                </>
            )
        });
        return (
            <div className="bdy">
                <table>
                    <tr>
                        <th>Check</th>
                        <th>Nama</th>
                        <th>Hapus</th>
                        <th>Update</th>
                    </tr>
                    {looping}
                </table>

                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} backdrop={this.state.backdrop}>
                    <ModalBody>
                        <h1>Ini untuk Update ToDo List {this.state.judul}</h1>
                        <input onChange={this.tambah_nama} type="text"></input>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="primary"
                            onClick={
                                () => {
                                    this.toggle()
                                    this.updateData(
                                        this.state.id,
                                        {
                                            title: this.state.judul,
                                            isComplete: this.state.state
                                        }
                                    )
                                }
                            }>Do Something</Button>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>

            </div>
        )
    }
}
