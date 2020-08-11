import {database} from '../database/config'

export function startAddingPost(post){
    return(dispatch) => {
        return database.ref('posts').update({[post.id]:post}).then(() => {
                dispatch(addPost(post))
            }).catch((error) => {
                console.log(error)
            })
    }
}

export function startAddingComment(comment, postId){
    return(dispatch) => {
        return database.ref(`comments/${postId}`).push(comment).then(() => {
                dispatch(addComment(comment, postId))
            }).catch((error) => {
                console.log(error)
            })
    }
}

// export function startLoadingPosts(){
//     return(dispatch) => {
//         return database.ref('posts').once('value').then((snapshot) => {
//             let posts = []
//             snapshot.forEach((childSnapshot) => {
//                 posts.push(childSnapshot.val())
//             })
//             dispatch(loadPosts(posts))
//         })
//     }
// }

export function startLoadingPosts(){
    return(dispatch) => {
        return fetch("http://192.168.0.3:8000/song-artist/").then((response) => {
            return response.json();
        }).then(data => {
            let posts = []
            data.forEach((element) => {
                posts.push({id:element['id'], file:element['song_file'],description:element['song_name'],imageLink:element['track_art'], dominantColor:element['track_art_dominant_color']})
            })
            dispatch(loadPosts(posts))
          });
    }
}

export function startRemovingPost(index, id) {
 
    const updates = {
     [`posts/${id}`]: null,
     [`comments/${id}`]: null
    }     
     return (dispatch) => {
        return database.ref().update(updates).then(() => {
            dispatch(removePost(index))
        }).catch((error) => {
            console.log(error)
        })
     }
    }

export function startLoadingComments(){
    return(dispatch) => {
        return database.ref('comments').once('value').then((snapshot) => {
            let comments = {}
            snapshot.forEach((childSnapshot) => {
                comments[childSnapshot.key] = Object.values(childSnapshot.val())
            })
            dispatch(loadComments(comments))
        })
    }
}

export function loadPosts(posts){
    return{
        type:"LOAD_POSTS",
        posts
    }
}

export function loadComments(comments){
    return{
        type:"LOAD_COMMENTS",
        comments
    }
}

export function removePost(index){
    return{
        type:"REMOVE_POST",
        index

    }
}

export function addPost(post){
    return{
        type:"ADD_POST",
        post
    }
}

export function addComment(comment, postId){
    console.log(postId);
    return{
        type:"ADD_COMMENT",
        comment,
        postId
    }
}

export function loadVolume(){
    let volume = localStorage.getItem('vol');
    if(!volume){
        volume = 0.5;
        localStorage.setItem('vol', 0.5);
    }
    return{
        type:"LOAD_VOLUME",
        volume
    }
}

export function setTrack(track, id){
    localStorage.setItem('lastTrack', track);
    localStorage.setItem('lastTrackID', id);
    return{
        type:"SET_TRACK",
        track,
        id
    }
}

export function loadTrack(){
    let track = localStorage.getItem('lastTrack');
    let id = localStorage.getItem('lastTrackID');
    if(!track || !id){
        track = "";
        id = "";
        localStorage.setItem('lastTrack', "");
        localStorage.setItem('lastTrackID', "");
    }
    return{
        type:"LOAD_TRACK",
        track,
        id
    }
}
