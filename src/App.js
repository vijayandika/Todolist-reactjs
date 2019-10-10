import React, { Component } from 'react'
import Header from './Components/Header';
import Body from './Components/Body'
import axios from 'axios'
import './App.css'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      judul: ''
    }
  }
  componentDidMount = () => {
    console.log(`Bisa lek`)
    this.datas()
    setInterval(this.datas, 1000)
    // setInterval(this.cek, 1000)
  }

  cek = () => {
    console.log(this.state)
  }

  datas = () => {
    axios.get(`https://btm-rn.herokuapp.com/api/v1/todo`)
      .then(res => {
        this.setState({
          data: res.data.results
        })
        // console.log(res.data.results)
      })
  }

  tambah_data = (event) => {
    this.setState({
      judul: event.target.value
    })
  }

  tambahData = (event) => {
    event.preventDefault()
    const postData = async objParam => await axios.post(
      `https://btm-rn.herokuapp.com/api/v1/todo`, objParam
    )

    postData({
      title: this.state.judul
    })
      .then(response => {
        console.log(response.data)
      })
      .catch(err => console.log(err))

    this.datas();
    this.deleteIsi()
  }

  deleteIsi = () => {
    document.getElementById(`input`).reset();
  }

  render = () => {
    return (
      <div>

        <Header />
        <Body data={this.state.data} />
        <form id="input">
          <input type="text" placeholder="Input lek?" onChange={this.tambah_data}></input>
          <button
            type="submit"
            onClick={this.tambahData}
            >Klik</button>
        </form>
      </div>
    )
  }
}
