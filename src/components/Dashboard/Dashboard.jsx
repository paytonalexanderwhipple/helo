import React ,{ Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Dashboard.css';

class Dashboard extends Component {
    constructor() {
        super()
        
        this.state = {
            userPosts: true,
            posts: [],
            search: '',
        }
    }

    componentDidMount = () => {
        this.search()
    }

    handleInput = (event) => {
        this.setState({search: event.target.value})
    }

    handleCheckbox = () => {
        this.setState({userPosts: !this.state.userPosts});
    }

    search = () => {
        axios.post(`/api/posts?search=${this.state.search}`, { userPosts: this.state.userPosts} )
            .then(res => {
                this.setState({posts: res.data, search: ''});
            }).catch(error => {
                console.log(`Dashboard.search ${error}`);
            })
    }
    
    render() {

        let posts = this.state.posts.map((post, i) => {
            console.log(post.id)
            return (
                <div key={i}>
                    <Link to={`/post/${post.id}`}>
                        { post.title }
                        <img src={post.img} alt='ooooœ'/>
                        { post.content } 
                        { post.name }
                    </Link>
                </div>
            )
        })
        return (
            <div className='Dashboard'>
                <input placeholder='search' type="text" onChange={this.handleInput}/>
                <button onClick={this.search}>Search</button>
                <button>Reset</button>
                <input type="checkbox" checked={this.state.userPosts} onChange={this.handleCheckbox} name='myPosts' alt='ohhhhhhh'/>
                <p>My Posts</p>d
                {posts}
            </div>
        )
    }
}

export default Dashboard;