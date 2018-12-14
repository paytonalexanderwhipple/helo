import React ,{ Component } from 'react'
import axios from 'axios';

class Post extends Component {
    constructor() {
        super()
        
        this.state = {
            title: '',
            img: '',
            content: '',
            username: '',
        }
    }

    componentDidMount = () => {
        this.getPost()
    }
    
    getPost = () => {
        axios.get(`/api/posts/${this.props.match.params.id}`)
            .then(res => {
                const { title, img, content, username } = res.data;
                this.setState({ title, img, content, username});
            }).catch(error => {
                console.log(`Post.getPost ${error}`);
            });
    }

    render() {
        let { title, img, content, username } = this.state
        return (
            <div>
                { title }
                <img src={img} alt='asdfadf' />
                { content }
                { username }
            </div>
        )
    }
}

export default Post;