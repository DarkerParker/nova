import _posts from '../data/posts'
import {combineReducers} from 'redux'

function comments(state={}, action){
    switch(action.type){
        case "ADD_COMMENT":
            if(!state[action.postId]){
                return {...state, [action.postId]:[action.comment]};
            }else{
                return {...state, [action.postId]:[...state[action.postId], action.comment]};
            }
        case "LOAD_COMMENTS":
            return action.comments
        default:
            return state;
    }

}

function player(state={}, action){
    switch(action.type){
        case "SET_TRACK":
            return {...state, track:action.track, id:action.id}
        case "LOAD_TRACK":
            return {...state, track:action.track, id:action.id}
        case "LOAD_VOLUME":
            return {...state,volume:action.volume}
        default:
            return state;
    }
}

function posts(state = _posts, action){
    switch(action.type){
        case "UPDATE_SELECTED_TRACK":
            return state.map((item, index) => {
                if (index !== action.index) {
                  // This isn't the item we care about - keep it as-is
                  if (item.selected){
                    item.selected = false;
                     return {...item}
                  }
                  else{
                      return item
                  }
                  
                }
            
                // Otherwise, this is the one we want - return an updated value
                item.selected = true;
                return {
                  ...item,
                  ...action.item
                }
              })
            // let tracks = [...state]

            // let updatedTrack = {selected:true, id:state[action.index].id, file:state[action.index].file,description:state[action.index].description,imageLink:state[action.index].imageLink, dominantColor:state[action.index].dominantColor}
            // return [...state.slice(0, action.index), updatedTrack, ...state.slice(action.index + 1)];
        case "REMOVE_POST":
            return [...state.slice(0, action.index), ...state.slice(action.index + 1)];
        case "ADD_POST":
            return [...state, action.post];
        case "LOAD_POSTS":
            return action.posts
        default:
            return state;
    }
}

const rootReducer = combineReducers({comments, posts, player})

export default rootReducer