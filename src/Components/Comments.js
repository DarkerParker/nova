import React, {Component} from 'react'

class Comments extends Component{
    
    constructor(){
        super()
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(event){
        event.preventDefault()
        const comment = event.target.elements.comment.value
        event.target.elements.comment.value = "";
        this.props.startAddingComment(comment, this.props.postId)
    }

    render(){
        return(<div className="comment">
                {
                    this.props.comments.map((comment, index) => {
                        return(
                            <p key={index}>{comment}</p>
                        )
                    })
                }
                <form className="comment-form" onSubmit={this.handleSubmit}>
                    <input name="comment" type="comment" placeholder="comment"/>
                    <input type="submit" hidden/>
                </form>
               </div>)
    }
}

export default Comments