import React ,{ Component } from 'react'
import axios from 'axios';

class Form extends Component {
    constructor() {
        super()
        
        this.state = {
            title: '',
            img: '',
            content: '',
        }
    }

    handleInput = (event) => {
        const { name, value } = event.target;
        this.setState({[name]: value});
    }
    
    postPost = () => {
        const { title, img, content } = this.state; 
        axios.post('/api/create-post', { title, img, content })
            .then(res => {
                this.setState({title: '', img: '', content: ''})
                this.props.history.push('/dashboard');
            }).catch(error => {
                console.log(`Form.postPost ${error}`);
            })
    }

    render() {
        return (
            <div>
                <input type="text" onChange={this.handleInput} name='title'/>
                <input type="text" onChange={this.handleInput} name='img'/>
                <input type="text" onChange={this.handleInput} name='content'/>
                <img src={this.state.img} alt=""/>
                <button>Post</button>d
            </div>
        )
    }
}

export default Form;