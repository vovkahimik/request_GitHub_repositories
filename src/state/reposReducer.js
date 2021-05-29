import {githubApi} from "../api/githubApi";
import {setFetchReposErrorAC} from "./errorsReducer";


const initialState = []

const SET_REPOS = 'SET_REPOS'


export const reposReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_REPOS: {
            let stateCopy = [...state]
            stateCopy = [...action.repos]
            return stateCopy
        }
        default:
            return state
    }
}

export const setReposAC = (repos) => {
    return {type: SET_REPOS, repos}
}

export const fetchReposTC = (userName, perPage, page) => (dispatch) => {
    githubApi.getRepos(userName, perPage, page)
        .then(res => res.data[0].owner.login === userName
            && dispatch(setReposAC(res.data))
            && dispatch(setFetchReposErrorAC(false)))
        .catch(() => dispatch(setFetchReposErrorAC(true)))
}

// export const fetchReposTC = (userName) => (dispatch) => {
//     githubApi.getAllRepos(userName)
//         .then(res => res.data[0].owner.login === userName
//             && console.log(res.data.length)
//             && dispatch(setReposAC(res.data))
//             && dispatch(setFetchReposErrorAC(false)))
//         .catch(() => dispatch(setFetchReposErrorAC(true)))
// }

